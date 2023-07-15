import React from 'react'
import { Link } from 'react-router-dom'

function Customer() {
  return (
    <div className='d-flex justify-content-between px-5 py-3'>
        <Link to='/addcustomer' className='btn btn-primary'>Add Customer</Link>

      </div>
  )
}

export default Customer