import React, { useState, useEffect } from "react";
import CommonTable from "./Table";

const columns = [
  "Bill Number",
  "Date",
  "Customer name",
  "Description",
  "Bill_amount",
  "Discount",
  "Amount",
  "Updated_at",
  "Updated_by",
];

const CashSales = () => {
  const [cashSalesData, setCashSalesData] = useState([
    {
      "Bill Number": "BILL-001",
      Date: "2023-07-18",
      "Customer name": "John Doe",
      Description: "Product ABC",
      Bill_amount: 500,
      Discount: 50,
      Amount: 450,
      Updated_at: "2023-07-18 14:30:00",
      Updated_by: "User123",
    },
    {
      "Bill Number": "BILL-002",
      Date: "2023-07-19",
      "Customer name": "Jane Smith",
      Description: "Product XYZ",
      Bill_amount: 800,
      Discount: 100,
      Amount: 700,
      Updated_at: "2023-07-19 10:15:00",
      Updated_by: "User456",
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
