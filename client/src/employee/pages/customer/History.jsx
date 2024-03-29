import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function History() {
  const { encodedInvoiceId, encodedtypeId } = useParams();
  const invoice_id = atob(encodedInvoiceId); // Decode the invoice_id
  const type_id = atob(encodedtypeId);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/dashboard/histoyCreditTransection",
        { invoice_id: invoice_id, type_id: type_id }
      )
      .then((res) => {
        setInvoiceHistory(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  }, []);

  return (
    <div>
      <div className="mt-4 px-4 pt-3">
        <h3> Invoice{invoiceHistory.invoice_id} History </h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              {/* select invoice_id */}
              <th>customer_name</th>
              <th>business_name</th>
              <th>date</th>
              <th>settle_amount</th>
              <th>balance</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {invoiceHistory.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.customer_name}</td>
                <td>{sale.business_name}</td>
                <td>{sale.date}</td>
                <td>{sale.settle_amount}</td>
                <td>{sale.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default History;
