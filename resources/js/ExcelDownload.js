import * as XLSX from "xlsx";

export const downloadExcel = (datas, fromDate, toDate) => {
    const { monthsArray, monthCount } = generateMonthsArray(fromDate, toDate);
  
    const splitDataByMonth = (data) => {
        const result = [];
        let currentMonthArray = [];
      
        data.forEach((item, index) => {
          const month = Object.keys(item)[0];
          currentMonthArray.push(item);
      
          if ((index + 1) % 12 === 0 || index === data.length - 1) {
            result.push(currentMonthArray);
            currentMonthArray = [];
          }
        });
      
        return result;
      };

    const nestedArrays = splitDataByMonth(monthsArray);
    console.log(nestedArrays)
    const workbook = XLSX.utils.book_new();
    nestedArrays.forEach((monthArray,index) => {
        const filteredAssetsData = calculateFilteredAssetsData(datas, monthArray);
        const totalData = calculateTotalData(filteredAssetsData, monthArray.length);
        const finalData = totalData.map(
            ({
                created_at,
                updated_at,
                depreciation_id,
                office_asset_id,
                deduct,
                financial_month,
                depreciation_percent,
                net_cost,
                opening_date,
                opening_amount,
                disposal,
                remark,
                office_asset,
                ...data
            }) => data
        );
                let totalNetCost = 0;
                let totalAcquisitionCost = 0;

                finalData.map((data) => {
                    totalNetCost += data["Net Cost"];
                    totalAcquisitionCost += data["Acquisition Cost"];
                });
                
                const worksheet = XLSX.utils.json_to_sheet(finalData);
                worksheet["!cols"] = calculateColWidths(finalData);

                let columnIndex = 12;
                let initalCount = 0;
                let monthTotalArray = [];
                while (initalCount <=  monthArray.length + 5) {
                    const totalColumn = calculateTotal(worksheet, columnIndex);
                    monthTotalArray.push(totalColumn);
                    initalCount++;
                    columnIndex++;
                }
            
                const newRowData = [
                   "Total",
                    "",
                    "",
                    "",
                    "",
                    totalAcquisitionCost,
                    "",
                    totalNetCost,
                    "",
                    "",
                    "",
                    ...monthTotalArray,
                ];
            
                XLSX.utils.sheet_add_aoa(worksheet, [newRowData], {
                    origin: -1,
                });
                XLSX.utils.book_append_sheet(workbook, worksheet, `Year ${index}` );
    })

 
       const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    downloadExcelFile(excelBuffer, "bookList.xlsx");
 

    // const filteredAssetsData = calculateFilteredAssetsData(datas, monthsArray);
    // const totalData = calculateTotalData(filteredAssetsData, monthCount);
    // const finalData = totalData.map(
    //     ({
    //         created_at,
    //         updated_at,
    //         depreciation_id,
    //         office_asset_id,
    //         deduct,
    //         financial_month,
    //         depreciation_percent,
    //         net_cost,
    //         opening_date,
    //         opening_amount,
    //         disposal,
    //         remark,
    //         office_asset,
    //         ...data
    //     }) => data
    // );

    // const workbook = XLSX.utils.book_new();
    // let worksheet;

    // if (fromDate && toDate) {
    //     const selectFromYear = new Date(fromDate);
    //     const selectToYear = new Date(toDate);
    //     for (
    //         let year = selectFromYear.getFullYear();
    //         year <= selectToYear.getFullYear();
    //         year++
    //     ) {
    //         const yearData = finalData.filter((data) => {
    //             const acquisitionDate = new Date(data["Acquisition Date"]);
    //             return acquisitionDate.getFullYear() === year;
    //         });
    //         if (yearData.length > 0) {
    //             worksheet = XLSX.utils.json_to_sheet(yearData);
    //             worksheet["!cols"] = calculateColWidths(yearData);
    //             XLSX.utils.book_append_sheet(
    //                 workbook,
    //                 worksheet,
    //                 `Year ${year}`
    //             );

    //             let totalNetCost = 0;
    //             let totalAcquisitionCost = 0;

    //             yearData.map((data) => {
    //                 totalNetCost += data["Net Cost"];
    //                 totalAcquisitionCost += data["Acquisition Cost"];
    //             });

    //             let columnIndex = 11;
    //             let initalCount = 0;
    //             let monthTotalArray = [];
    //             while (initalCount <= monthCount + 4) {
    //                 const totalColumn = calculateTotal(worksheet, columnIndex);
    //                 monthTotalArray.push(totalColumn);
    //                 initalCount++;
    //                 columnIndex++;
    //             }

    //             const newRowData = [
    //                 "Total",
    //                 "",
    //                 "",
    //                 "",
    //                 "",
    //                 totalAcquisitionCost,
    //                 "",
    //                 totalNetCost,
    //                 "",
    //                 "",
    //                 "",
    //                 ...monthTotalArray,
    //             ];

    //             XLSX.utils.sheet_add_aoa(worksheet, [newRowData], {
    //                 origin: -1,
    //             });
    //         }
    //     }
    // } else {
    //     worksheet = XLSX.utils.json_to_sheet(finalData);
    //     worksheet["!cols"] = calculateColWidths(finalData);
    //     XLSX.utils.book_append_sheet(workbook, worksheet, `All Year`);
    // }

    function calculateTotal(sheet, columnIndex) {
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        let total = 0;

        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            const cellAddress = XLSX.utils.encode_cell({
                r: row,
                c: columnIndex,
            });
            const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : 0;
            total += cellValue;
        }

        return total;
    }

    // const excelBuffer = XLSX.write(workbook, {
    //     bookType: "xlsx",
    //     type: "array",
    // });

    // downloadExcelFile(excelBuffer, "bookList.xlsx");
};

