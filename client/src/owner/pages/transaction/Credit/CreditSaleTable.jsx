import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "../Table";

function CreditSale() {
  const [creditSaleData, setCreditSaleData] = useState([]);
  const currentDate = new Date();
  const date =
    currentDate.getFullYear() +
    "-0" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate();

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");

    axios
      .post(
        import.meta.env.VITE_API_URL + "/creditSale/showTodayForEmployee",
        { date: date },
        {
          headers: { Authorization: "key " + sessionToken },
        }
      )
      .then((res) => {
        setCreditSaleData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  }, []);

  const creditSaleColumns = [
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

  const firstFiveCreditSaleData = creditSaleData.slice(0, 5);

  return (
    <div className="px-5 py-3">
      <div className="mt-4 px-2 pt-5">
        <h3>CreditSale List</h3>
        {/* Use the CommonTable component to display the table */}
        <CommonTable
          data={firstFiveCreditSaleData}
          columns={creditSaleColumns}
        />
      </div>
    </div>
  );
}

export default CreditSale;
