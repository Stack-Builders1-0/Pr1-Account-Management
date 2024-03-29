import React, { useState } from "react";
import { Link } from "react-router-dom";
import SalesList from "./SalesList";
import { useEffect } from "react";
import axios from "axios";

// add
function EditTransaction() {
  const [selectedTab, setSelectedTab] = useState("");
  const [showTransaction, setShowTransaction] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [addedTransactionCount, setAddedTransactionCount] = useState(0);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleClose = () => {
    setShowTransaction(false);
  };

  const handleShow = () => {
    setShowTransaction(true);
  };

  const sessionToken = localStorage.getItem("sessionToken");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  useEffect(() => {
    // show the the emplyee and details
    axios
      .post(
        "http://localhost:5000/employee/showCurrent",
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        // console.log(res.data.result[0]);
        // console.log(res.data);
        setEmployeeId(res.data.result[0].employee_id);
      });

    // get the count of the add transection on today
    axios
      .post(
        "http://localhost:5000/employee/count",
        { date: date },
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        // console.log(res.data.result[0]);
        // console.log(res.data);
        setAddedTransactionCount(res.data.result[0].count);
      });
  }, []);

  return (
    <div>
      <div className="container d-flex flex-column">
        <div className="employee-info p-3 mb-3 bg-light border rounded">
          <p>Employee ID: {employeeId}</p>
          <p>Today's Date: {date}</p>
          <p>Employee Added Transactions Count: {addedTransactionCount}</p>
        </div>

        {/* Buttons section */}
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
      </div>

      <div className="mt-4 px-2 pt-5">
        <div>
          <h3>Edited List</h3>
          <SalesList />
        </div>
      </div>
    </div>
  );
}

export default EditTransaction;
