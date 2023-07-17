import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Dashboard() {
  // get the session token on the local storage
  const sessionToken = localStorage.getItem('sessionToken');
  const [totalCredit, setTotalCredit] = useState('');
  const [data, setData] = useState({ totalCashsales: "000.00" });
  const [showTransaction, setShowTransaction] = useState(false);

  // get the current date in yyyy-mm-dd this format
  const currentDate = new Date();
  const date = currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  const handleClose = () => setShowTransaction(false);
  const handleShow = () => setShowTransaction(true);

  useEffect(() => {

    axios.post("http://localhost:5000/dashboard/totalCreditSales",  {date :date}, {headers: {'Authorization': 'key ' + sessionToken}} )
    .then((res) => {
      console.log(res.data.result[0].total_credit);
      setData({...data, totalCredit : res.data.result[0]} );
      console.log(data);
    });
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
        <Button className="nextButton" onClick={handleShow}>
          Add Transaction
        </Button>
        <Link to="/addcustomer" className="btn btn-primary">
          Add Customer
        </Link>
        <Link to="/addemployee" className="btn btn-primary">
          Add Employee
        </Link>
      </div>

      <Modal show={showTransaction} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className="p-3 d-flex justify-content-around mt-3">
            <Button variant="primary" onClick={handleClose}>
              <Link to="/cashtransaction" className="btn btn-primary">
                CashTransaction
              </Link>
            </Button>
            <Button variant="primary" onClick={handleClose}>
              <Link to="/credittransaction" className="btn btn-primary">
                CreditTransaction
              </Link>
            </Button>
            <Button variant="primary" onClick={handleClose}>
              <Link to="/advanceonly" className="btn btn-primary">
                AdvanceOnly
              </Link>
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
