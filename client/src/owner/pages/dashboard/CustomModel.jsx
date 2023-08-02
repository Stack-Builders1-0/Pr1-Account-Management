import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CustomModel({ show, onHide }) {
  const sessionToken = localStorage.getItem('sessionToken');
// get the current date in yyyy-mm-dd this format
const currentDate = new Date();
const date = currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' +  String(currentDate.getDate()).padStart(2, "0");


  const [amount, setAmount] = useState({});
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    // if(amount){
    axios.post(import.meta.env.VITE_API_URL + '/dashboard/addOpeningBalance', { amount: amount }, { headers: { 'Authorization': 'key ' + sessionToken } })
      .then((res) => {

        if (res.data.sucess) {
          // we want to diply sucess message 
          navigate('');
        } else {
          axios.post(import.meta.env.VITE_API_URL + '/dashboard/isAddOpeningBalance',{ date: date }, { headers: { 'Authorization': 'key ' + sessionToken } })
            .then((res) => {
              // console.log(res.data);
              if (res.data.sucess) {
                // we want to diply sucess message 
                navigate('');
              }
              // else {

              // }

            })
            .catch((err) => {
              console.log(err);
            })
        }

      })
      .catch((err) => {
        console.log(err);
      })

  }


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
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter cash amount"
              autoFocus
              onChange={(e) => setAmount(e.target.value)}

            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
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

export default CustomModel