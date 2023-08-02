import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Table, Card } from "react-bootstrap";



function Profile() {
  const sessionToken = localStorage.getItem('sessionToken');


  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios.post(import.meta.env.VITE_API_URL + "/employee/showCurrent", {}, { headers: { 'Authorization': 'key ' + sessionToken } })
      .then((res) => {
        setEmployeeData(res.data.result);
      
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      })
  });

  return (
    <div>

      <div className="row mt-5 px-5 pt-4 ">
        {employeeData.map((data) => (
          <div className="col-md-6 w-60 " key={data.employee_id}>
            <Card className="mb-4 mb-md-0 ">
              <Card.Body>
                <h2 className="mb-4" >
                  &#128100; User Profile
                </h2>
                <Table striped bordered hover size="sm" className="mb-4" style={{ fontSize: "20px" }}>
                  <tbody>
                    <tr>
                      <th>Employee Name</th>
                      <td>{data.employee_name}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{data.email}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{data.address}</td>
                    </tr>
                    <tr>
                      <th>Mobile</th>
                      <td>{data.mobile}</td>
                    </tr>
                    <tr>
                      <th>Age</th>
                      <td>{data.age}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>{data.type}</td>
                    </tr>
                    <tr>
                      <th>Employee ID</th>
                      <td>{data.employee_id}</td>
                    </tr>
                    <tr>
                      <th>NIC</th>
                      <td>{data.nic}</td>
                    </tr>
                  </tbody>
                </Table>


              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Profile