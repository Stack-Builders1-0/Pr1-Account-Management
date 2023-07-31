import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import CashSale from "./Cash/CashSalesTable";
import CreditSale from "./Credit/CreditSaleTable";
import AdvanceBPSale from "./AdvanceBP/AdvanceBPSaleTable";
import AdvanceAPSale from "./AdvanceAP/AdvanceAPSaleTable";

function AddTransaction() {
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
          <Link to="/transaction/cashtransaction" className="btn btn-primary">
            Cash
          </Link>
          <Link
            to="/transaction/credittransaction/add"
            className="btn btn-primary"
          >
            Credit
          </Link>
          <Link
            to="/transaction/advancebptransaction/add"
            className="btn btn-primary"
          >
            AdvancedBP
          </Link>
          <Link
            to="/transaction/advanceaptransaction/add"
            className="btn btn-primary"
          >
            AdvancedAP
          </Link>
        </div>
      </div>

      <div className="mt-1 px-2 pt-3 pb-5">
        <div>
          <CashSale />
        </div>

        <div>
          <CreditSale />
        </div>

        <div>
          <AdvanceBPSale />
        </div>

        <div>
          <AdvanceAPSale />
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
