import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditAccessTable from "./EditAccessTable";
import { useEffect } from "react";
import axios from "axios";

// add
function EditAccess() {
  const [employeeId, setEmployeeId] = useState("");
  const [addedTransactionCount, setAddedTransactionCount] = useState(0);

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
        "http://localhost:5000/employee/checkEditAccess",
        {},
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
        <div className="container d-flex flex-column">
          {/* Buttons section */}
          <div className="d-flex justify-content-between mb-4">
            <Link to="/editaccess/add" className="btn btn-primary">
              Add
            </Link>
          </div>
        </div>

        <div className="mt-1 px-2 pt-3 pb-5">
          <div>
            <EditAccessTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAccess;

// import React from "react";
// import { Link } from "react-router-dom";
// import EditAccessTable from "./EditAccessTable";

// function EditAccess() {
//   return (
//     <div>
//       <div className="container d-flex flex-column">
//         {/* Buttons section */}
//         <div className="d-flex justify-content-between mb-4">
//           <Link to="/editaccess/add" className="btn btn-primary">
//             Add
//           </Link>
//         </div>
//       </div>

//       <div className="mt-1 px-2 pt-3 pb-5">
//         <div>
//           <EditAccessTable />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditAccess;
