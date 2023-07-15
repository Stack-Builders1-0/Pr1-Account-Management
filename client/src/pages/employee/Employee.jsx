import React from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  return (
    <div className='px-5 py-3'>
      
      <Link to='/addemployee' className='btn btn-primary'>Add Employee</Link>
      
      <div className='mt-4 px-2 pt-5'>
        <h3>Employee List</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Telephone</th>
              <th>Mobile</th>
              <th>Salary</th>
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            <tr>
              <td>John Doe</td>
              <td>Business</td>
              <td>1st,street</td>
              <td>123-456-7890</td>
              <td>763456742</td>
              <td>345</td>
             
              <td>somedate</td>
              
              
            </tr>
            
           
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

        
      </div>
   
  )
}

export default Employee