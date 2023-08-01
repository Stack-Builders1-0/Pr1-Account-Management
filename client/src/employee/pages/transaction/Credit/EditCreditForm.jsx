import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function EditCreditForm() {
  const [data, setData] = useState({
    manual_invoice_id: "",
    bill_amount: "",
    discount: "",
    date: "",
    customer_name: "",
    business_name: "",
    invoice_id: "",
    nic_no: "",
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
  const [confirmNicChange, setConfirmNicChange] = useState(false);

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
            // console.log(data);

            setOldBillAmount(parseFloat(data.bill_amount));
            setOldDiscount(parseFloat(data.discount));
            setOldBalance(parseFloat(data.balance));
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

  const handleConfirmNicChange = (confirmed) => {
    setConfirmNicChange(confirmed);
  };

  const handleSearchNicConfirmation = () => {
    setConfirmNicChange(true);
  };

  const handleNICSearch = () => {
    const apiUrl = "http://localhost:5000/customer/filterCustomerNIC";

    axios
      .post(apiUrl, { nic: data.nic_no })
      .then((res) => {
        const responseData = res.data;
        // console.log(res.data);
        if (responseData.sucess && responseData.result.length > 0) {
          // NIC number is valid and customer information is found
          const customerData = responseData.result[0];
          // console.log(customerData);
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
          setConfirmNicChange(false);
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

    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const billAmount = parseFloat(filteredRecords.bill_amount);
    const creditLimit = searchedNic
      ? parseFloat(data.credit_limit)
      : parseFloat(filteredRecords.credit_limit);

    if (billAmount <= creditLimit) {
      // Bill amount exceeds the credit limit, display error message
      const formdata = {
        invoice_id: filteredRecords.invoice_id,
        type_id: filteredRecords.type_id,
        manual_invoice_id: filteredRecords.manual_invoice_id,
        update_at: currentDateTime,
        customer_id: searchedNic
          ? data.customer_id
          : filteredRecords.customer_id,
        billAmount: filteredRecords.bill_amount,
        discount: filteredRecords.discount,
        employee_id: filteredRecords.employee_id,
        oldBillAmount: old_bill_amount,
        oldDisCount: old_discount,
        balance: old_balance,
      };

      // console.log(formdata);

      axios
        .post(
          "http://localhost:5000/creditSale/edit",
          { data: formdata },
          { headers: { Authorization: "key " + sessionToken } }
        )
        .then((res) => {
          const responseData = res.data;
          // console.log(res.data);
          if (responseData.sucess) {
            // Success is true, so navigate to /transaction
            navigate("/edittransaction");
          } else {
            // Success is false, show an error or handle it as needed
            alert("An error occurred. Please try again later.");
          }
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
                      handleSearchNicConfirmation(); // Perform the search operation
                    }
                  }}
                />
                <Button variant="primary" onClick={handleSearchNicConfirmation}>
                  Search NIC
                </Button>
              </Form.Group>

              {showNICAlert && (
                <Alert variant="danger">
                  <strong>No customer found with the provided NIC.</strong>
                </Alert>
              )}

              <div className="customer-info-box">
                <h3>Customer Information</h3>
                <p>
                  <strong>Customer Name:</strong>{" "}
                  {filteredRecords.customer_name}
                </p>
                <p>
                  <strong>Business Name:</strong>{" "}
                  {filteredRecords.business_name}
                </p>
                <p>
                  <strong>Credit Limit:</strong> {filteredRecords.credit_limit}
                </p>
              </div>

              <Modal
                show={confirmNicChange}
                onHide={() => handleConfirmNicChange(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Customer Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to change the customer information for
                  the provided NIC?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleConfirmNicChange(false)}
                  >
                    No
                  </Button>
                  <Button variant="primary" onClick={() => handleNICSearch()}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>

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

              <div className="col-12 d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="mx-2"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Edit
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default EditCreditForm;
