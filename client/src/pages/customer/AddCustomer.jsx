import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddCustomer() {
    const [form, setForm] = useState({
        customer_name: '',
        firstName: '',
        lastName: '',
        businessname: '',
        adress: '',
        mobile: '',
        lan_line: '',
        w_app_no: '',
        officeNo: '',
        email_id: '',
        nic_no: '',
        employee_id: "",
        credit_limit: ""
    })
    const [errors, setErrors] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }


    const findFormErrors = () => {
        const { firstName, adress, mobile, lan_line, w_app_no, officeNo, email_id, nic_no, employee_id, credit_limit } = form
        const newErrors = {}
        // name errors
        if (!firstName || firstName === '') newErrors.firstName = 'cannot be blank!'
        else if (firstName.length > 30) newErrors.firstName = 'firstName is too long!'
        // food errors
        // if ( !employee_id || employee_id === '' ) newErrors.employee_id = 'cannot be blank!'
        if (!nic_no || nic_no === '') newErrors.nic_no = 'cannot be blank!'
        // comment errors
        if (!credit_limit || credit_limit === '') newErrors.credit_limit = 'cannot be blank!'
        else if (comment.credit_limit > 6) newErrors.credit_limit = 'comment is too long!'

        return newErrors
    }

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/customer");
    };

    const sessionToken = localStorage.getItem('sessionToken');
    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = findFormErrors();
        axios.post(import.meta.env.VITE_API_URL + '/customer/add', form, { headers: { 'Authorization': 'key ' + sessionToken } })
            .then(res => {
                if (Object.keys(newErrors).length > 0) {
                    // We got errors!
                    setErrors(newErrors)
                }
                else if (field.data.sucess) {
                    navigate('/customer');
                    // we want to display sucess message
                } else if (res.field.isExist) {
                    alert("this nic no has the acount. Please check your nic no");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <div className='white-box'>
                <div className='d-flex flex-column align-items-center'><h2>New Customer Registration  </h2></div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                id="inputFirstName"
                                placeholder="First Name"
                                autoComplete="off"
                                onChange={(e) => setField({ ...form, firstName: e.target.value })}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.firstName}
                            </Form.Control.Feedback>

                            <Form.Control
                                type="text"
                                id="inputLastName"
                                placeholder="Last Name"
                                autoComplete="off"
                                onChange={(e) => setField({ ...form, lastName: e.target.value })}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>BusinessName</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputBusinessName"
                            placeholder="Business Name"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, BusinessName: e.target.value })}
                            isInvalid={!!errors.BusinessName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.BusinessName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, adress: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputMobile"
                            placeholder="Enter Mobile Number"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, mobile: e.target.value })}
                            isInvalid={!!errors.mobile}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.mobile}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>LandLine</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputLandLine"
                            placeholder="Enter Landline Number"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, lan_line: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>WhatsApp Number</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputWhatsApp"
                            placeholder="Enter WhatsApp Number"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, w_app_no: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Office Number</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputOffice"
                            placeholder="Enter Office Number"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, officeNo: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, email_id: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIC Number</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputNIC"
                            placeholder="Enter NIC Number"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, nic_no: e.target.value })}
                            isInvalid={!!errors.nic_no}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.nic_no}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputEmployeeID"
                            placeholder="Enter Employee ID"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, employee_id: e.target.value })}
                            isInvalid={!!errors.employee_id}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.employee_id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Credit Limit</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputCreditLimit"
                            placeholder="Enter Credit Limit"
                            autoComplete="off"
                            onChange={(e) => setField({ ...form, credit_limit: e.target.value })}
                            isInvalid={!!errors.credit_limit}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.credit_limit}
                        </Form.Control.Feedback>

                    </Form.Group>

                    <div className="col-12 d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleCancel} className="mx-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </div>
                </Form>

            </div>
        </div>

    )
}

export default AddCustomer