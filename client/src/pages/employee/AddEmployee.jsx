import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddEmployee() {
	const [data, setData] = useState({
		name: '',
		telephone: '',
		mobile:'',
		email: '',
		password: '',
		address: '',
		salary: '',
		image: ''
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("telephone", data.telephone);
		formdata.append("mobile", data.mobile);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("address", data.address);
		formdata.append("salary", data.salary);
		formdata.append("image", data.image);
		axios.post('http://localhost:5173/create', formdata)
			.then(res => {
				navigate('/employee')
			})
			.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<div className='d-flex flex-column align-items-center  '>
				<div className='white-box'>
					<div className='d-flex flex-column align-items-center'><h2>Register New Employee </h2></div>

					<form class="row g-3 w-50" onSubmit={handleSubmit}>
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
							<label htmlFor="inputTelephone" className="form-label">Telephone</label>
							<input
								type="text"
								className="form-control"
								id="inputTelephone"
								placeholder="Enter Telephone"
								autoComplete="off"
								onChange={e => setData({ ...data, telephone: e.target.value })}
							/>
						</div>

						<div className="col-12">
							<label htmlFor="inputMobile" className="form-label">Mobile</label>
							<input
								type="text"
								className="form-control"
								id="inputMobile"
								placeholder="Enter Mobile"
								autoComplete="off"
								onChange={e => setData({ ...data, mobile: e.target.value })}
							/>
						</div>

						<div className="col-12">
							<label htmlFor="inputEmail4" className="form-label">Email</label>
							<input
								type="email"
								className="form-control"
								id="inputEmail4"
								placeholder="Enter Email"
								autoComplete="off"
								onChange={e => setData({ ...data, email: e.target.value })}
							/>
						</div>

						<div className="col-12">
							<label htmlFor="inputPassword4" className="form-label">Password</label>
							<input
								type="password"
								className="form-control"
								id="inputPassword4"
								placeholder="Enter Password"
								onChange={e => setData({ ...data, password: e.target.value })}
							/>
						</div>

						<div className="col-12">
							<label htmlFor="inputSalary" className="form-label">Salary</label>
							<input
								type="text"
								className="form-control"
								id="inputSalary"
								placeholder="Enter Salary"
								autoComplete="off"
								onChange={e => setData({ ...data, salary: e.target.value })}
							/>
						</div>

						<div className="col-12">
							<label htmlFor="inputAddress" className="form-label">Address</label>
							<input
								type="text"
								className="form-control"
								id="inputAddress"
								placeholder="1234 Main St"
								autoComplete="off"
								onChange={e => setData({ ...data, address: e.target.value })}
							/>
						</div>

						<div className="col-12 mb-3">
							<label className="form-label" htmlFor="inputGroupFile01">Employee Photo</label>
							<input
								type="file"
								className="form-control"
								id="inputGroupFile01"
								onChange={e => setData({ ...data, image: e.target.files[0] })}
							/>
						</div>

						<div class="col-12">
							<button type="submit" class="btn btn-primary">Create</button>
						</div>
					</form>
				</div>
			</div></div>)
}

export default AddEmployee