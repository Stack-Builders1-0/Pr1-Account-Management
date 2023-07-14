import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AdvancsOnly() {
    return (
        <div className='d-flex flex-column align-items-center pt-4 '>
  <div className='white-box'>
  <div className='d-flex flex-column align-items-center'><h2>Advance Payment Only</h2></div>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicCustomerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control type="text" placeholder="Enter customer ID" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBillAmount">
        <Form.Label>Bill Amount</Form.Label>
        <Form.Control type="number" placeholder="Enter bill amount" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAdvanceAmount">
        <Form.Label>Advance Amount</Form.Label>
        <Form.Control type="number" placeholder="Enter advance amount" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDiscount">
        <Form.Label>Discount</Form.Label>
        <Form.Control type="number" placeholder="Enter discount" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" placeholder="Enter date" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmployeeId">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control type="text" placeholder="Enter employee ID" />
      </Form.Group>

     
      <Button variant="primary" type="submit">
                Submit
            </Button>
      
    </Form>
  </div>
</div>


    )
}

export default AdvancsOnly