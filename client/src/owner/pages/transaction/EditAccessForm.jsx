import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import moment from "moment/moment";

function EditAccessForm() {
  const [data, setData] = useState({
    nic_no: "",
  });

  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [searchedNic, setSearchedNic] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmChange, setConfirmChange] = useState(false);

  const navigate = useNavigate();

  const date = moment().format("YYYY-MM-DD HH:mm:ss");

  // const currentDate = new Date();
  // const date =
  //   currentDate.getFullYear() +
  //   "-0" +
  //   (currentDate.getMonth() + 1) +
  //   "-" +
  //   currentDate.getDate();

  const handleConfirmAccess = () => {
    setConfirmChange(true);
    setShowConfirmationModal(false); // Hide the confirmation modal

    // Make the API call to send the data to the backend
    if (searchedNic) {
      const formData = {
        employee_id: employeeInfo.employeeId,
        date: date,
      };
      // console.log(formData);

      axios
        .post(
          "http://localhost:5000/employee/giveEditAccess",
          { data: formData },
          { headers: { Authorization: "key " + sessionToken } }
        )
        .then((res) => {
          const responseData = res.data;
          // console.log(res.data);
          if (responseData.sucess) {
            // console.log(responseData);
            // Success is true, so navigate to /transaction
            navigate("/editaccess");
          } else {
            // Success is false, show an error or handle it as needed
            alert("An error occurred. Please try again later.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleSearch = () => {
    const apiUrl = "http://localhost:5000/employee/filterEmployeeNIC";

    axios
      .post(apiUrl, { nic: data.nic_no })
      .then((res) => {
        const responseData = res.data;
        // console.log(responseData);
        if (responseData.sucess && responseData.result.length > 0) {
          // NIC number is valid and customer information is found
          const employeeData = responseData.result[0];
          // console.log(employeeData);
          setEmployeeInfo({
            employeeId: employeeData.employee_id,
            employeeName: employeeData.employee_name,
            address: employeeData.address,
            mobile: employeeData.mobile,
            email: employeeData.email,
            type: employeeData.type,
            dob: employeeData.dob,
          });
          setShowAlert(false);
          setSearchedNic(true);
          setIsSearchPerformed(true);
        } else {
          // NIC number is invalid or no customer found
          setEmployeeInfo(null);
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
    // ... (previous code)
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const handleCancel = () => {
    navigate("/editaccess");
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <div className="white-box">
        <div className="d-flex flex-column align-items-center">
          <h2>Give Edit Access</h2>
        </div>

        {/* Search for customer by NIC */}
        <Form.Group className="mb-3" controlId="formBasicNicNo">
          <Form.Label>Search Employee by NIC</Form.Label>
          <InputGroup>
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
          </InputGroup>
        </Form.Group>

        {/* Alert for invalid NIC */}
        {showAlert && (
          <Alert variant="danger">
            No employee found with the provided NIC. Do you want to register?
            <Link to="/addemployee" className="btn btn-primary">
              Add Employee
            </Link>
          </Alert>
        )}

        {employeeInfo && (
          <div className="customer-info-box">
            <h3>Employee Information</h3>
            <p>
              <strong>Employee ID:</strong> {employeeInfo.employeeId}
            </p>
            <p>
              <strong>Employee Name:</strong> {employeeInfo.employeeName}
            </p>
            <p>
              <strong>Address:</strong> {employeeInfo.address}
            </p>
            <p>
              <strong>Mobile:</strong> {employeeInfo.mobile}
            </p>
            <p>
              <strong>Email:</strong> {employeeInfo.email}
            </p>
            <p>
              <strong>Type:</strong> {employeeInfo.type}
            </p>
            <p>
              <strong>DOB:</strong> {employeeInfo.dob}
            </p>
          </div>
        )}

        {isSearchPerformed && (
          <Form onSubmit={handleSubmit}>
            <div className="col-12 d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="mx-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Give Access
              </Button>
            </div>
          </Form>
        )}

        <Modal show={showConfirmationModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Access</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to grant access to the employee?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmAccess}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default EditAccessForm;
