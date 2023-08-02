import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "./Table";

function SalesList() {
  const [editTransactionData, setEditTransactionData] = useState([]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    console.log(sessionToken);

    axios
      .post(
        "http://localhost:5000/dashboard/editedSales",
        { date: date },
        {
          headers: { Authorization: "key " + sessionToken },
        }
      )
      .then((res) => {
        setEditTransactionData(res.data.result);
        console.log(res.data.result);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error fetching editSale data:", error);
      });
  }, []);

  const editTransactionColumns = [
    "manual_invoice_id",
    "customer_name",
    "type_id",
    "description",
    "bill_amount",
    "advance_amount",
    "discount",
    "amount",
    "balance",
    "return_payment",
  ];

  return (
    <div className="px-5 py-3">
      <div className="mt-4 px-2 pt-5">
        <h3>Edit Transaction List</h3>
        {/* Use the CommonTable component to display the table */}
        <CommonTable
          data={editTransactionData}
          columns={editTransactionColumns}
        />
      </div>
    </div>
  );
}

export default SalesList;
