import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AdvanceBPTransaction() {
  const [data, setData] = useState({
    customer_id: "",
    manual_invoice_id: "",
    return_payment: "",
    description: "",
    billAmount: "",
    advanceAmount: "",
    discount: "",
    date: "",
    employeeId: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("customer_id", data.customer_id);
    formdata.append("manual_invoice_id", data.manual_invoice_id);
    formdata.append("return_payment", data.return_payment);
    formdata.append("description", data.description);
    formdata.append("billAmount", data.billAmount);
    formdata.append("advanceAmount", data.advanceAmount);
    formdata.append("discount", data.discount);
    formdata.append("date", data.date);
    formdata.append("employeeId", data.employeeId);

    axios
      .post("http://localhost:5000/advancebppayment/add", formdata)
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
          <h2>AdvanceBP Payment Only</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCustomerId">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer ID"
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

          <Form.Group className="mb-3" controlId="formBasicReturnPayment">
            <Form.Label>Return Payment</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter return payment"
              value={data.return_payment}
              onChange={(e) =>
                setData({ ...data, return_payment: e.target.value })
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

          <Form.Group className="mb-3" controlId="formBasicAdvanceAmount">
            <Form.Label>Advance Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter advance amount"
              value={data.advanceAmount}
              onChange={(e) =>
                setData({ ...data, advanceAmount: e.target.value })
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

export default AdvanceBPTransaction;
