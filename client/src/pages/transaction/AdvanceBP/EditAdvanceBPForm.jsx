import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditAdvanceBPForm() {
  const [data, setData] = useState({
    manual_invoice_id: "",
    description: "",
    bill_amount: "",
    discount: "",
    advance_amount: "",
    date: "",
    customer_name: "",
    business_name: "",
    invoice_id: "",
    return_payment: "",
  });

  const [searchedTransaction, setSearchedTransaction] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showNICAlert, setShowNICAlert] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [searchedNic, setSearchedNic] = useState(false);
  const [old_bill_amount, setOldBillAmount] = useState(0);
  const [old_discount, setOldDiscount] = useState(0);
  const [old_balance, setOldBalance] = useState(0);
  const [old_advance_amount, setOldAdvanceAmount] = useState(0);
  const [old_return_payment, setOldReturnPayment] = useState(0);

  const navigate = useNavigate();
  const sessionToken = localStorage.getItem("sessionToken");

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/advanceSaleBP/filterManualInvoice", {
        manual_invoice_id: searchInvoiceNumber,
      })
      .then((res) => {
        if (res.data.sucess) {
          const data = res.data.result[0];
          console.log(data);
          if (data) {
            setSearchedTransaction(data);
            setEditMode(true);
            setFilteredRecords(data);
            setShowAlert(false);

            setOldBillAmount(parseFloat(data.bill_amount));
            setOldDiscount(parseFloat(data.discount));
            setOldBalance(parseFloat(data.balance));
            setOldAdvanceAmount(parseFloat(data.advance_amount));
            setOldReturnPayment(parseFloat(data.return_payment));

            console.log(data);
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
          console.log(customerData);
          setCustomerInfo({
            customerName: customerData.customer_name,
            businessName: customerData.business_name,
            creditLimit: customerData.credit_limit,
          });
          setShowNICAlert(false);
          setData((prevData) => ({
            ...prevData,
            nic_no: data.nic_no,
            customer_id: customerData.customer_id,
            customer_name: customerData.customer_name,
            business_name: customerData.business_name,
            credit_limit: customerData.credit_limit,
          }));
          setFilteredRecords((prevRecords) => ({
            ...prevRecords,
            customer_id: customerData.customer_id,
            customer_name: customerData.customer_name,
            business_name: customerData.business_name,
            credit_limit: customerData.credit_limit,
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

    const formdata = {
      type_id: "as", // we manually set the type id of the credit sale
      manual_invoice_id: filteredRecords.manual_invoice_id,
      date: filteredRecords.date,
      customer_id: searchedNic ? data.customer_id : filteredRecords.customer_id,
      description: filteredRecords.description,
      bill_amount: filteredRecords.bill_amount,
      discount: filteredRecords.discount,
      advance_amount: filteredRecords.advance_amount,
      invoice_id: filteredRecords.invoice_id,
    };

    const olddata = {
      old_bill_amount: old_bill_amount,
      old_discount: old_discount,
      old_balance: old_balance,
      old_advance_amount: old_advance_amount,
      old_return_payment: old_return_payment,
    };

    const requestData = {
      formdata: formdata,
      olddata: olddata,
    };

    console.log(formdata);

    axios
      .post(
        "http://localhost:5000/advanceSaleBP/edit",
        { data: requestData },
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        navigate("/edittransaction");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    navigate("/edittransaction");
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center pt-4">
        <div className="white-box">
          <div className="d-flex flex-column align-items-center">
            <h2>{editMode ? "Edit AdvanceBP Payment" : "AdvanceBP Payment"}</h2>
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
                    <strong>CreditLimit:</strong> {customerInfo.creditLimit}
                  </p>
                </div>
              )}

              <Form.Group className="mb-3" controlId="formBasicCustomerName">
                <Form.Label>Customer name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  value={filteredRecords.customer_name}
                  onChange={(e) =>
                    setData({ ...data, customer_name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBusinessName">
                <Form.Label>Business name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter business name"
                  value={filteredRecords.business_name}
                  onChange={(e) =>
                    setData({ ...data, business_name: e.target.value })
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

              <Form.Group className="mb-3" controlId="formBasicAdvanceAmount">
                <Form.Label>Advance Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter advance amount"
                  value={filteredRecords.advance_amount}
                  onChange={(e) =>
                    setFilteredRecords({
                      ...filteredRecords,
                      advance_amount: e.target.value,
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

export default EditAdvanceBPForm;
