import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import CustomModel from "./CustomModel";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { state } = useLocation();
  const show = state?.show | false;
  const onHide = state?.onHide | false;
  // get the session token on the local storage
  const sessionToken = localStorage.getItem("sessionToken");

  const navigate = useNavigate();

  const handleHistory = (invoice_id, type_id) => {
    localStorage.setItem("invoice_id", invoice_id);
    localStorage.setItem("type_id", type_id);
    navigate("/history");
  };

  const [data, setData] = useState({
    totalCashSales: "N/A",
    totalCreditSales: "N/A",
    totalSales: "00.00",
  });

  //table content
  const [creditSaleData, setCreditSaleData] = useState([]);
  // const [advanceSaleAPData, setAdvanceSaleAPData] = useState([]);
  // const [advanceSaleBPData, setAdvanceSaleBPData] = useState([]);

  // get the current date in yyyy-mm-dd this format
  const currentDate = new Date();
  const date =
    currentDate.getFullYear() +
    "-0" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate();

  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/dashboard/totalTransectionForOwner",
        { date: date },
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        const { cash, credit } = res.data.result[0];
        // console.log(res.data.result[0]);
        setData({
          ...data,
          totalCashSales: cash,
          totalCreditSales: credit,
          totalSales: cash + credit,
        });
      });

    axios
      .get(import.meta.env.VITE_API_URL + "/dashboard/creditNotSettle")
      .then((res) => {
        setCreditSaleData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  }, []);

  return (
    <div>
      <CustomModel show={show} onHide={onHide} />

      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3  shadow-sm w-25  square-decoration">
          <div className="text-center pb-1">
            <h4>Total Cash Sales</h4>
            <hr />
            <div>
              <h5>{data.totalCashSales}</h5>
            </div>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration">
          <div className="text-center pb-1">
            <h4>Total Credit Sales</h4>
            <hr />
            <div>
              <h5>{data.totalCreditSales}</h5>
            </div>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration">
          <div className="text-center pb-1">
            <h4>Total Sales</h4>
            <hr />
            <div>
              <h5>{data.totalSales}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between px-5 py-5">
        <Link to="/transaction" className="btn btn-primary">
          Add Transaction
        </Link>
        <Link to="/addcustomer" className="btn btn-primary">
          Add Customer
        </Link>
        <Link to="/addemployee" className="btn btn-primary">
          Add Employee
        </Link>
      </div>

      <div className="mt-4 px-4 pt-3">
        <h3> Cridit Sales</h3>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>StartedDate</th>
              <th>InvoiceNo</th>
              <th>Type</th>
              <th>CustomerName</th>
              <th>BusinessName</th>
              <th>Mobile</th>
              <th>TotalAmount</th>
              <th>AmountSettled</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {creditSaleData.map((sale) => (
              <tr key={sale.invoice_id + sale.type_id}>
                <td>{sale.date}</td>
                <td>{sale.manual_invoice_id}</td>
                <td>{sale.type}</td>
                <td>{sale.customer_name}</td>
                <td>{sale.business_name}</td>
                <td>{sale.mobile}</td>
                <td>{sale.amount}</td>
                <td>{sale.amount - sale.balance}</td>
                <td>{sale.balance}</td>
                <td>
                  {/* Action buttons */}
                  <button
                    onClick={() => handleHistory(sale.invoice_id, sale.type_id)}
                  >
                    History
                  </button>
                </td>
              </tr>
            ))}

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
