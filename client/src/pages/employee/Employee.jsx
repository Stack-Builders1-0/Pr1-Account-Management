import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Employee() {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/employee/showAll")
      .then((res) => {
        setEmployeeData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  });

  return (
    <div className="px-5 py-3">
      <Link to="/addemployee" className="btn btn-primary">
        Add Employee
      </Link>

      <div className="mt-4 px-2 pt-5">
        <h3>Employee List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>nic</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {employeeData.map((data) => (
              <tr key={data.employee_id}>
                <td>{data.employee_name}</td>
                <td>{data.email}</td>
                <td>{data.address}</td>
                <td>{data.mobile}</td>
                <td>{data.nic}</td>
                <td>{data.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
