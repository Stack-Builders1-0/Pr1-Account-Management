import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Navbar, Container, Nav } from "react-bootstrap";
import SettleForm from "./SettleForm";

function CreditTransaction() {
  const [data, setData] = useState({
    customer_id: "",
    manual_invoice_id: "",
    description: "",
    billAmount: "",
    discount: "",
    date: "",
  });

  const [showAddForm, setShowAddForm] = useState(true);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleShowSettleForm = () => {
    setShowAddForm(false);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("customer_id", data.customer_id);
    formdata.append("manual_invoice_id", data.manual_invoice_id);
    formdata.append("description", data.description);
    formdata.append("billAmount", data.billAmount);
    formdata.append("discount", data.discount);
    formdata.append("date", data.date);

    axios
      .post("http://localhost:5000/credittransaction/add", formdata)
      .then((res) => {
        console.log(res);
        navigate("/transaction");
      })
      .catch((err) => console.log(err));
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
          <Form onSubmit={handleSubmit}>
            <h3 className="text-center">Add Payment</h3>
            <Form.Group className="mb-3" controlId="formBasicCustomerId">
              <Form.Label>Customer_name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={data.customer_id}
                onChange={(e) =>
                  setData({ ...data, customer_id: e.target.value })
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
                onChange={(e) => setData({ ...data, discount: e.target.value })}
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
        )}

        {!showAddForm && <SettleForm />}
      </div>
    </div>
  );
}

export default CreditTransaction;
