import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import CommonNavbar from "./CommonNavbar";

//settle form of advancebp
function SettleAdvancedAP() {
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [balance, setBalance] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState("");
  const [selectedBillNumber, setSelectedBillNumber] = useState("");
  const [settleAmount, setSettleAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [typeId, setTypeId] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const sessionToken = localStorage.getItem("sessionToken");

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearchPerformed(false);
    axios
      .post("http://localhost:5000/advanceSaleAP/filterManualInvoice", {
        manual_invoice_id: searchInvoiceNumber,
      })
      .then((res) => {
        // console.log(res.data.sucess);
        if (res.data.sucess) {
          const data = res.data.result[0];
          if (data) {
            setFilteredRecords(data);
            setIsSearchPerformed(true);
            setShowAlert(false);
            setSelectedInvoiceNumber(data.manual_invoice_id);
            setCustomerID(data.customer_id);
            setBalance(data.balance);
            setSelectedBillNumber(data.invoice_id);
            setAmount(data.amount);
            setTypeId(data.type_id);
          } else {
            setShowAlert(true);
            console.log("No records found for the provided invoice number.");
            setFilteredRecords([]);
          }
        } else {
          setShowAlert(true);
          console.error("Failed to fetch records:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error occurred while fetching records:", error);
        setShowAlert(true);
        setFilteredRecords([]);
      });

    const inputValue = searchInvoiceNumber.trim();
    setSearchInvoiceNumber(inputValue);

    if (inputValue === "") {
      setFilteredRecords([]);
    }
  };

  const handleSettleAmountChange = (e) => {
    const { value } = e.target;
    setSettleAmount(value);
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleSettle = (e) => {
    e.preventDefault();

    if (selectedBillNumber && settleAmount && customerID) {
      const settleData = {
        invoice_id: selectedBillNumber,
        amount: amount,
        settle_amount: settleAmount,
        balance: balance,
        customer_id: customerID,
        description: description,
        type_id: typeId,
      };

      axios
        .post(
          "http://localhost:5000/advanceSaleAP/settle",
          { data: settleData },
          { headers: { Authorization: "key " + sessionToken } }
        )
        .then((response) => {
          setSettleAmount("");
          setCustomerID("");
          setSelectedInvoiceNumber("");
          setDescription("");
          const responseData = response.data;
          console.log(response.data);
          if (responseData.sucess) {
            alert("Settlement is successfully submitted.");
          } else {
            // Success is false, show an error or handle it as needed
            alert("An error occurred. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error occurred during settle API call:", error);

          setSettleAmount("");
          setCustomerID("");
          setSelectedInvoiceNumber("");
          setDescription("");
        });
    } else {
      alert("Please fill all the required fields before settling the payment.");
    }
  };

  const handleCancel = () => {
    navigate("/transaction");
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center pt-4">
        <div className="white-box">
          <div>
            <CommonNavbar />
          </div>
          <div className="d-flex flex-column align-items-center">
            <h2>AdvanceAP Payment Only</h2>
          </div>
          <Form onSubmit={handleSearch}>
            <h3 className="text-center">Settle Payment</h3>
            <Form.Group
              className="mb-3"
              controlId="formBasicSearchInvoiceNumber"
            >
              <Form.Label>Search by Bill Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Bill number (without space)"
                value={searchInvoiceNumber}
                onChange={(e) => setSearchInvoiceNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>

          {showAlert && (
            <Alert variant="danger">
              <strong>
                No sales found with the provided bill number. Please provide
                valid bill number
              </strong>
            </Alert>
          )}

          {isSearchPerformed && filteredRecords && (
            <>
              <h4 className="text-center">AdvanceAP Sales Information</h4>
              <p>Customer ID: {filteredRecords.customer_id}</p>
              <p>Description: {filteredRecords.description}</p>
              <p>Bill Amount: {filteredRecords.bill_amount}</p>
              <p>Advance amount: {filteredRecords.advance_amount}</p>
              <p>Discount: {filteredRecords.discount}</p>
              <p>Balance: {filteredRecords.balance}</p>
              <p>Date: {filteredRecords.date}</p>
            </>
          )}

          {isSearchPerformed && (
            <Form onSubmit={handleSettle}>
              <h3 className="text-center">
                Settle Payment for Invoice: {selectedInvoiceNumber}
              </h3>
              <Form.Group className="mb-3" controlId="formBasicSettleAmount">
                <Form.Label>
                  Enter Settle Amount <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="settleAmount"
                  placeholder="Enter settle amount"
                  value={settleAmount}
                  onChange={handleSettleAmountChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Enter Description (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>

              <div className="col-12 d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="mx-2"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Settle
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default SettleAdvancedAP;
