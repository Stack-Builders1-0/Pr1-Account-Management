import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

function SettleForm() {
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState("");
  const [settleAmount, setSettleAmount] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

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
      invoiceNumber: "INV-004",
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

  const fetchData = async (invoiceNumber) => {
    try {
      const response = await axios.get(
        `/api/records?invoiceNumber=${invoiceNumber}`
      );
      if (response.status === 200) {
        const data = response.data;
        setFilteredRecords(data);
      } else {
        console.error("Failed to fetch records:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while fetching records:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = searchInvoiceNumber.trim();
    setSearchInvoiceNumber(inputValue);

    if (inputValue === "") {
      setFilteredRecords([]);
    } else {
      fetchData(inputValue);
    }

    // Set the flag to indicate that search has been performed.
    setIsSearchPerformed(true);
  };

  const handleSettleAmountChange = (e) => {
    const { name, value } = e.target;
    if (name === "settleAmount") {
      setSettleAmount(value);
    } else if (name === "customerID") {
      setCustomerID(value);
    }
  };

  const handleSettle = (e) => {
    e.preventDefault();

    // Extract the required data from the state
    const settleData = {
      invoiceNumber: selectedInvoiceNumber,
      settleAmount: settleAmount,
      customerID: customerID,
    };

    // Make the API call to update the settlement amount
    axios
      .post("http://localhost:5000/settleInvoice", settleData)
      .then((response) => {
        // Handle the API response, if needed
        console.log("Settle API response:", response.data);

        // After a successful settle action, reset the state
        setSettleAmount("");
        setCustomerID("");
        setSelectedInvoiceNumber("");
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error occurred during settle API call:", error);

        // Reset the state even if the API call fails
        setSettleAmount("");
        setCustomerID("");
        setSelectedInvoiceNumber("");
      });
  };

  const handleCancel = () => {
    setSettleAmount("");
    setSelectedInvoiceNumber("");
    setCustomerID("");
  };

  return (
    <>
      <Form onSubmit={handleSearch}>
        <h3 className="text-center">Settle Payment</h3>
        <Form.Group className="mb-3" controlId="formBasicSearchInvoiceNumber">
          <Form.Label>Search by Invoice Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter invoice number"
            value={searchInvoiceNumber}
            onChange={(e) => setSearchInvoiceNumber(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {isSearchPerformed && filteredRecords.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Customer ID</th>
              <th>Settle Amount</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.invoiceNumber}</td>
                <td>{record.customerID}</td>
                <td>{record.amount}</td>
                <td>{record.employeeID}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {isSearchPerformed && (
        <Form onSubmit={handleSettle}>
          <h3 className="text-center">
            Settle Payment for Invoice: {selectedInvoiceNumber}
          </h3>
          <Form.Group className="mb-3" controlId="formBasicSettleAmount">
            <Form.Label>Enter Settle Amount</Form.Label>
            <Form.Control
              type="text"
              name="settleAmount"
              placeholder="Enter settle amount"
              value={settleAmount}
              onChange={handleSettleAmountChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCustomerID">
            <Form.Label>Enter Customer ID</Form.Label>
            <Form.Control
              type="text"
              name="customerID"
              placeholder="Enter customer ID"
              value={customerID}
              onChange={handleSettleAmountChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Settle
          </Button>
          <Button variant="danger" onClick={handleCancel} className="mx-2">
            Cancel
          </Button>
        </Form>
      )}
    </>
  );
}

export default SettleForm;
