import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddCustomer() {
    const [form, setForm] = useState({
      
        customer_name : '' ,
        businessname: '',
        adress: '',
        mobile: '',
        lan_line: '',
        w_app_no: '',
        officeNo: '',
        email_id: '',
        nic_no: '',
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
        const { customer_name, mobile, email_id, nic_no, credit_limit } = form
        const newErrors = {}
        // name errors
        if (!customer_name || customer_name === '') newErrors.customer_name = 'cannot be blank!'
        else if (customer_name.length > 30) newErrors.customer_name = 'firstName is too long!'
    
        if (!mobile || mobile === '') newErrors.mobile = 'cannot be blank!'
        if ( !email_id || email_id === '' ) newErrors.email_id = 'cannot be blank!'
        if (!nic_no || nic_no === '') newErrors.nic_no = 'cannot be blank!'
        // comment errors
        if (!credit_limit || credit_limit === '') newErrors.credit_limit = 'cannot be blank!'
       

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
        console.log(form)
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        }
        else
            axios.post(import.meta.env.VITE_API_URL + '/customer/add', form, { headers: { 'Authorization': 'key ' + sessionToken } })
            .then(res => {
                
                if (res.data.isExist) {
                    alert("this nic no has the acount. Please check your nic no");
                }
                else if (res.data.sucess) {
                    navigate('/customer');
                    // we want to display sucess message
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
                                id="customer_name"
                                placeholder="Customer Name"
                                autoComplete="off"
                                onChange={(e) => setField('customer_name', e.target.value)}
                                
                                isInvalid={!!errors.customer_name}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.customer_name}
                            </Form.Control.Feedback>

                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>BusinessName</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputBusinessName"
                            placeholder="Business Name"
                            autoComplete="off"
                            onChange={(e) => setField( 'BusinessName', e.target.value)}
                            
                        />
                        </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            id="adress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            onChange={(e) => setField( 'adress', e.target.value )}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type="number"
                            id="mobile"
                            placeholder="Enter Mobile Number"
                            autoComplete="off"
                            onChange={(e) => setField(  'mobile', e.target.value)}
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
                            onChange={(e) => setField( 'lan_line', e.target.value )}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>WhatsApp Number</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputWhatsApp"
                            placeholder="Enter WhatsApp Number"
                            autoComplete="off"
                            onChange={(e) => setField( 'w_app_no', e.target.value )}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Office Number</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputOffice"
                            placeholder="Enter Office Number"
                            autoComplete="off"
                            onChange={(e) => setField( 'officeNo', e.target.value )}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            id="email_id"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) => setField( 'email_id', e.target.value)}
                            isInvalid={!!errors.email_id}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.email_id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIC Number</Form.Label>
                        <Form.Control
                            type="text"
                            id="nic_no"
                            placeholder="Enter NIC Number"
                            autoComplete="off"
                            onChange={(e) => setField( 'nic_no', e.target.value)}
                            isInvalid={!!errors.nic_no}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.nic_no}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Credit Limit</Form.Label>
                        <Form.Control
                            type="number"
                            id="credit_limit"
                            placeholder="Enter Credit Limit"
                            autoComplete="off"
                            onChange={(e) => setField( 'credit_limit', e.target.value )}
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