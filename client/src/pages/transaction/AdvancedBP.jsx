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

const AdvancedBPSales = () => {
  const [advancedBPSalesData, setAdvancedBPSalesData] = useState([
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
  //   const fetchAdvancedBPSalesData = async () => {
  //     try {
  //       // Fetch all  sales data from the server
  //       const response = await fetch("/api/advancedBPSales");
  //       const allData = await response.json();

  //       // Get today's date in 'YYYY-MM-DD' format
  //       const today = new Date().toISOString().slice(0, 10);

  //       // Filter only today's entries from allData
  //       const todaySales = allData.filter((item) => item.date === today);

  //       setAdvancedBPSalesData(todaySales);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchAdvancedBPSalesData();
  // }, []);

  return (
    <div>
      {/* <h2>AdvancedBP Sales</h2> */}
      <CommonTable data={advancedBPSalesData} columns={columns} />
    </div>
  );
};

export default AdvancedBPSales;
