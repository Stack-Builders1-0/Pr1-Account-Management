import React, { useState } from "react";
import CommonTable from "./Table";

const columns = [
  "Bill Number",
  "Date",
  "Customer name",
  "Description",
  "Amount",
  "Discount",
  "Updated Time",
  "Updated By",
];

const CreditSales = () => {
  const [creditSalesData, setCreditSalesData] = useState([
    {
      "Bill Number": "001",
      Date: "2023-07-17",
      "Customer name": "C001",
      Description: "Product A",
      Amount: 100,
      Discount: 10,
      "Updated Time": "10:00 AM",
      "Updated By": "John",
    },
    {
      "Bill Number": "002",
      Date: "2023-07-17",
      "Customer name": "C002",
      Description: "Product B",
      Amount: 150,
      Discount: 20,
      "Updated Time": "11:30 AM",
      "Updated By": "Jane",
    },
    // Add more sample data here...
  ]);

  // useEffect(() => {
  //   const fetchCreditSalesData = async () => {
  //     try {
  //       // Fetch all credit sales data from the server
  //       const response = await fetch("/api/cashSales");
  //       const allData = await response.json();

  //       // Get today's date in 'YYYY-MM-DD' format
  //       const today = new Date().toISOString().slice(0, 10);

  //       // Filter only today's entries from allData
  //       const todaySales = allData.filter((item) => item.date === today);

  //       setCreditSalesData(todaySales);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchCreditSalesData();
  // }, []);

  return (
    <div>
      {/* <h2>Credit Sales</h2> */}
      <CommonTable data={creditSalesData} columns={columns} />
    </div>
  );
};

export default CreditSales;
