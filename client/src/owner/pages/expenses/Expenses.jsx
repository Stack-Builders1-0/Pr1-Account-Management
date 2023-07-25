import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {
  const [expenseData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/expenses/showAll")
      .then((res) => {
        setEmployeeData(res.data.result);
      })
      .catch((error) => {
        console.log("Error expense data:", error);
      });
  },[]);

  return (
    <div className="px-5 py-3">
      <Link to="/addexpense" className="btn btn-primary">
        Add Expense
      </Link>

      <div className="mt-4 px-2 pt-5">
        <h3>Expense List</h3>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice ID</th>
              <th>Expense Type</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {expenseData.map((data) => (
              <tr key={data.expense_id}>
                <td>{data.date}</td>
                <td>{data.manual_expense_id}</td>
                <td>{data.type}</td>
                <td>{data.description}</td>
                <td>{data.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
