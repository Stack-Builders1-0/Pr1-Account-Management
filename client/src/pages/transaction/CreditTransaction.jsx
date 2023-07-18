import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SettleForm from "./SettleForm";

function CreditTransaction() {
  const [showAddForm, setShowAddForm] = useState(true);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleShowSettleForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
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
            <Form>
              <h3 className="text-center">Add Payment</h3>
              <Form.Group className="mb-3" controlId="formBasicCustomerId">
                <Form.Label>Customer_name</Form.Label>
                <Form.Control type="text" placeholder="Enter customer name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBillAmount">
                <Form.Label>Bill Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter bill amount" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="number" placeholder="Enter discount" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Enter date" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmployeeId">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" placeholder="Enter employee ID" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}

          {/* Form for Settle Sales */}
          {!showAddForm && <SettleForm />}
        </div>
      </div>
    </div>
  );
}

export default CreditTransaction;
