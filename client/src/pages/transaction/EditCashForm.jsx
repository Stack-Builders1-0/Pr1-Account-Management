import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const sampleCashTransactionData = {
  billNumber: "BILL-001",
  Date: "2023-07-18",
  customerName: "John Doe",
  Description: "Product ABC",
  Bill_amount: 500,
  Discount: 50,
  Updated_by: "User123",
};

function EditCashTransaction() {
  const [billNumber, setBillNumber] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [cashTransactionData, setCashTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // Simulate the backend search based on the entered billNumber
    // For testing, we'll use the sampleCashTransactionData as the response
    // In a real application, you would perform the search based on the entered billNumber and fetch data from the backend.
    // Replace the sampleCashTransactionData with your actual search logic.
    if (billNumber === sampleCashTransactionData.billNumber) {
      setCashTransactionData(sampleCashTransactionData);
      setShowEditForm(true);
      setErrorMessage(""); // Clear any previous error message
    } else {
      setCashTransactionData(null);
      setShowEditForm(false);
      setErrorMessage("No such bill number available.");
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for editing the cash transaction
    // Implement the logic to update the transaction with the edited data
    console.log("Cash transaction edited!");
  };

  return (
    <div>
      <h3 className="text-center">Edit Cash Transaction</h3>
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3" controlId="formBasicBillNumber">
          <Form.Label>Enter Bill Number to Edit</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bill number"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {showEditForm && cashTransactionData && (
        <Form onSubmit={handleEditSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCustomerId">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer name"
              value={cashTransactionData.customerName}
              onChange={(e) =>
                setCashTransactionData({
                  ...cashTransactionData,
                  customerName: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={cashTransactionData.Description}
              onChange={(e) =>
                setCashTransactionData({
                  ...cashTransactionData,
                  Description: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={cashTransactionData.Bill_amount}
              onChange={(e) =>
                setCashTransactionData({
                  ...cashTransactionData,
                  Bill_amount: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDiscount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter discount"
              value={cashTransactionData.Discount}
              onChange={(e) =>
                setCashTransactionData({
                  ...cashTransactionData,
                  Discount: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              value={cashTransactionData.Date}
              onChange={(e) =>
                setCashTransactionData({
                  ...cashTransactionData,
                  Date: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmployeeId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee ID"
              value={cashTransactionData.Updated_by}
              onChange={(e) =>
                setCashTransactionData({
                  ...cashTransactionData,
                  Updated_by: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditCashTransaction;
