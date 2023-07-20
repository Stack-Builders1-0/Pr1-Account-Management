import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Report() {
  const [employeeData, setEmployeeData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/report/showAll")
      .then((res) => {
        setEmployeeData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  });

  // Your data array
  const data = [
    // { id: 1, date: "2022-08-15", name: "Event 1" },
    // { id: 2, date: "2022-08-20", name: "Event 2" },
    // { id: 3, date: "2022-08-25", name: "Event 3" },
    // ...
  ];

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  //   const handleEndDateChange = (e) => {
  //     setEndDate(e.target.value);
  //   };

  // Filter the data based on the start and end dates
  const filteredData = data.filter((item) => {
    if (!startDate || !endDate) {
      return true; // If start or end date is not provided, return all items
    }
    return item.date >= startDate && item.date <= endDate;
  });

  return (
    <div>
      <div>
        <label>
          Date:
          <input
            // className="form-control"
            type="date"
            value={Date}
            onChange={handleDateChange}
          />
        </label>
        {/* <label>
          Start Date:
          <input
            // className="form-control"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </label> */}
        {/* <label>
          Start Date:
          <input
            // className="form-control"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </label> */}

        {/* <label>
          End Date:
          <input
            // className="form-control"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </label> */}

        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>

      <div></div>
      <div className="mt-4 px-2 pt-5">
        <h3>Transaction List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Transaction Type</th>
              <th>Description</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Balance</th>
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

export default Report;
