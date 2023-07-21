import React, { useState } from "react";
import { Link } from "react-router-dom";
import SalesList from "./SalesList";

// add
function EditTransaction() {
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
          <p>Employee Edited Transactions Count: 10</p>
        </div>

        {/* Buttons section */}
        <div className="d-flex justify-content-between mb-4">
          <Link to="/edittransaction/cash" className="btn btn-primary">
            Cash
          </Link>
          <Link to="/edittransaction/credit" className="btn btn-primary">
            Credit
          </Link>
          <Link to="/editadvancetransaction" className="btn btn-primary">
            AdvancedBP
          </Link>
          <Link to="/editadvancetransaction" className="btn btn-primary">
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
