import React from 'react'
import { Link } from 'react-router-dom'

function Customer() {
  return (
    <div className='px-5 py-3'>
      
      <Link to='/addcustomer' className='btn btn-primary'>Add Customer</Link>
      
      <div className='mt-4 px-2 pt-5'>
        <h3>Customer List</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>BusinessName</th>
              <th>Email</th>
              <th>Address</th>
              <th>Telephone</th>
              <th>Mobile</th>
              <th>WhatsAppNumber</th>
              <th>Salary</th>
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            <tr>
              <td>John Doe</td>
              <td>Business</td>
              <td>mail</td>
              <td>1st,street</td>
              <td>123-456-7890</td>
              <td>763456742</td>
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

export default Customer