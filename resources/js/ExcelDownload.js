import * as XLSX from "xlsx";

export const downloadExcel = (datas, fromDate, toDate) => {
    const workbook = XLSX.utils.book_new();
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const monthsArray = [];

    // Loop through months starting from 'start' date
    let currentMonth = new Date(start);
    while (currentMonth <= end) {
        const monthString = currentMonth.toLocaleString("default", {
            month: "short",
        });
        const year = currentMonth.getFullYear();

        // Push the formatted month and year to the array
        monthsArray.push({ [`${monthString} ${year}`]: "" });

        // Move to the next month
        currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    const filteredBooksData = datas.map((data) => {
        const result = { ...data };
        monthsArray.forEach((month) => {
            for (const key in month) {
                if (month.hasOwnProperty(key)) {
                    // Calculate the incremented value based on properties from data
                    const calculatedValue =
                        (data.Net_cost * (Number(data.Dep) / 100)) /
                        Number(data.per_month);

                    // Assign the calculated value to the corresponding property in month
                    month[key] = parseInt(calculatedValue);
                }
            }

            // Merge properties from month into result
            Object.assign(result, month);
        });
        return result;
    });

    const finalData = filteredBooksData.map(
        ({ created_at, updated_at, ...data }) => data
    );

    const calculateColWidths = (data) => {
        const maxWidths = {};

        // Include column headers
        const header = Object.keys(data[0]);
        header.forEach((key) => {
            const cellWidth = key.length + 2; // Add some extra space
            maxWidths[key] = Math.max(maxWidths[key] || 0, cellWidth);
        });

        // Include data rows
        data.forEach((item) => {
            Object.keys(item).forEach((key) => {
                const cellValue = item[key] ? item[key].toString() : "";
                const cellWidth = cellValue.length + 2; // Add some extra space
                maxWidths[key] = Math.max(maxWidths[key] || 0, cellWidth);
            });
        });

        return Object.keys(maxWidths).map((key) => ({ width: maxWidths[key] }));
    };

    const worksheet = XLSX.utils.json_to_sheet(finalData);
    worksheet["!cols"] = calculateColWidths(finalData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Books`);
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookList.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
};
