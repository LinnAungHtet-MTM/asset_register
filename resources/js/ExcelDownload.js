import * as XLSX from "xlsx";

export const downloadExcel = (datas, fromDate, toDate) => {
    const monthsArray = generateMonthsArray(fromDate, toDate);
    const filteredAssetsData = calculateFilteredAssetsData(datas, monthsArray);
    const totalData = calculateTotalData(filteredAssetsData);

    const finalData = totalData.map(
        ({ created_at, updated_at, ...data }) => data
    );

    let totalNetCost = 0;
    let totalOpeningAccmulate = 0;
    finalData.map((data) => {
        totalNetCost += data.Net_cost;
        totalOpeningAccmulate += data["Opening_Accumulate_at_April-23"];
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    worksheet["!cols"] = calculateColWidths(finalData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Books`);
    const lastRowIndex = XLSX.utils.decode_range(worksheet["!ref"]).e.r;
    const newRowData = [
        "Total",
        "",
        "",
        totalNetCost,
        "",
        "",
        totalOpeningAccmulate,
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [newRowData], {
        origin: lastRowIndex + 1,
    });

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    downloadExcelFile(excelBuffer, "bookList.xlsx");
};

const generateMonthsArray = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const monthsArray = [];

    // let currentMonth = new Date(start);
    while (start <= end) {
        const monthString = start.toLocaleString("default", {
            month: "short",
        });
        const year = start.getFullYear();

        monthsArray.push({
            "Opening_Accumulate_at_April-23": 2080,
            [`${monthString} ${year}`]: "",
        });
        start.setMonth(start.getMonth() + 1);
    }
    return monthsArray;
};

const calculateFilteredAssetsData = (datas, monthsArray) => {
    return datas.map((data) => {
        const result = { ...data };
        monthsArray.forEach((month) => {
            for (const key in month) {
                if (
                    month.hasOwnProperty(key) &&
                    key !== "Opening_Accumulate_at_April-23"
                ) {
                    const calculatedValue =
                        (data.Net_cost * (Number(data.Dep) / 100)) /
                        Number(data.per_month);
                    month[key] = Math.round(calculatedValue);
                }
            }
            Object.assign(result, month);
        });
        return result;
    });
};

const calculateTotalData = (filteredAssetsData) => {
    return filteredAssetsData.map((data) => {
        const total =
            Math.round(
                (data.Net_cost * (Number(data.Dep) / 100)) /
                    Number(data.per_month)
            ) * 12;
        const writtenOff = data["Opening_Accumulate_at_April-23"] + total;
        const closingAccumulated =
            data["Opening_Accumulate_at_April-23"] + total - writtenOff;
        const writtenOffExpense = data.Net_cost - writtenOff;
        const netBookValue =
            data.Net_cost - (closingAccumulated - writtenOffExpense);

        return {
            ...data,
            total: total,
            "Written Off Acc Dep": writtenOff,
            "Closing Accumulated at March-24":
                closingAccumulated === 0 ? "-" : closingAccumulated,
            "Written Off Expense": writtenOffExpense,
            "Net Book Value at March-24": writtenOffExpense
                ? "-"
                : netBookValue,
        };
    });
};

const calculateColWidths = (data) => {
    const maxWidths = {};

    const header = Object.keys(data[0]);
    header.forEach((key) => {
        const cellWidth = key.length + 2;
        maxWidths[key] = Math.max(maxWidths[key] || 0, cellWidth);
    });

    data.forEach((item) => {
        Object.keys(item).forEach((key) => {
            const cellValue = item[key] ? item[key].toString() : "";
            const cellWidth = cellValue.length + 2;
            maxWidths[key] = Math.max(maxWidths[key] || 0, cellWidth);
        });
    });

    return Object.keys(maxWidths).map((key) => ({ width: maxWidths[key] }));
};

const downloadExcelFile = (excelBuffer, fileName) => {
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
};
