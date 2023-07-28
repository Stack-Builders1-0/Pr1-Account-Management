import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Navbar, Container, Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import CommonNavbar from "./CommonNavbar";

function AddAdvanceAPForm() {
  const [data, setData] = useState({
    nic_no: "",
    customer_id: "",
    manual_invoice_id: "",
    description: "",
    bill_amount: "",
    advance_amount: "",
    discount: 0,
  });

  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [searchedNic, setSearchedNic] = useState(false);

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
            customer_id: customerData.customer_id,
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

  const [errors, setErrors] = useState({});

  // const setField = (field, value) => {
  //   // Check and see if errors exist, and remove them from the error object:
  //   setData({
  //     ...data,
  //     [field]: value
  // })
  //   if (!!errors[field])
  //     setErrors({
  //       ...errors,
  //       [field]: null,
  //     });
  // };

  const findFormErrors = () => {
    const { manual_invoice_id, bill_amount, advance_amount, discount } = data;
    const newErrors = {};
    // name errors
    if (!manual_invoice_id || manual_invoice_id === "")
      newErrors.manual_invoice_id = "cannot be blank!";
    if (!bill_amount || bill_amount === "")
      newErrors.bill_amount = "cannot be blank!";
    if (!advance_amount || advance_amount === "")
      newErrors.advance_amount = "cannot be blank!";
    if (discount === "") newErrors.discount = "cannot be blank!";

    return newErrors;
  };

  const sessionToken = localStorage.getItem("sessionToken");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchedNic) {
      const formdata = {
        type_id: "as", // we manually set the type id of tha cash sale
        manual_invoice_id: data.manual_invoice_id,
        customer_id: customerInfo.customer_id,
        description: data.description,
        bill_amount: data.bill_amount,
        advance_amount: data.advance_amount,
        discount: data.discount,
      };

      const newErrors = findFormErrors();

      console.log(formdata);
      if (Object.keys(newErrors).length > 0) {
        // We got errors!
        setErrors(newErrors);
      } else {
        axios
          .post("http://localhost:5000/advanceSaleAP/add", formdata, {
            headers: { Authorization: "key " + sessionToken },
          })
          .then((res) => {
            const responseData = res.data;
            console.log(res.data);
            if (responseData.sucess) {
              // Success is true, so navigate to /transaction
              navigate("/transaction");
            } else {
              // Success is false, show an error or handle it as needed
              alert("An error occurred. Please try again later.");
            }
          })
          .catch((err) => console.log(err));
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
        <div>
          <CommonNavbar /> {/* Use the CommonNavbar component here */}
        </div>
        <div className="d-flex flex-column align-items-center">
          <h2>AdvanceAP Payment Only</h2>
        </div>

        <h4>Add Payment Only</h4>

        <Form.Group className="mb-3" controlId="formBasicNicNo">
          <Form.Label>
            Search Customer by NIC<span style={{ color: "red" }}>*</span>
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
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Form.Group>

        {showAlert && (
          <Alert variant="danger">
            No customer found with the provided NIC. Do you want to register?{" "}
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
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicManualInvoiceId">
            <Form.Label>
              Bill number<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bill number"
              value={data.manual_invoice_id}
              onChange={(e) =>
                setData({ ...data, manual_invoice_id: e.target.value })
              }
              isInvalid={!!errors.manual_invoice_id}
            />
            <Form.Control.Feedback type="invalid">
              {errors.manual_invoice_id}
            </Form.Control.Feedback>
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
            <Form.Label>
              Bill Amount<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter bill amount"
              value={data.bill_amount}
              onChange={(e) =>
                setData({ ...data, bill_amount: e.target.value })
              }
              isInvalid={!!errors.bill_amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.bill_amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvanceAmount">
            <Form.Label>
              Advance Amount<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter advance amount"
              value={data.advance_amount}
              onChange={(e) =>
                setData({ ...data, advance_amount: e.target.value })
              }
              isInvalid={!!errors.advance_amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.advance_amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDiscount">
            <Form.Label>
              Discount<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter discount"
              value={data.discount}
              onChange={(e) => setData({ ...data, discount: e.target.value })}
              isInvalid={!!errors.discount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.discount}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="col-12 d-flex justify-content-between">
            <Button variant="secondary" onClick={handleCancel} className="mx-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddAdvanceAPForm;
