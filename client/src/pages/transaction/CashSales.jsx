import React, { useState, useEffect } from "react";
import CommonTable from "./Table";

const columns = [
  "Bill Number",
  "Date",
  "Customer ID",
  "Description",
  "Amount",
  "Discount",
  "Employee ID",
  "Updated Time",
  "Updated By",
];

const CashSales = () => {
  const [cashSalesData, setCashSalesData] = useState([
    {
      "Bill Number": "001",
      Date: "2023-07-17",
      "Customer ID": "C001",
      Description: "Product A",
      Amount: 100,
      Discount: 10,
      "Employee ID": "E001",
      "Updated Time": "10:00 AM",
      "Updated By": "John",
    },
    {
      "Bill Number": "002",
      Date: "2023-07-17",
      "Customer ID": "C002",
      Description: "Product B",
      Amount: 150,
      Discount: 20,
      "Employee ID": "E002",
      "Updated Time": "11:30 AM",
      "Updated By": "Jane",
    },
  ]);

  // useEffect(() => {
  //   const fetchCashSalesData = async () => {
  //     try {
  //       // Fetch all cash sales data from the server
  //       const response = await fetch("/api/cashSales");
  //       const allData = await response.json();

  //       // Get today's date in 'YYYY-MM-DD' format
  //       const today = new Date().toISOString().slice(0, 10);

  //       // Filter only today's entries from allData
  //       const todaySales = allData.filter((item) => item.date === today);

  //       setCashSalesData(todaySales);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchCashSalesData();
  // }, []);

  return (
    <div>
      {/* <h2>Cash Sales</h2> */}
      <CommonTable data={cashSalesData} columns={columns} />
    </div>
  );
};

export default CashSales;
