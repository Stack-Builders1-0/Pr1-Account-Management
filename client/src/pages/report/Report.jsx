import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function Report() {
  const componentPdf = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Transaction Report",
    // onAfterPrint: () => alert("Data save in PDF"),
  });

  const today = new Date();

  const defaultStartDate = `${
    today.getFullYear
  }-${today.getMonth()}-${today.getDate()} 00:00:00`;
  const defaultEndtDate = `${
    today.getFullYear
  }-${today.getMonth()}-${today.getDate()} 23:59:59`;

  // Extract the components of the current date and time

  const [transactionData, setTransactionData] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndtDate);
  // const [startDate, setStartDate] = useState("13-07-2023 00:00:00");
  // const [endDate, setEndDate] = useState("13-07-2023 23:59:59");

  const [submitted, setSubmitted] = useState(false);

  // const [endDate, setEndDate] = useState("");
  // Your data array
  const data = [];

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    const startDateWithTime = `${selectedDate} 00:00:00`;
    setStartDate(startDateWithTime);
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    const endDateWithTime = `${selectedDate} 23:59:59`;
    setEndDate(endDateWithTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // You can perform any necessary actions here after clicking the submit button
    // For example, you can call an API, update the state, etc.

    setSubmitted(true);
    axios
      .post("http://localhost:5000/report/getSalesBetweenDate", {
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {
        console.log(res.data)
        // Handle the API response here
        setTransactionData(res.data.result);
      })
      .catch((err) => {
        // Handle errors
      }); // Set the submitted flag to true to trigger the date filtering
  };

  // Filter the data based on the start and end dates
  // const filteredData = data.filter((item) => {
  //   if (!startDate || !endDate) {
  //     return true; // If start or end date is not provided, return all items
  //   }
  // });

  let balance = 0;
  const calculateBalance = ({ data }) => {
    balance += data.amount - 2 * data.balance;
    return balance;
  };

  const capitalize = (value) => {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/_/g, " ");
  };
  const getDateFromTimestamp = (data) => {
    const dateObj = new Date(data.date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with '0'
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const cashTextChanger = (data) => {
    // Your logic to determine the font color based on the data
    // For example, let's say you want to make the font color red for negative balance and green for positive balance
    ``;
    return data.amount - data.balance ? "text-success" : "";
  };

  const credTextChanger = (data) => {
    // Your logic to determine the font color based on the data
    // For example, let's say you want to make the font color red for negative balance and green for positive balance

    return data.balance ? "text-danger" : "";
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <form onSubmit={handleSubmit}>
            <label className="lable">
              Start Date
              <input
                type="date"
                value={startDate.slice(0, 10)} // Show only the date part
                onChange={handleStartDateChange}
                className="custom-date-input"
              />
            </label>

            <label className="lable">
              End Date:
              <input
                type="date"
                value={endDate.slice(0, 10)} // Show only the date part
                onChange={handleEndDateChange}
                className="custom-date-input"
              />
            </label>

            <button type="submit" className="btn btn-primary m-2">
              Show
            </button>
          </form>

          <button
            type="submit"
            onClick={generatePDF}
            className="btn btn-success m-2"
          >
            Generate PDF
          </button>
        </div>

        {/* ... The rest of your code ... */}
      </div>

      <div></div>
      <div
        className="mt-4 px-2 pt-3"
        ref={componentPdf}
        style={{ width: "100%" }}
      >
        <h3>Transaction List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Date</th>
              <th>Transaction Type</th>
              {/* <th>Description</th> */}
              <th>Cash</th>
              <th>Credit</th>
              {/* <th>Expense</th> */}
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {transactionData.map((data) => (
              <tr key={data.invoice_id + data.type_id}>
                <td>{data.manual_invoice_id}</td>
                <td>{getDateFromTimestamp(data)}</td>
                <td>{capitalize(data.type)}</td>
                {/* <td></td> */}
                <td className={cashTextChanger(data)}>
                  {data.amount - data.balance}
                </td>

                <td className={credTextChanger(data)}>{data.balance}</td>
                <td className="lable">{calculateBalance({ data })}</td>
              </tr>
            ))}
            <tr>
              <td>#</td>
              <td colSpan={2}>Total</td>
              <td></td>
              <td>@twitter</td>

              <td>{balance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
