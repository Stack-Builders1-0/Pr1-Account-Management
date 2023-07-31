import React, { useState } from "react";
import { Link } from "react-router-dom";
import SalesList from "./SalesList";
import { useEffect } from "react";
import axios from "axios";

// add
function EditTransaction() {
  const [employeeId, setEmployeeId] = useState("");
  const [addedTransactionCount, setAddedTransactionCount] = useState(0);
  const [hasAccess, setHasAccess] = useState(false);

  const sessionToken = localStorage.getItem("sessionToken");

  // get the current date in yyyy-mm-dd this format
  const currentDate = new Date();
  const date =
    currentDate.getFullYear() +
    "-0" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate();

  useEffect(() => {
    // show the the emplyee and details
    axios
      .post(
        "http://localhost:5000/employee/showCurrent",
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        // console.log(res.data);
        setEmployeeId(res.data.result[0].employee_id);
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });

    // get the count of the add transaction on today
    axios
      .post(
        "http://localhost:5000/employee/count",
        { date: date },
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        // console.log(res.data);
        setAddedTransactionCount(res.data.result[0].count);
      })
      .catch((error) => {
        console.log("Error fetching transaction count:", error);
      });

    axios
      .post(
        "http://localhost:5000/employee/checkEditAccess",
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.result[0].count === 1) {
          setHasAccess(true);
        }
      })
      .catch((error) => {
        console.log("Error checking edit access:", error);
      });
  }, []);

  return (
    <div>
      {hasAccess ? (
        <div className="container d-flex flex-column">
          <div className="employee-info p-3 mb-3 bg-light border rounded">
            <p>Employee ID: {employeeId}</p>
            <p>Today's Date: {date}</p>
            <p>Employee Added Transactions Count: {addedTransactionCount}</p>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <Link to="/edittransaction/cash" className="btn btn-primary">
              Cash
            </Link>
            <Link to="/edittransaction/credit" className="btn btn-primary">
              Credit
            </Link>
            <Link to="/edittransaction/advancebp" className="btn btn-primary">
              AdvancedBP
            </Link>
            <Link to="/edittransaction/advanceap" className="btn btn-primary">
              AdvancedAP
            </Link>
          </div>

          <div className="mt-4 px-2 pt-5">
            <div>
              <h3>Edited List</h3>
              <SalesList />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="alert alert-danger mt-5">
            You do not have edit access. Please contact your administrator for
            access.
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTransaction;
