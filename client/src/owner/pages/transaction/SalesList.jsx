import React, { useState, useEffect } from "react";
import CommonTable from "./Table";

const columns = ["Bill Number", "Type", "Amount", "Date", "CustomerName"];

const SalesList = () => {
  const [salesData, setSalesData] = useState([
    {
      "Bill Number": "1234",
      Type: "Cash",
      Amount: 100,
      Date: "2023-07-18",
      CustomerName: "John Doe",
    },
    {
      "Bill Number": "5678",
      Type: "Credit",
      Amount: 150,
      Date: "2023-07-19",
      CustomerName: "Jane Smith",
    },
  ]);

  // useEffect(() => {
  //   // Fetch data from the backend API
  // For demonstration purposes, we'll use the sampleSalesData as the response
  // Remove the sampleSalesData and uncomment the axios code when connecting to the backend.
  // axios.get("/api/sales")
  //   .then((response) => {
  //     setSalesData(response.data);
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching data:", error);
  //   });

  //   fetchCashSalesData();
  // }, []);

  return (
    <div>
      <CommonTable data={salesData} columns={columns} />
    </div>
  );
};

export default SalesList;
