import React from "react";
import CommonNavbar from "./CommonNavbar";

function AdvanceAPTransaction() {
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <div className="white-box">
        <div className="d-flex flex-column align-items-center">
          <h2>Credit Payment</h2>
        </div>
        <CommonNavbar /> {/* Use the CommonNavbar component here */}
      </div>
    </div>
  );
}

export default AdvanceAPTransaction;
