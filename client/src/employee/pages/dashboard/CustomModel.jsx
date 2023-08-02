import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomModel({ show, onHide }) {
  const sessionToken = localStorage.getItem("sessionToken");
  // get the current date in yyyy-mm-dd this format
  const currentDate = new Date();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ amount: "" });

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { amount } = form;
    const newErrors = {};
    // name errors
    if (!amount || amount === "") newErrors.amount = "cannot be empty";

    return newErrors;
  };

  const date =
    currentDate.getFullYear() +
    "-0" +
    (currentDate.getMonth() + 1) +
    "-" +
    String(currentDate.getDate()).padStart(2, "0");

  const navigate = useNavigate();

  const handleCancel = (event) => {
    event.preventDefault();
    axios
      .post(
        import.meta.env.VITE_API_URL + "/dashboard/isAddOpeningBalance",
        { date: date },
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        if (res.data.sucess) {
          // we want to diply sucess message
          navigate("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      axios
        .post(
          import.meta.env.VITE_API_URL + "/dashboard/addOpeningBalance",
          { amount: form.amount },
          { headers: { Authorization: "key " + sessionToken } }
        )
        .then((res) => {
          if (res.data.sucess) {
            // we want to diply sucess message
            navigate("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Opening Amount</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter cash amount"
              autoFocus
              onChange={(e) => setField("amount", e.target.value)}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel} className="mx-2">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>

          {/* <Link to="/" className="btn btn-primary">
            Submit
          </Link> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModel;
