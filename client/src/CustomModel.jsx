import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function CustomModel({ show, onHide }) {


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