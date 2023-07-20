import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

function AddEmployee() {
	const [data, setData] = useState({
		employee_name: '',
		email: '',
		password: '',
		address: '',
		mobile: '',
		nic: '',
		type_id: '',
		age: '',
		image: ''
	})
	const navigate = useNavigate()
	const handleCancel = () => {
		navigate("/employee");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// formdata.append("image", data.image);
		axios.post('http://localhost:5000/employee/add', data)
			.then(res => {
				console.log(res.data);
				if (res.data.sucess) {
					// we want to diply sucess message 
					navigate('/employee');
				} else if (res.data.isExist) {
					alert("NIC already exist. Please check your NIC!!!")
				} else if (res.data.isError) {
					alert("Please check your details!!!")
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
								id="inputName"
								placeholder="Enter Name"
								autoComplete="off"
								onChange={(e) =>
									setData({ ...data, employee_name: e.target.value })
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputEmail4">Email</Form.Label>
							<Form.Control
								type="email"
								id="inputEmail4"
								placeholder="Enter Email"
								autoComplete="off"
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputPassword4">Password</Form.Label>
							<Form.Control
								type="password"
								id="inputPassword4"
								placeholder="Enter Password"
								onChange={(e) => setData({ ...data, password: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputAddress">Address</Form.Label>
							<Form.Control
								type="text"
								id="inputAddress"
								placeholder="1234 Main St"
								autoComplete="off"
								onChange={(e) => setData({ ...data, address: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputMobile">Mobile</Form.Label>
							<Form.Control
								type="text"
								id="inputMobile"
								placeholder="Enter Mobile"
								autoComplete="off"
								onChange={(e) => setData({ ...data, mobile: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputNic">NIC</Form.Label>
							<Form.Control
								type="text"
								id="inputNic"
								placeholder="Enter NIC"
								autoComplete="off"
								onChange={(e) => setData({ ...data, nic: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputType">Type ID</Form.Label>
							<Form.Select aria-label="Default select example">
								<option>select type id</option>
								<option value="cas">cashier</option>
								<option value="sca">Special cashier</option>
								autoComplete="off"
								onChange={(e) => setData({ ...data, type_id: e.target.value })}
							</Form.Select>

						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="inputAge">Age</Form.Label>
							<Form.Control
								type="text"
								id="inputAge"
								placeholder="Enter Age"
								autoComplete="off"
								onChange={(e) => setData({ ...data, age: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="form-label" htmlFor="inputGroupFile01">
								Employee Photo
							</Form.Label>
							<Form.Control
								type="file"
								id="inputGroupFile01"
								onChange={(e) => setData({ ...data, image: e.target.files[0] })}
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