import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "./Table";

function EditAccessTable() {
  const [editAccessData, setEditAccessData] = useState([]);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");

    axios
      .get(
        import.meta.env.VITE_API_URL + "/employee/editAccessableEmployee",
        {},
        {
          headers: { Authorization: "key " + sessionToken },
        }
      )
      .then((res) => {
        setEditAccessData(res.data.result);
        console.log(editAccessData);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  }, []);

  const EditAccessColumns = [
    // Define the column names for CashSale data
    "employee_id",
    "employee_name",
    "type",
    "address",
    "mobile",
    "email",
    "nic",
    "dob",
  ];

  return (
    <div className="px-5 py-3">
      <div className="mt-4 px-2 pt-5">
        <h3>Edit Access Employee List</h3>
        {/* Use the CommonTable component to display the table */}
        <CommonTable data={editAccessData} columns={EditAccessColumns} />
      </div>
    </div>
  );
}

export default EditAccessTable;
