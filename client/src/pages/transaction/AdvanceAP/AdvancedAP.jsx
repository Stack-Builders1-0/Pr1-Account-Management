import React, { useState, useEffect } from "react";
import CommonTable from "../Table";

const columns = [
  "Bill Number",
  "Date",
  "Customer name",
  "Description",
  "Bill_amount",
  "Advance_Amount",
  "Discount",
  "Balance",
  "Updated Time",
  "Updated By",
];

const AdvancedAPSales = () => {
  const [advancedAPSalesData, setAdvancedAPSalesData] = useState([
    {
      "Bill Number": "BILL-001",
      Date: "2023-07-18",
      "Customer name": "John Doe",
      Description: "Product ABC",
      Bill_amount: 500,
      Advance_Amount: 200,
      Discount: 50,
      Balance: 400,
      "Updated Time": "2023-07-18 14:30:00",
      "Updated By": "User123",
    },
    {
      "Bill Number": "BILL-002",
      Date: "2023-07-19",
      "Customer name": "Jane Smith",
      Description: "Product XYZ",
      Bill_amount: 800,
      Advance_Amount: 300,
      Discount: 100,
      Balance: 700,
      "Updated Time": "2023-07-19 10:15:00",
      "Updated By": "User456",
    },
  ]);

  // useEffect(() => {
  //   const fetchAdvancedBPSalesData = async () => {
  //     try {
  //       // Fetch all  sales data from the server
  //       const response = await fetch("/api/advancedAPSales");
  //       const allData = await response.json();

  //       // Get today's date in 'YYYY-MM-DD' format
  //       const today = new Date().toISOString().slice(0, 10);

  //       // Filter only today's entries from allData
  //       const todaySales = allData.filter((item) => item.date === today);

  //       setAdvancedAPSalesData(todaySales);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchAdvancedAPSalesData();
  // }, []);

  return (
    <div>
      {/* <h2>AdvancedAP Sales</h2> */}
      <CommonTable data={advancedAPSalesData} columns={columns} />
    </div>
  );
};

export default AdvancedAPSales;
