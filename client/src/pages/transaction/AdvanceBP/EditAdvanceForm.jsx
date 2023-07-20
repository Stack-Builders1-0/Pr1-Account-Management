import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const sampleAdvanceTransactionData = {
  billNumber: "BILL-001",
  Date: "2023-07-18",
  customerName: "John Doe",
  Description: "Product ABC",
  Bill_amount: 500,
  Advance_amount: 200,
  Discount: 50,
  Updated_by: "User123",
};

function EditAdvanceTransaction() {
  const [billNumber, setBillNumber] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [advanceTransactionData, setAdvanceTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // Simulate the backend search based on the entered billNumber
    // For testing, we'll use the sampleAdvanceTransactionData as the response
    // In a real application, you would perform the search based on the entered billNumber and fetch data from the backend.
    // Replace the sampleAdvanceTransactionData with your actual search logic.
    if (billNumber === sampleAdvanceTransactionData.billNumber) {
      setAdvanceTransactionData(sampleAdvanceTransactionData);
      setShowEditForm(true);
      setErrorMessage(""); // Clear any previous error message
    } else {
      setAdvanceTransactionData(null);
      setShowEditForm(false);
      setErrorMessage("No such bill number available.");
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for editing the advancetransaction
    // Implement the logic to update the transaction with the edited data
    console.log("Advance transaction edited!");
  };

  return (
    <div>
      <h3 className="text-center">Edit Advance Transaction</h3>
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

      {showEditForm && advanceTransactionData && (
        <Form onSubmit={handleEditSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCustomerId">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer name"
              value={advanceTransactionData.customerName}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
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
              value={advanceTransactionData.Description}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
                  Description: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Bill Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={advanceTransactionData.Bill_amount}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
                  Bill_amount: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Advanced amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={advanceTransactionData.Advance_amount}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
                  Advance_amount: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDiscount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter discount"
              value={advanceTransactionData.Discount}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
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
              value={advanceTransactionData.Date}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
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
              value={advanceTransactionData.Updated_by}
              onChange={(e) =>
                setAdvanceTransactionData({
                  ...advanceTransactionData,
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

export default EditAdvanceTransaction;
