import React, { useState } from "react";
import { Link } from "react-router-dom";
import CashSalesTable from "./CashSales";
import CreditSalesTable from "./CreditSales";
import AdvancedBPSalesTable from "./AdvancedBP";
import AdvancedAPSalesTable from "./AdvancedAP";

// add
function AddTransaction() {
  const [selectedTab, setSelectedTab] = useState("");
  const [showTransaction, setShowTransaction] = useState(false);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleClose = () => {
    setShowTransaction(false);
  };

  const handleShow = () => {
    setShowTransaction(true);
  };

  return (
    <div>
      <div className="container d-flex flex-column">
        <div className="employee-info p-3 mb-3 bg-light border rounded">
          <p>Employee ID: 12345</p>
          <p>Today's Date: {new Date().toLocaleDateString()}</p>
          <p>Employee Added Transactions Count: 10</p>
        </div>

        {/* Buttons section */}
        <div className="d-flex justify-content-between mb-4">
          <Link to="/transaction/cashtransaction" className="btn btn-primary">
            Cash
          </Link>
          <Link to="/transaction/credittransaction" className="btn btn-primary">
            Credit
          </Link>
          <Link
            to="/transaction/advancebptransaction"
            className="btn btn-primary"
          >
            AdvancedBP
          </Link>
          <Link
            to="/transaction/advanceaptransaction"
            className="btn btn-primary"
          >
            AdvancedAP
          </Link>
        </div>
      </div>

      <div className="mt-4 px-2 pt-5">
        <div>
          <h3>Cash List</h3>
          <CashSalesTable />
        </div>

        <div>
          <h3>Credit List</h3>
          <CreditSalesTable />
        </div>

        <div>
          <h3>Advanced BP List</h3>
          <AdvancedBPSalesTable />
        </div>

        <div>
          <h3>Advanced AP List</h3>
          <AdvancedAPSalesTable />
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
