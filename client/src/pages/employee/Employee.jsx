import React from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  return (
    <div className='px-5 py-3'>
      
      <Link to='/create' className='btn btn-success'>Add Employee</Link>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>


        
      </div>
    </div>
  )
}

export default Employee