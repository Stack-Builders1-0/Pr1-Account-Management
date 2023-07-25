import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "../Table";

function CashSale() {
  const [cashSaleData, setCashSaleData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/cashSale/showAll")
      .then((res) => {
        setCashSaleData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching cashSale data:", error);
      });
  }, []);

  const cashSaleColumns = [
    // Define the column names for CashSale data
    "type_id",
    "type",
    "manual_invoice_id",
    "customer_id",
    "description",
    "bill_amount",
    "discount",
    "amount",
    "date",
  ];

  const firstFiveCashSaleData = cashSaleData.slice(0, 5);

  return (
    <div className="px-5 py-3">
      <div className="mt-4 px-2 pt-5">
        <h3>CashSale List</h3>
        {/* Use the CommonTable component to display the table */}
        <CommonTable data={firstFiveCashSaleData} columns={cashSaleColumns} />
      </div>
    </div>
  );
}

export default CashSale;
