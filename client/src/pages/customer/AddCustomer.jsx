import axios from 'axios';
import React, { useState } from 'react'
import { CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
    const [data, setData] = useState({
        name: 'nithu',
        businessname: 'stack',
        address: 'erlalai',
        mobile: '123456778',
        telephone: '123456789',
        whatsappNo: '123456789',
        officeNo: '123456789',
        email: 'nithu@gmail.com',
        nicNo: '20055700870',
        employee_id: "1",
        credit_limit: "40000"


    })
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post(import.meta.env.VITE_API_URL + '/customer/add', data)
            .then(res => {
                console.log(res);
                navigate('/customer')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex flex-column align-items-center pt-3'>

            <div className='white-box'>
                <div className='d-flex flex-column align-items-center'><h2>New Customer Registration  </h2></div>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>

                    <div className="col-12">
                        <label htmlFor="inputCustomerName" className="form-label">Customer Name</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control me-2"
                                id="inputFirstName"
                                placeholder='First Name'
                                autoComplete='off'
                                onChange={e => setData({ ...data, firstName: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control"
                                id="inputLastName"
                                placeholder='Last Name'
                                autoComplete='off'
                                onChange={e => setData({ ...data, lastName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputBusinessName" className="form-label">BusinessName</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputBusinessName"
                            placeholder='Business Name'
                            autoComplete='off'
                            onChange={e => setData({ ...data, BusinessName: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete='off'
                            onChange={e => setData({ ...data, address: e.target.value })}
                        />
                    </div>


                    <div className="col-12">
                        <label htmlFor="inputMobile" className="form-label">Mobile</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="inputMobile"
                            placeholder='Enter Mobile Number'
                            autoComplete='off'
                            onChange={e => setData({ ...data, mobile: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputTelephone" className="form-label">Telephone</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="inputTelephone"
                            placeholder='Enter Telephone Number'
                            autoComplete='off'
                            onChange={e => setData({ ...data, telephone: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputWhatsApp" className="form-label">WhatsApp Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="inputWhatsApp"
                            placeholder='Enter WhatsApp Number'
                            autoComplete='off'
                            onChange={e => setData({ ...data, whatsappNo: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputOffice" className="form-label">Office Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="inputOffice"
                            placeholder='Enter Office Number'
                            autoComplete='off'
                            onChange={e => setData({ ...data, officeNo: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder='Enter Email'
                            autoComplete='off'
                            onChange={e => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputNIC" className="form-label">NIC Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputNIC"
                            placeholder='Enter NIC Number'
                            autoComplete='off'
                            onChange={e => setData({ ...data, nicNo: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputEmployeeID" className="form-label">Employee ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmployeeID"
                            placeholder="Enter Employee ID"
                            autoComplete="off"
                            onChange={e => setData({ ...data, employee_id: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputCreditLimit" className="form-label">Credit Limit</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCreditLimit"
                            placeholder="Enter Credit Limit"
                            autoComplete="off"
                            onChange={e => setData({ ...data, credit_limit: e.target.value })}
                        />
                    </div>



                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Create</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default AddCustomer