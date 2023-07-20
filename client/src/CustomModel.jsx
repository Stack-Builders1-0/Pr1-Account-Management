import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios";

function CustomModel({ show, onHide }) {

  const sessionToken = localStorage.getItem('sessionToken');

//   // define the handle submit function then use the request
// axios.post('http://localhost:5000/dashboard/addOpeningBalance', {amount : amount}, {headers : {'Authorization' : 'key '+sessionToken}})
// .then((res) => {
//   console.log(res.data);
// })
// .catch((err) => {
//   console.log(err);
// })


  return (
    <>

      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header >
          <Modal.Title>Opening Amount</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter cash amount"
              autoFocus
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>

          <Link to="/" className="btn btn-primary">
            Submit
          </Link>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModel;