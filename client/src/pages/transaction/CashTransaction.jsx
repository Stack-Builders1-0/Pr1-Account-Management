import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CashTransaction() {
  const [data, setData] = useState({
    customer_id: "",
    description: "",
    billAmount: "",
    discount: "",
    date: "",
    employeeId: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("customer_id", data.customer_id);
    formdata.append("description", data.description);
    formdata.append("billAmount", data.billAmount);
    formdata.append("discount", data.discount);
    formdata.append("date", data.date);
    formdata.append("employeeId", data.employeeId);

    axios
      .post("http://localhost:5000/cashtransaction/add", formdata)
      .then((res) => {
        console.log(res);
        navigate("/transaction");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <div className="white-box">
        <div className="d-flex flex-column align-items-center">
          <h2>Cash Payment</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCustomerId">
            <Form.Label>Customer name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer id"
              value={data.customer_id}
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
              onChange={(e) => setData({ ...data, billAmount: e.target.value })}
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

          <Form.Group className="mb-3" controlId="formBasicEmployeeId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee ID"
              value={data.employeeId}
              onChange={(e) => setData({ ...data, employeeId: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CashTransaction;