const generateMonthsArray = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const currentDate = new Date();
    let monthCount = 0;
    const monthsArray = [];

    while (start <= end && start <= currentDate) {
        const monthString = start.toLocaleString("default", {
            month: "short",
        });
        const year = start.getFullYear();

        monthsArray.push({
            [`${monthString} ${year}`]: "",
        });
        start.setMonth(start.getMonth() + 1);
        monthCount += 1;
    }
    return { monthsArray, monthCount };
};

const calculateFilteredAssetsData = (datas, monthsArray) => {
    return datas.map((data) => {
        const result = { ...data };
        monthsArray.forEach((month) => {
            const purchase_date = new Date(data.office_asset.purchase_date);
            const monthString = purchase_date.toLocaleString("default", {
                month: "short",
            });
            const year = purchase_date.getFullYear();
            const start_date = `${monthString} ${year}`;
            for (const key in month) {
                if (
                    start_date === key ||
                    new Date(key) > new Date(start_date)
                ) {
                    if (
                        month.hasOwnProperty(key) &&
                        key !== "Opening_Accumulate_at_April-23"
                    ) {
                        const calculatedValue =
                            (data.net_cost *
                                (Number(data.depreciation_percent) / 100)) /
                            12;
                        month[key] = Math.round(calculatedValue);
                    }
                } else {
                    month[key] = 0;
                }
            }
            Object.assign(result, month);
        });
        return result;
    });
};

