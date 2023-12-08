import * as XLSX from "xlsx";

export const downloadExcel = (datas, fromDate, toDate) => {
    const monthsArray = generateMonthsArray(fromDate, toDate);
    const filteredAssetsData = calculateFilteredAssetsData(datas, monthsArray);
    const totalData = calculateTotalData(filteredAssetsData);

    const finalData = totalData.map(
        ({ created_at, updated_at, ...data }) => data
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    worksheet["!cols"] = calculateColWidths(finalData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Books`);

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

        monthsArray.push({ [`${monthString} ${year}`]: "" });
        start.setMonth(start.getMonth() + 1);
    }
    return monthsArray;
};

const calculateFilteredAssetsData = (datas, monthsArray) => {
    return datas.map((data) => {
        const result = { ...data };
        monthsArray.forEach((month) => {
            for (const key in month) {
                if (month.hasOwnProperty(key)) {
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
    return filteredAssetsData.map((data) => ({
        ...data,
        total:
            Math.round(
                (data.Net_cost * (Number(data.Dep) / 100)) /
                    Number(data.per_month)
            ) * 12,
    }));
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
