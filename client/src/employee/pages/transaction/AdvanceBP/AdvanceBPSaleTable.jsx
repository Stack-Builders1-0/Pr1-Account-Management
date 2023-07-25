import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "../Table";

function AdvanceBPSale() {
  const [advanceBPSaleData, setAdvanceBPSaleData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/advanceSaleBP/showAll")
      .then((res) => {
        setAdvanceBPSaleData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching advanceBPSale data:", error);
      });
  }, []);

  const advanceBPSaleColumns = [
    // Define the column names for CashSale data
    "type_id",
    "type",
    "manual_invoice_id",
    "customer_id",
    "description",
    "bill_amount",
    "advance_amount",
    "discount",
    "date",
    "amount",
    "balance",
  ];

  const firstFiveAdvanceBPSaleData = advanceBPSaleData.slice(0, 5);

  return (
    <div className="px-5 py-3">
      <div className="mt-4 px-2 pt-5">
        <h3>AdvanceBPSale List</h3>
        {/* Use the CommonTable component to display the table */}
        <CommonTable
          data={firstFiveAdvanceBPSaleData}
          columns={advanceBPSaleColumns}
        />
      </div>
    </div>
  );
}

export default AdvanceBPSale;
