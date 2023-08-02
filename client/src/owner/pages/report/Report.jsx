import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import logo from "./aivha-full.png";

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
    if (data.start_transection) {
      totbalance += data.settle_amount - data.balance - data.return_payment;
    } else {
      totbalance += data.settle_amount - data.return_payment;
    }
    return totbalance;
  };

  let totcash = 0;
  let totret = 0;
  let totcred = 0;
  let totbal = 0;

  transactionData.map((data) => {
    totcash += data.settle_amount;
    totcred += data.start_transection ? data.balance : 0;
    totret += data.return_payment;
    totbal += data.start_transection
      ? data.settle_amount - data.balance - data.return_payment
      : data.settle_amount - data.return_payment;
  });

  const getDate = (data) => {
    const dateObj = new Date(data.date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with '0'
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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
      <div
        className="mt-2 px-2 pt-3"
        ref={componentPdf}
        style={{ width: "100%" }}
      >
        <>
          <main className="m-5 p-4 xl:max-w-4xl xl:mx-auto bg-white rounded-shadow">
            <div>
              <header className="header-container  xl:flex-row">
                <div className="font-bold uppercase tracking-wide text-4xl mb-3">
                  <h1>
                    <img src={logo} class="small-image" alt="Aivha Logo" />
                  </h1>
                  <div>
                    <ul>
                      <li>
                        <strong>Start Date :</strong> {startDate.slice(0, 10)}
                      </li>
                      <li>
                        <strong>End Date :</strong> {endDate.slice(0, 10)}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-end ">
                  <div className="table-container">
                    <h5>Summary</h5>
                    <table className="table table-bordered table-striped table-hover">
                      <tbody>
                        <tr>
                          <th width="200">Total Cash</th>
                          <td width="200" className="text-success">
                            {totcash}
                          </td>
                        </tr>
                        <tr>
                          <th width="250">Total Credit</th>
                          <td width="200" className="text-danger">
                            {totcred}
                          </td>
                        </tr>
                        <tr>
                          <th width="250">Total Return</th>
                          <td width="200" className="text-danger">
                            {totret}
                          </td>
                        </tr>
                        <tr>
                          <th width="280">Total Balance</th>
                          <td width="200" className="lable">
                            {totbal}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </header>
            </div>
            <h3>Transaction Report</h3>

            <div>
              <table className="table table-bordered table-striped table-hover ">
                <thead>
                  <tr>
                    <th>Bill No</th>
                    <th width="150">Date</th>
                    <th>Transaction Type</th>
                    <th width="80">Cash</th>
                    <th width="80">Credit</th>
                    <th width="80">Return</th>
                    <th width="90">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((data) => (
                    <tr key={data.invoice_id}>
                      <td>{data.manual_invoice_id}</td>
                      <td>{getDate(data)}</td>
                      <td>
                        {typeof data.description === "string"
                          ? (
                              data.description?.charAt(0).toUpperCase() +
                              data.description?.slice(1)
                            )?.replace(/_/g, " ") || ""
                          : ""}
                      </td>
                      <td className="text-success">
                        {data.settle_amount ? data.settle_amount : ""}
                      </td>

                      <td className="text-danger">
                        {data.start_transection == 1 ? data.balance : ""}
                      </td>
                      <td className="text-danger">
                        {data.return_payment ? data.return_payment : ""}
                      </td>
                      <td className="lable">{calculateBalance({ data })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </>
      </div>
    </div>
  );
}

export default Report;
