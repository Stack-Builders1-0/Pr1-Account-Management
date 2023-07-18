import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

function SettleForm() {
  const [showAddForm, setShowAddForm] = useState(true);
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState("");
  const [settleAmount, setSettleAmount] = useState("");

  // Sample data for demonstration purposes
  const records = [
    {
      invoiceNumber: "INV-001",
      customerID: "CUST-001",
      amount: 100,
      employeeID: "EMP-001",
    },
    {
      invoiceNumber: "INV-002",
      customerID: "CUST-002",
      amount: 150,
      employeeID: "EMP-002",
    },
    {
      invoiceNumber: "INV-001",
      customerID: "CUST-001",
      amount: 50,
      employeeID: "EMP-003",
    },
    {
      invoiceNumber: "INV-003",
      customerID: "CUST-003",
      amount: 200,
      employeeID: "EMP-001",
    },
  ];

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchInvoiceNumber(inputValue);

    if (inputValue.trim() === "") {
      setFilteredRecords([]);
    } else {
      const filtered = records.filter(
        (record) =>
          record.invoiceNumber.toLowerCase() === inputValue.toLowerCase()
      );
      setFilteredRecords(filtered);
    }
  };

  const handleEdit = (invoiceNumber) => {
    setSelectedInvoiceNumber(invoiceNumber);
  };

  const handleSettleAmountChange = (e) => {
    setSettleAmount(e.target.value);
  };

  const handleSettle = (e) => {
    e.preventDefault();
    // Handle the settle action here (e.g., make an API call to update the settlement amount for the invoice number).
    // You can use 'settleAmount' and 'invoiceNumber' states here as needed.
    console.log(
      `Invoice Number: ${selectedInvoiceNumber}, Settle Amount: ${settleAmount}`
    );
    // After successful settle action, you may want to reset the 'settleAmount' and 'selectedInvoiceNumber' states.
    setSettleAmount("");
    setSelectedInvoiceNumber("");
  };

  return (
    <>
      <Form>
        <h3 className="text-center">Settle Payment</h3>
        <Form.Group className="mb-3" controlId="formBasicSearchInvoiceNumber">
          <Form.Label>Search by Invoice Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter invoice number"
            value={searchInvoiceNumber}
            onChange={handleSearch}
          />
        </Form.Group>

        {filteredRecords.length > 0 && (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Customer ID</th>
                <th>Settle Amount</th>
                <th>Employee ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.invoiceNumber}</td>
                  <td>{record.customerID}</td>
                  <td>{record.amount}</td>
                  <td>{record.employeeID}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(record.invoiceNumber)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {/* Conditionally render the settlement form */}
      {selectedInvoiceNumber && (
        <Form onSubmit={handleSettle}>
          <h3 className="text-center">
            Settle Payment for Invoice: {selectedInvoiceNumber}
          </h3>
          <Form.Group className="mb-3" controlId="formBasicSettleAmount">
            <Form.Label>Enter Settle Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter settle amount"
              value={settleAmount}
              onChange={handleSettleAmountChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Settle
          </Button>
          <Button
            variant="danger"
            onClick={() => setSelectedInvoiceNumber("")}
            className="mx-2"
          >
            Cancel
          </Button>
        </Form>
      )}
    </>
  );
}

export default SettleForm;
