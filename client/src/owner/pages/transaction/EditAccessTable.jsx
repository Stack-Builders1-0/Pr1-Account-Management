import React, { useState } from "react";
import CommonTable from "./Table";

const columns = ["Employee ID", "Name", "Address", "Mobile", "Email", "Type"];

const EditAccessTable = () => {
  const [employeeData, setEmployeeData] = useState([
    {
      "Employee ID": "E001",
      Name: "John Doe",
      Address: "123 Main Street",
      Mobile: "555-1234",
      Email: "john.doe@example.com",
      Type: "Manager",
    },
    {
      "Employee ID": "E002",
      Name: "Jane Smith",
      Address: "456 Park Avenue",
      Mobile: "555-5678",
      Email: "jane.smith@example.com",
      Type: "Employee",
    },
  ]);

  // useEffect(() => {
  //   // Fetch data from the backend API
  // For demonstration purposes, we'll use the sampleEmployeeData as the response
  // Remove the sampleEmployeeData and uncomment the axios code when connecting to the backend.
  // axios.get("/api/employees")
  //   .then((response) => {
  //     setEmployeeData(response.data);
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching data:", error);
  //   });
  // }, []);

  return (
    <div>
      <CommonTable data={employeeData} columns={columns} />
    </div>
  );
};

export default EditAccessTable;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CommonTable from "./Table";

// function EditAccessTable() {
//   const [editAccessData, setEditAccessData] = useState([]);

//   useEffect(() => {
//     const sessionToken = localStorage.getItem("sessionToken");

//     axios
//       .post(
//         import.meta.env.VITE_API_URL + "/employee/showAccessEmployee",
//         {},
//         {
//           headers: { Authorization: "key " + sessionToken },
//         }
//       )
//       .then((res) => {
//         setEditAccessData(res.data.result);
//       })
//       .catch((error) => {
//         console.log("Error fetching creditSale data:", error);
//       });
//   }, []);

//   const EditAccessColumns = [
//     // Define the column names for CashSale data
//     "employee_name",
//     "mobile",
//     "email",
//     "nic",
//     "type_id",
//   ];

//   return (
//     <div className="px-5 py-3">
//       <div className="mt-4 px-2 pt-5">
//         <h3>Edit Access Employee List</h3>
//         {/* Use the CommonTable component to display the table */}
//         <CommonTable data={editAccessData} columns={EditAccessColumns} />
//       </div>
//     </div>
//   );
// }

// export default EditAccessTable;
