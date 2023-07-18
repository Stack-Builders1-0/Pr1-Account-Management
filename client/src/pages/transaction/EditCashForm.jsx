import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const sampleCashTransactionData = {
  billNumber: "12345",
  customerName: "John Doe",
  amount: 100,
  date: "2023-07-18",
};

function EditCashTransaction() {
  const [billNumber, setBillNumber] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [cashTransactionData, setCashTransactionData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // For testing, we'll use the sampleCashTransactionData as the response
    // In a real application, you would perform the search based on the entered billNumber and fetch data from the backend.
    // Replace the sampleCashTransactionData with your actual search logic.
    setCashTransactionData(sampleCashTransactionData);
    setShowEditForm(true);
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

      {showEditForm && cashTransactionData && (
        <Form onSubmit={handleEditSubmit}>
          {/* Your form fields for editing the cash transaction go here */}
          <Form.Group className="mb-3" controlId="formBasicCustomerId">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer name"
              value={cashTransactionData.customerName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={cashTransactionData.amount}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              value={cashTransactionData.date}
            />
          </Form.Group>

          {/* ... Add more form fields for editing ... */}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditCashTransaction;
