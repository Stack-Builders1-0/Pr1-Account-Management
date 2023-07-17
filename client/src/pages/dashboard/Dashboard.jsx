import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({ totalCashsales: "34567.6$" });
  const [showTransaction, setShowTransaction] = useState(false);

  const handleClose = () => setShowTransaction(false);
  const handleShow = () => setShowTransaction(true);

  useEffect(() => {
    fetch(`https://dummy.restapiexample.com/api/v1/employees`).then(
      (response) => response.body
    );
    // .then((body) => setData(body.data));
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
              <h5>{data.totalCashsales}</h5>
            </div>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration">
          <div className="text-center pb-1">
            <h4>Total Cridit Sales</h4>
            <hr />
            <div>
              <h5>2456.7$</h5>
            </div>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration">
          <div className="text-center pb-1">
            <h4>Total Sales</h4>
            <hr />
            <div>
              <h5>12341$</h5>
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
                <button>Paid</button>
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
