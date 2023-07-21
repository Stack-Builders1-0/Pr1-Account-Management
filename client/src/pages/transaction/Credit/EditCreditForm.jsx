import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditCreditForm() {
  const [data, setData] = useState({
    manual_invoice_id: "",
    description: "",
    bill_amount: "",
    discount: "",
    date: "",
    customer_id: "",
  });

  const [searchedTransaction, setSearchedTransaction] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showNICAlert, setShowNICAlert] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [searchedNic, setSearchedNic] = useState(false);

  const navigate = useNavigate();
  const sessionToken = localStorage.getItem("sessionToken");

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/creditSale/filterManualInvoice", {
        manual_invoice_id: searchInvoiceNumber,
      })
      .then((res) => {
        if (res.data.sucess) {
          const data = res.data.result[0];
          if (data) {
            setSearchedTransaction(data);
            setEditMode(true);
            setFilteredRecords(data);
            setShowAlert(false);
          } else {
            setSearchedTransaction(null);
            setEditMode(false);
            setShowAlert(true);
          }
        } else {
          setShowAlert(true);
          console.error("Failed to fetch records:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error occurred while fetching records:", error);
        setShowAlert(true);
      });

    const inputValue = searchInvoiceNumber.trim();
    setSearchInvoiceNumber(inputValue);

    if (inputValue === "") {
      setSearchedTransaction(null);
      setEditMode(false);
    }
  };

  const handleNICSearch = () => {
    const apiUrl = "http://localhost:5000/customer/filterCustomerNIC";

    axios
      .post(apiUrl, { nic: data.nic_no })
      .then((res) => {
        const responseData = res.data;
        console.log(responseData);
        if (responseData.sucess && responseData.result.length > 0) {
          // NIC number is valid and customer information is found
          const customerData = responseData.result[0];
          setCustomerInfo({
            customerName: customerData.customer_name,
            businessName: customerData.business_name,
            creditLimit: customerData.credit_limit,
          });
          setShowNICAlert(false);
          setData({ ...data, customer_name: customerData.customer_name });
          setData((prevData) => ({
            ...prevData,
            nic_no: data.nic_no,
            customer_id: customerData.customer_id,
          }));
          setFilteredRecords((prevRecords) => ({
            ...prevRecords,
            customer_id: customerData.customer_id,
          }));
          setSearchedNic(true);
        } else {
          // NIC number is invalid or no customer found
          setCustomerInfo(null);
          setShowNICAlert(true);
          setSearchedNic(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    // Perform validation if needed

    const billAmount = parseFloat(data.bill_amount);
    const creditLimit = parseFloat(customerInfo.creditLimit);

    if (billAmount < creditLimit) {
      // Bill amount exceeds the credit limit, display error message
      const formdata = {
        type_id: "cr", // we manually set the type id of the credit sale
        manual_invoice_id: filteredRecords.manual_invoice_id,
        date: filteredRecords.date,
        customer_id: data.customer_id,
        description: filteredRecords.description,
        bill_amount: filteredRecords.bill_amount,
        discount: filteredRecords.discount,
      };

      axios
        .post(
          "http://localhost:5000/creditSale/edit",
          { data: formdata },
          { headers: { Authorization: "key " + sessionToken } }
        )
        .then((res) => {
          navigate("/edittransaction");
        })
        .catch((err) => console.log(err));
    } else {
      alert(
        "Bill amount exceeds the credit limit. Please adjust the bill amount."
      );
    }
  };

  const handleCancel = () => {
    navigate("/edittransaction");
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center pt-4">
        <div className="white-box">
          <div className="d-flex flex-column align-items-center">
            <h2>{editMode ? "Edit Credit Payment" : "Credit Payment"}</h2>
          </div>

          {/* Search for credit transaction by bill number */}
          <Form onSubmit={handleSearch}>
            <Form.Group className="mb-3" controlId="formBasicManualInvoiceId">
              <Form.Label>Search Transaction by Bill Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bill number"
                value={searchInvoiceNumber}
                onChange={(e) => setSearchInvoiceNumber(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form.Group>
          </Form>

          {showAlert && (
            <Alert variant="danger">
              <strong>
                No transaction found with the provided bill number.
              </strong>
            </Alert>
          )}

          {editMode && searchedTransaction && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formBasicNicNo">
                <Form.Label>
                  <strong>If you want to change customer</strong> Search
                  Customer by NIC
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter NIC"
                  value={data.nic_no}
                  onChange={(e) => setData({ ...data, nic_no: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent form submission
                      handleSearch(); // Perform the search operation
                    }
                  }}
                />
                <Button variant="primary" onClick={handleNICSearch}>
                  Search NIC
                </Button>
              </Form.Group>

              {showNICAlert && (
                <Alert variant="danger">
                  <strong>No customer found with the provided NIC.</strong>
                </Alert>
              )}

              {customerInfo && (
                <div className="customer-info-box">
                  <h3>Customer Information</h3>
                  <p>
                    <strong>Customer Name:</strong> {customerInfo.customerName}
                  </p>
                  <p>
                    <strong>Business Name:</strong> {customerInfo.businessName}
                  </p>
                  <p>
                    <strong>Credit Limit:</strong> {customerInfo.creditLimit}
                  </p>
                </div>
              )}

              <Form.Group className="mb-3" controlId="formBasicCustomerID">
                <Form.Label>Customer name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer ID (NIC)"
                  value={filteredRecords.customer_id}
                  onChange={(e) =>
                    setData({ ...data, customer_id: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={filteredRecords.description}
                  onChange={(e) =>
                    setFilteredRecords({
                      ...filteredRecords,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBillAmount">
                <Form.Label>Bill Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter bill amount"
                  value={filteredRecords.bill_amount}
                  onChange={(e) =>
                    setFilteredRecords({
                      ...filteredRecords,
                      bill_amount: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter discount"
                  value={filteredRecords.discount}
                  onChange={(e) =>
                    setFilteredRecords({
                      ...filteredRecords,
                      discount: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date"
                  value={filteredRecords.date}
                  onChange={(e) =>
                    setFilteredRecords({
                      ...filteredRecords,
                      date: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Edit
              </Button>
              <Button variant="danger" onClick={handleCancel} className="mx-2">
                Cancel
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default EditCreditForm;
