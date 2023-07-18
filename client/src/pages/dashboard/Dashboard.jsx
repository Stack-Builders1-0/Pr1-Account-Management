import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Dashboard() {
  // get the session token on the local storage
  const sessionToken = localStorage.getItem('sessionToken');

  

  const [data, setData] = useState({ totalCashSales: "N/A", totalCreditSales: "N/A", totalSales: "00.00" });

  // get the current date in yyyy-mm-dd this format
  const currentDate = new Date();
  const date = currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  

  useEffect(() => {

    axios.post(import.meta.env.VITE_API_URL +"/dashboard/totalCreditSales", { date: date }, { headers: { 'Authorization': 'key ' + sessionToken } })
      .then((res) => {
        console.log(res.data.result[0].total_credit);
        setData({ ...data, totalCreditSales: res.data.result[0].total_credit });
        console.log(data);
      });
      axios.post(import.meta.env.VITE_API_URL +"/dashboard/totalCashSales", { date: date }, { headers: { 'Authorization': 'key ' + sessionToken } })
      .then((res) => {
        // console.log(res.data.result[0].total_credit);
        // setData({ ...data, totalCashSales: res.data.result[0].total_credit });
        console.log(res);
      });
      setData({ ...data, totalSales: data.totalCashSales + data.totalCreditSales });
  }, []);
  // console.log(data)

  return (

    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration">
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
        <h3>Total Cridit Sales</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>BusinessName</th>
              <th>Address</th>
              <th>Telephone</th>
              <th>Mobile</th>
              <th>TotalAmount</th>
              <th>AmountSettled</th>
              <th>Balance</th>
              <th>StartedDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            <tr>
              <td>John Doe</td>
              <td>Business</td>
              <td>1st,street</td>
              <td>123-456-7890</td>
              <td>763456742</td>
              <td>342$</td>
              <td>100$</td>
              <td>function or database</td>
              <td>somedate</td>
              <td>
                {/* Action buttons */}
                <button>History</button>
              </td>
            </tr>

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
