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
  const todayFormatted = today.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(todayFormatted + " 00:00:00");
  const [endDate, setEndDate] = useState(todayFormatted + " 23:59:59");
  const [transactionData, setTransactionData] = useState([]);

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

  const handleSubmit = () => {
    setStartDate(todayFormatted + " 00:00:00");
    setEndDate(todayFormatted + " 23:59:59");
  };
  useEffect(() => {
    // Fetch the data for today's date when the component mounts
    axios
      .post("http://localhost:5000/report/getSalesBetweenDate", {
        startDate: startDate,
        endDate: endDate,
      })

      .then((res) => {
        // Handle the API response here
        setTransactionData(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        // Handle errors
      });
  }, [startDate, endDate]);

  let totbalance = 0;
  const calculateBalance = ({ data }) => {
    totbalance += data.settle_amount - data.balance - data.return_payment;
    return totbalance;
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

  const setCredit = (data) => {
    return data.start_transection == 1 ? data.balance : "";
  };

  const setAmount = (cash) => {
    return cash > 0 ? cash : "";
  };

  const cashTextChanger = (data) => {
    return data.settle_amount ? "text-success" : "";
  };

  const credTextChanger = (data) => {
    return data.balance ? "text-danger" : "";
    return data.return_payment ? "text-danger" : "";
  };

  // const returnTextChanger = (data) => {
  //   // Your logic to determine the font color based on the data
  //   // For example, let's say you want to make the font color red for negative balance and green for positive balance
  // };

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
            <button type="onSubmit" className="btn btn-primary">
              Reset Date
            </button>
          </form>
          <button
            type="submit"
            onClick={generatePDF}
            className="btn btn-success m-2"
          >
            Generate PDF 🖨
          </button>
        </div>
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
              <th>Cash</th>
              <th>Credit</th>
              <th>Paid Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {transactionData.map((data) => (
              <tr key={data.invoice_id + data.type_id}>
                <td>{data.manual_invoice_id}</td>
                <td>{getDateFromTimestamp(data)}</td>
                <td>{capitalize(data.description)}</td>
                {/* <td></td> */}
                <td className={cashTextChanger(data)}>
                  {data.settle_amount ? data.settle_amount : ""}
                </td>

                <td className={credTextChanger(data)}>{setCredit(data)}</td>
                <td className={credTextChanger(data)}>
                  {data.return_payment ? data.return_payment : ""}
                </td>
                <td className="lable">{calculateBalance({ data })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
