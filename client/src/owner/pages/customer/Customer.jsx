import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Customer() {
  const [customerData, setCustomerData] = useState([]);
  const sessionToken = localStorage.getItem("sessionToken");

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + "/customer/showByEmployee", "", {
        headers: { Authorization: "key " + sessionToken },
      })
      .then((res) => {
        setCustomerData(res.data.result);
      })
      .catch((error) => {
        console.log("Error fetching creditSale data:", error);
      });
  }, []);

  return (
    <div className="px-5 py-3">
      <Link to="/addcustomer" className="btn btn-primary">
        Add Customer
      </Link>

      <div className="mt-4 px-2 pt-5">
        <h3>Customer List</h3>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Business_Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Telephone_No</th>
              <th>WhatsApp_No</th>
              <th>Office_No</th>
              <th>NIC</th>
              <th>Credit_Limit</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {customerData.map((data) => (
              <tr key={data.customer_id}>
                <td>{data.customer_name}</td>
                <td>{data.business_name}</td>
                <td>{data.email_id}</td>
                <td>{data.adress}</td>
                <td>{data.lan_line}</td>
                <td>{data.w_app_no}</td>
                <td>{data.office_num}</td>
                <td>{data.nic_no}</td>
                <td>{data.credit_limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;
