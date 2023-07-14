import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';

function Home() {
  const [data, setData] = useState({ totalIncome: '34567.6$' })
  const [showTransaction, setShowTransaction] = useState(false);

  const handleClose = () => setShowTransaction(false);
  const handleShow = () => setShowTransaction(true);

  useEffect(() => {
    fetch(`https://dummy.restapiexample.com/api/v1/employees`)
      .then((response) => response.body)
    // .then((body) => setData(body.data));
  }, [])
  // console.log(data)

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration'>
          <div className='text-center pb-1'>
            <h4>Total Income</h4>
            <hr />
            <div>
              <h5>{data.totalIncome}</h5>
            </div>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration'>
          <div className='text-center pb-1'>
            <h4>Total Loan</h4>
            <hr />
            <div>
              <h5>2456.7$</h5>
            </div>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25  square-decoration'>
          <div className='text-center pb-1'>
            <h4>Cashier Income</h4>
            <hr />
            <div>
              <h5>12341$</h5>
            </div>
          </div>
        </div>

      </div>





      <div className='d-flex justify-content-between px-5 py-3'>
        <Button className="nextButton" onClick={handleShow}>
          Add Transaction
        </Button>
        <Link to='/addcustomer' className='btn btn-primary'>Add Customer</Link>

      </div>

      <Modal show={showTransaction} onHide={handleClose} size="lg">

        <Modal.Body>
          <div className='p-3 d-flex justify-content-around mt-3'>
            <Button variant="primary" onClick={handleClose}>
              <Link to='/cashtransaction' className='btn btn-primary'>CashTransaction</Link>
            </Button>
            <Button variant="primary" onClick={handleClose}>

              <Link to='/credittransaction' className='btn btn-primary'>CreditTransaction</Link>
            </Button>
            <Button variant="primary" onClick={handleClose}>
              <Link to='/advanceonly' className='btn btn-primary'>AdvanceOnly</Link>
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>



      <div className='mt-4 px-4 pt-3'>
        <h3>List of Loan</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Loan</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            <tr>
              <td>John Doe</td>
              <td>$10,000</td>
              <td>johndoe@example.com</td>
              <td>123-456-7890</td>
              <td>
                {/* Action buttons */}
                <button>Pending</button>
                <button>Paid</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>$5,000</td>
              <td>janesmith@example.com</td>
              <td>987-654-3210</td>
              <td>
                {/* Action buttons */}
                <button>Pending</button>
                <button>Paid</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>




    </div>

  )
}

export default Home