import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddEmployee() {
	const [form, setForm] = useState({
		employee_name: '',
		email: '',
		password: '',
		address: '',
		mobile: '',
		nic: '',
		type_id: '',
		dob: '',
		image: ''
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
		const { employee_name, mobile, email, nic, password, address, type_id, dob } = form
		const newErrors = {}
		// name errors
		if (!employee_name || employee_name === '') newErrors.employee_name = 'cannot be blank!'
		else if (employee_name.length > 30) newErrors.employee_name = 'firstName is too long!'

		if (!mobile || mobile === '') newErrors.mobile = 'cannot be blank!'
		if (!email || email === '') newErrors.email = 'cannot be blank!'
		if (!nic || nic === '') newErrors.nic = 'cannot be blank!'
		if (!address || address === '') newErrors.address = 'cannot be blank!'
		if (!type_id || type_id === '') newErrors.type_id = 'cannot be blank!'
		if (!dob || dob === '') newErrors.dob = 'cannot be blank!'
		// comment errors
		if (!password || password === '') newErrors.password = 'cannot be blank!'


		return newErrors
	}

	const navigate = useNavigate()
	const handleCancel = () => {
		navigate("/employee");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newErrors = findFormErrors();
		if (Object.keys(newErrors).length > 0) {
			// We got errors!
			setErrors(newErrors)
		}
		// formdata.append("image", data.image);
		axios.post(import.meta.env.VITE_API_URL + '/employee/add', form)
			.then(res => {
				// console.log(res.data);
				if (res.data.isExist) {
					alert("NIC already exist. Please check your NIC!!!")
				}

				else if (res.data.sucess) {
					// we want to diply sucess message 
					navigate('/employee');
				}
			})
			.catch(err => console.log(err));
	}

	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<div className='d-flex flex-column align-items-center pt-4 w-100'>
				<div className='white-box '>
					<div className='d-flex flex-column align-items-center'><h2>Register New Employee </h2></div>

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" >
							<Form.Label >Name</Form.Label>
							<Form.Control
								type="text"
								id="employee_name"
								placeholder="Enter Name"
								autoComplete="off"
								onChange={(e) => setField('employee_name', e.target.value)}
								isInvalid={!!errors.employee_name}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.employee_name}
							</Form.Control.Feedback>


						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputEmail4">Email</Form.Label>
							<Form.Control
								type="email"
								id="email"
								placeholder="Enter Email"
								autoComplete="off"
								onChange={(e) => setField('email', e.target.value)}
								isInvalid={!!errors.email}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputPassword4">Password</Form.Label>
							<Form.Control
								type="password"
								id="password"
								placeholder="Enter Password"
								onChange={(e) => setField('password', e.target.value)}
								isInvalid={!!errors.password}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputAddress">Address</Form.Label>
							<Form.Control
								type="text"
								id="address"
								placeholder="1234 Main St"
								autoComplete="off"
								onChange={(e) => setField('address', e.target.value)}
								isInvalid={!!errors.address}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.address}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputMobile">Mobile</Form.Label>
							<Form.Control
								type="text"
								id="mobile"
								placeholder="Enter Mobile"
								autoComplete="off"
								onChange={(e) => setField('mobile', e.target.value)}
								isInvalid={!!errors.mobile}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.mobile}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputNic">NIC</Form.Label>
							<Form.Control
								type="text"
								id="nic"
								placeholder="Enter NIC"
								autoComplete="off"
								onChange={(e) => setField('nic', e.target.value)}
								isInvalid={!!errors.nic}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.nic}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="type_id" className="mb-3">
							<Form.Label>Type</Form.Label>
							<Form.Select as="select" onChange={(e) => setField('type_id', e.target.value)} isInvalid={!!errors.type_id}>
								<option>select type</option>
								<option value="cas">cashier</option>
								<option value="sca">Special cashier</option>
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{errors.type_id}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputAge">DOB</Form.Label>
							<Form.Control
								type="date"
								id="dob"
								placeholder="dob"
								autoComplete="off"
								onChange={(e) => setField('dob', e.target.value)}
								isInvalid={!!errors.dob}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.dob}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="form-label" htmlFor="inputGroupFile01">
								Employee Photo
							</Form.Label>
							<Form.Control
								type="file"
								id="image"
								onChange={(e) => setField('image', e.target.files[0])}
							/>
						</Form.Group>

						<div className="col-12 d-flex justify-content-between">
							<Button variant="secondary" onClick={handleCancel} className="mx-2">
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								Create
							</Button>

						</div>
					</Form>

				</div>
			</div></div>)
}

export default AddEmployee