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
    customer_name: "",
    manual_invoice_id: "",
    description: "",
    billAmount: "",
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
  }
  
  const sessionToken = localStorage.getItem('sessionToken');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("customer_id", data.customer_id);
    formdata.append("description", data.description);
    formdata.append("billAmount", data.billAmount);
    formdata.append("discount", data.discount);
    formdata.append("date", data.date);
    formdata.append("employeeId", data.employeeId);

    axios.post("http://localhost:5000/creditSale/add", formdata,{headers :{'Authorization' : 'key '+sessionToken}})
      .then((res) => {
        const responseData = res.data;
        if (responseData.success && responseData.data.length > 0) {
          // NIC number is valid and customer information is found
          const customerData = responseData.data[0];
          setCustomerInfo({
            customerName: customerData.customer_name,
            businessName: customerData.business_name,
            creditLimit: customerData.credit_limit,
          });
          setShowAlert(false);
          setData({ ...data, customer_name: customerData.customer_name });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchedNic) {
      // Only allow form submission if NIC has been searched
      const billAmount = parseFloat(data.billAmount);
      const creditLimit = parseFloat(customerInfo.creditLimit);

      if (billAmount <= creditLimit) {
        const formdata = new FormData();
        formdata.append("customer_name", data.customer_name);
        formdata.append("manual_invoice_id", data.manual_invoice_id);
        formdata.append("description", data.description);
        formdata.append("billAmount", data.billAmount);
        formdata.append("discount", data.discount);
        formdata.append("date", data.date);

        axios
          .post("http://localhost:5000/cashtransaction/add", formdata)
          .then((res) => {
            console.log(res);
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

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <div className="white-box">
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
                  to={"/transaction/credittransaction"}
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
              <Form.Group className="mb-3" controlId="formBasicCustomerName">
                <Form.Label>Customer name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  value={data.customer_name}
                  onChange={(e) =>
                    setData({ ...data, customer_name: e.target.value })
                  }
                />
              </Form.Group>

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
                  value={data.billAmount}
                  onChange={(e) =>
                    setData({ ...data, billAmount: e.target.value })
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
            </Form>
          </>
        )}

        {!showAddForm && <SettleForm />}
      </div>
    </div>
  );
}

export default CreditTransaction;