const calculateTotalData = (filteredAssetsData, monthCount) => {
    const total_acquisition = 0;
    const assetsData = filteredAssetsData.map(
        ({ created_at, updated_at, ...data }) => data
    );
    return assetsData.map((data) => {
        const total =
            Math.round(
                (data.net_cost * (Number(data.depreciation_percent) / 100)) / 12
            ) * monthCount;
        // const writtenOff =
        //     data["Opening_Accumulate_at_April-23"] != 0
        //         ? data["Opening_Accumulate_at_April-23"] + total
        //         : "";
        const writtenOff = "";
        // const closingAccumulated =
        //     data["Opening_Accumulate_at_April-23"] + total - writtenOff;
        const closingAccumulated = 0 + total - writtenOff;
        const writtenOffExpense =
            writtenOff != 0 ? data.net_cost - writtenOff : "";
        const netBookValue =
            data.net_cost - (closingAccumulated - writtenOffExpense);

        return {
            "Asset Name": data.office_asset.brand_name,
            "Asset Class":
                data.office_asset.asset_code.asset_class.asset_class_name,
            Units: data.office_asset.qty,
            "Serial Number": data.office_asset.serial_number,
            "Acquisition Date": data.office_asset.purchase_date,
            "Acquisition Cost": data.office_asset.price,
            "Deduct(Discount)": data.deduct,
            "Net Cost": data.net_cost,
            Dep: data.depreciation_percent + "%",
            "Financial Month": data.financial_month,
            "Opening Accumulated at March-23": "",
            ...data,
            total: total,
            "Written Off Acc Dep": writtenOff,
            "Closing Accumulated at March-24":
                closingAccumulated === 0 ? 0 : closingAccumulated,
            "Written Off Expense": writtenOffExpense,
            "Net Book Value at March-24": writtenOffExpense ? 0 : netBookValue,
            Remark: data.remark,
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

// import * as XLSX from "xlsx";

// export const downloadExcel = (datas, fromDate, toDate) => {
//     if (fromDate && toDate) {
//         const selectFromYear = new Date(fromDate);
//         const selectToYear = new Date(toDate);
//         for (
//             let year = selectFromYear.getFullYear();
//             year <= selectToYear.getFullYear();
//             year++
//         ) {
//             const { monthsArray, monthCount } = generateMonthsArray(
//                 fromDate,
//                 toDate
//             );
//             const filteredAssetsData = calculateFilteredAssetsData(
//                 datas,
//                 monthsArray
//             );

//             const totalData = calculateTotalData(
//                 filteredAssetsData,
//                 monthCount
//             );

//             const finalData = totalData.map(
//                 ({
//                     created_at,
//                     updated_at,
//                     depreciation_id,
//                     office_asset_id,
//                     deduct,
//                     financial_month,
//                     depreciation_percent,
//                     net_cost,
//                     opening_date,
//                     opening_amount,
//                     disposal,
//                     remark,
//                     office_asset,
//                     ...data
//                 }) => data
//             );

//             let totalNetCost = 0;
//             let totalAcquisitionCost = 0;
//             totalData.map((data) => {
//                 totalNetCost += data.net_cost;
//                 totalAcquisitionCost += data.office_asset.price;
//             });

//             const workbook = XLSX.utils.book_new();

//             const yearData = finalData.filter((data) => {
//                 const acquisitionDate = new Date(data["Acquisition Date"]);
//                 return acquisitionDate.getFullYear() === year;
//             });
//             if (yearData.length > 0) {
//                 let worksheet = XLSX.utils.json_to_sheet(yearData);
//                 worksheet["!cols"] = calculateColWidths(yearData);
//                 XLSX.utils.book_append_sheet(
//                     workbook,
//                     worksheet,
//                     `Year ${year}`
//                 );
//                 let columnIndex = 11;
//                 let initalCount = 0;
//                 let monthTotalArray = [];
//                 while (initalCount <= monthCount + 4) {
//                     const totalColumn = calculateTotal(worksheet, columnIndex);
//                     monthTotalArray.push(totalColumn);
//                     initalCount++;
//                     columnIndex++;
//                 }

//                 const newRowData = [
//                     "Total",
//                     "",
//                     "",
//                     "",
//                     "",
//                     totalAcquisitionCost,
//                     "",

//                     totalNetCost,
//                     "",
//                     "",
//                     "",
//                     ...monthTotalArray,
//                 ];

//                 XLSX.utils.sheet_add_aoa(worksheet, [newRowData], {
//                     origin: -1,
//                 });

//                 const excelBuffer = XLSX.write(workbook, {
//                     bookType: "xlsx",
//                     type: "array",
//                 });

//                 downloadExcelFile(excelBuffer, "bookList.xlsx");
//             }
//         }
//     } else {
//         let worksheet = XLSX.utils.json_to_sheet(finalData);
//         worksheet["!cols"] = calculateColWidths(finalData);
//         XLSX.utils.book_append_sheet(workbook, worksheet, `All Year`);
//     }

//     function calculateTotal(sheet, columnIndex) {
//         const range = XLSX.utils.decode_range(sheet["!ref"]);
//         let total = 0;

//         for (let row = range.s.r + 1; row <= range.e.r; row++) {
//             const cellAddress = XLSX.utils.encode_cell({
//                 r: row,
//                 c: columnIndex,
//             });
//             const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : 0;
//             total += cellValue;
//         }

//         return total;
//     }
// };

// const generateMonthsArray = (fromDate, toDate) => {
//     const start = new Date(fromDate);
//     const end = new Date(toDate);
//     const currentDate = new Date();
//     let monthCount = 0;
//     const monthsArray = [];

//     while (start <= end && start <= currentDate) {
//         const monthString = start.toLocaleString("default", {
//             month: "short",
//         });
//         const year = start.getFullYear();

//         monthsArray.push({
//             [`${monthString} ${year}`]: "",
//         });
//         start.setMonth(start.getMonth() + 1);
//         monthCount += 1;
//     }
//     return { monthsArray, monthCount };
// };

// const calculateFilteredAssetsData = (datas, monthsArray) => {
//     return datas.map((data) => {
//         const result = { ...data };
//         monthsArray.forEach((month) => {
//             const purchase_date = new Date(data.office_asset.purchase_date);
//             const monthString = purchase_date.toLocaleString("default", {
//                 month: "short",
//             });
//             const year = purchase_date.getFullYear();
//             const start_date = `${monthString} ${year}`;
//             for (const key in month) {
//                 if (
//                     start_date === key ||
//                     new Date(key) > new Date(start_date)
//                 ) {
//                     if (
//                         month.hasOwnProperty(key) &&
//                         key !== "Opening_Accumulate_at_April-23"
//                     ) {
//                         const calculatedValue =
//                             (data.net_cost *
//                                 (Number(data.depreciation_percent) / 100)) /
//                             12;
//                         month[key] = Math.round(calculatedValue);
//                     }
//                 } else {
//                     month[key] = 0;
//                 }
//             }
//             Object.assign(result, month);
//         });
//         return result;
//     });
// };

// const calculateTotalData = (filteredAssetsData, monthCount) => {
//     const total_acquisition = 0;
//     const assetsData = filteredAssetsData.map(
//         ({ created_at, updated_at, ...data }) => data
//     );
//     return assetsData.map((data) => {
//         const total =
//             Math.round(
//                 (data.net_cost * (Number(data.depreciation_percent) / 100)) / 12
//             ) * monthCount;
//         // const writtenOff =
//         //     data["Opening_Accumulate_at_April-23"] != 0
//         //         ? data["Opening_Accumulate_at_April-23"] + total
//         //         : "";
//         const writtenOff = "";
//         // const closingAccumulated =
//         //     data["Opening_Accumulate_at_April-23"] + total - writtenOff;
//         const closingAccumulated = 0 + total - writtenOff;
//         const writtenOffExpense =
//             writtenOff != 0 ? data.net_cost - writtenOff : "";
//         const netBookValue =
//             data.net_cost - (closingAccumulated - writtenOffExpense);

//         return {
//             "Asset Name": data.office_asset.brand_name,
//             "Asset Class":
//                 data.office_asset.asset_code.asset_class.asset_class_name,
//             Units: data.office_asset.qty,
//             "Serial Number": data.office_asset.serial_number,
//             "Acquisition Date": data.office_asset.purchase_date,
//             "Acquisition Cost": data.office_asset.price,
//             "Deduct(Discount)": data.deduct,
//             "Net Cost": data.net_cost,
//             Dep: data.depreciation_percent + "%",
//             "Financial Month": data.financial_month,
//             "Opening Accumulated at March-23": "",
//             ...data,
//             total: total,
//             "Written Off Acc Dep": writtenOff,
//             "Closing Accumulated at March-24":
//                 closingAccumulated === 0 ? 0 : closingAccumulated,
//             "Written Off Expense": writtenOffExpense,
//             "Net Book Value at March-24": writtenOffExpense ? 0 : netBookValue,
//             Remark: data.remark,
//         };
//     });
// };

// const calculateColWidths = (data) => {
//     const maxWidths = {};

//     const header = Object.keys(data[0]);
//     header.forEach((key) => {
//         const cellWidth = key.length + 2;
//         maxWidths[key] = Math.max(maxWidths[key] || 0, cellWidth);
//     });

//     data.forEach((item) => {
//         Object.keys(item).forEach((key) => {
//             const cellValue = item[key] ? item[key].toString() : "";
//             const cellWidth = cellValue.length + 2;
//             maxWidths[key] = Math.max(maxWidths[key] || 0, cellWidth);
//         });
//     });

//     return Object.keys(maxWidths).map((key) => ({ width: maxWidths[key] }));
// };

// const downloadExcelFile = (excelBuffer, fileName) => {
//     const blob = new Blob([excelBuffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = fileName;
//     a.click();
//     URL.revokeObjectURL(url);
// };
