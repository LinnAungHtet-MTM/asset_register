import * as XLSX from "xlsx";

export const downloadExcel = (datas, fromDate, toDate) => {
    const {monthsArray,monthCount} = generateMonthsArray(fromDate, toDate);
    const filteredAssetsData = calculateFilteredAssetsData(datas, monthsArray);
    
    const totalData = calculateTotalData(filteredAssetsData);
    const finalData = totalData.map(
        ({ created_at, updated_at,Dep, ...data }) => data
    );
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    worksheet["!cols"] = calculateColWidths(finalData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Books`);
  
    function calculateTotal(sheet, columnIndex) {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        let total = 0;
      
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: columnIndex });
          const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : 0;
          total += cellValue;
        }
      
        return total;
      }
      
      // Calculate and print the total of the 12th column, omitting the first row
      let columnIndex = 11;
      let initalCount = 0;
     let monthTotalArray =[];
      console.log(monthCount);
      while (initalCount < monthCount) {
        const totalColumn = calculateTotal(worksheet, columnIndex);
       monthTotalArray.push(totalColumn);
        initalCount++;
        columnIndex++;
      }
      
      
    XLSX.utils.sheet_add_aoa(worksheet, [["", "Total","","","","","","","","","",...monthTotalArray ]], {
        origin: -1,
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
    let monthCount = 0;
    const monthsArray = [];

    // let currentMonth = new Date(start);
    while (start <= end) {
        const monthString = start.toLocaleString("default", {
            month: "short",
        });
        const year = start.getFullYear();

        monthsArray.push({ "Opening_Accumulate_at_April-23": 2080,[`${monthString} ${year}`]: "" });
        start.setMonth(start.getMonth() + 1);
        monthCount +=1;
    }
    return {monthsArray,monthCount};
};

const calculateFilteredAssetsData = (datas, monthsArray) => {
   
    return datas.map((data) => {
        const result = { ...data,'Dep%':data.Dep + '%' };
        monthsArray.forEach((month) => {
            for (const key in month) {
                if (month.hasOwnProperty(key) && key !== "Opening_Accumulate_at_April-23") {
                    const calculatedValue =
                        (data.Net_cost * (Number(data.Dep) / 100)) /
                        12
                    month[key] = Math.round(calculatedValue);
                   
                }
            }
            Object.assign(result, month);
        });
        return result;
    });
};

const calculateTotalData = (filteredAssetsData) => {
    const total_acquisition=0;
    return filteredAssetsData.map((data) => {
        const total =
            Math.round(
                (data.Net_cost * (Number(data.Dep) / 100)) /
                   12
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
