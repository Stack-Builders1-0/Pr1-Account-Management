import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Navbar, Container, Nav } from "react-bootstrap";
import SettleForm from "./SettleForm";
import Alert from "react-bootstrap/Alert";

function CreditTransaction() {
  const [data, setData] = useState({
    nic_no: "",
    customer_id: "",
    manual_invoice_id: "",
    description: "",
    bill_amount: "",
    discount: "",
    date: "",
  });

  const [customerInfo, setCustomerInfo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [searchedNic, setSearchedNic] = useState(false);
  const [showAddForm, setShowAddForm] = useState(true);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleShowSettleForm = () => {
    setShowAddForm(false);
  };

  const navigate = useNavigate();

  const handleSearch = () => {
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
          setShowAlert(false);
          setData({ ...data, customer_name: customerData.customer_name });
          setData({ ...data, customer_id: customerData.customer_id });
          setSearchedNic(true);
        } else {
          // NIC number is invalid or no customer found
          setCustomerInfo(null);
          setShowAlert(true);
          setSearchedNic(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sessionToken = localStorage.getItem("sessionToken");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchedNic) {
      // Only allow form submission if NIC has been searched
      const billAmount = parseFloat(data.billAmount);
      const creditLimit = parseFloat(customerInfo.creditLimit);

      if (isNaN(billAmount) || billAmount <= 0) {
        // Bill amount is not a valid number or is zero/empty
        alert("Please enter a valid bill amount.");
      } else if (billAmount <= creditLimit) {
        const formdata = {
          type_id: "cr", // we manually set the type id of the credit sale
          manual_invoice_id: data.manual_invoice_id,
          date: data.date,
          customer_id: data.customer_id,
          description: data.description,
          bill_amount: data.bill_amount,
          discount: data.discount,
        };

        axios
          .post("http://localhost:5000/creditSale/add", formdata, {
            headers: { Authorization: "key " + sessionToken },
          })
          .then((res) => {
            navigate("/transaction");
          })
          .catch((err) => console.log(err));
      } else {
        // Bill amount exceeds the credit limit, display error message
        alert(
          "Bill amount exceeds the credit limit. Please adjust the bill amount."
        );
      }
    } else {
      alert(
        "Please search for a valid NIC first before submitting the form or you have to register first"
      );
    }
  };

  const handleCancel = () => {
    navigate("/transaction");
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <div className="white-box">
        <div className="d-flex flex-column align-items-center">
          <h2>Credit Payment</h2>
        </div>
        <Navbar sticky="top" bg="light" expand="md">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to={"/transaction/credittransaction"}
                  onClick={handleShowAddForm}
                >
                  Add
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/transaction/credittransaction/settlepayment"}
                  onClick={handleShowSettleForm}
                >
                  Settle
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {showAddForm && (
          <>
            <h4 className="text-center">Add Payment</h4>
            <Form.Group className="mb-3" controlId="formBasicNicNo">
              <Form.Label>Search Customer by NIC</Form.Label>
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
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Form.Group>

            {showAlert && (
              <Alert variant="danger">
                No customer found with the provided NIC. Do you want to
                register?{" "}
                <Link to="/addcustomer" className="btn btn-primary">
                  Add Customer
                </Link>
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

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicManualInvoiceId">
                <Form.Label>Bill number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter bill number"
                  value={data.manual_invoice_id}
                  onChange={(e) =>
                    setData({ ...data, manual_invoice_id: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBillAmount">
                <Form.Label>Bill Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter bill amount"
                  value={data.bill_amount}
                  onChange={(e) =>
                    setData({ ...data, bill_amount: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter discount"
                  value={data.discount}
                  onChange={(e) =>
                    setData({ ...data, discount: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="danger" onClick={handleCancel} className="mx-2">
                Cancel
              </Button>
            </Form>
          </>
        )}

        {!showAddForm && <SettleForm />}
      </div>
    </div>
  );
}

export default CreditTransaction;
