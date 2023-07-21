import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Report() {
  const [transactionData, setTransactionData] = useState([]);
  const [date, setDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // Your data array
  const data = [];

  // const handleDateChange = (e) => {
  //   setDate(e.target.value);
  // };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setDate(formattedDate);
  };

  useEffect(() => {
    // This block will run whenever the 'date' state is updated

    // Make the API call here using the updated 'date' value
    axios
      .post("http://localhost:5000/report/getSales", { date: date })
      .then((res) => {
        // Handle the API response here
        setTransactionData(res.data.result);
      })
      .catch((err) => {
        // Handle errors
      });
  });
  // Identify the transaction type
  // const transactionFilter = ({ data }) => {
  // if(data.type_id==ad)
  // const handleDateChange = (e) => {
  //   setDate(e.target.value);
  //   console.log(date);
  //   axios
  //     .post("http://localhost:5000/report/getSale", date)
  //     .then((res) => {
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //   const handleEndDateChange = (e) => {
  //     setEndDate(e.target.value);
  //   };

  // Filter the data based on the start and end dates
  const filteredData = data.filter((item) => {
    if (!startDate || !endDate) {
      return true; // If start or end date is not provided, return all items
    }
  });

  let balance = 0;
  const calculateBalance = ({ data }) => {
    balance += data.amount - 2 * data.balance;
    return balance;
  };

  // let totCredit = 0;
  // const calculateTotCreadit = ({ data }) => {
  //   totCredit += data.balance;
  // };

  const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  const getDateFromTimestamp = (data) => {
    const dateObj = new Date(data.date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with '0'
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const bgChanger = (data) => {
    const bg = data.balance > 0 ? "bg-danger" : "bg-success";
    return bg;
  };

  return (
    <div>
      <div>
        <div className="mt-3 px-2 pt-2">
          <table className="table table-bordered">
            {/* ... Table header and rows ... */}
          </table>
        </div>

        <div>
          <label>
            Date:
            <input type="date" value={date} onChange={handleDateChange} />
          </label>

          <ul>
            {filteredData.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div></div>
      <div className="mt-4 px-2 pt-3">
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
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {transactionData.map((data) => (
              <tr
                className={bgChanger(data)}
                key={data.invoice_id + data.type_id}
              >
                <td>{data.manual_invoice_id}</td>
                <td>{getDateFromTimestamp(data)}</td>
                <td>{capitalize(data.type)}</td>
                {/* <td>{data.cutomername}</td> */}
                <td>{data.amount - data.balance}</td>
                <td>{data.balance}</td>
                <td>{calculateBalance({ data })}</td>
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
