import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


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

	const handleSubmit = (event) => {
		event.preventDefault();
		// formdata.append("image", data.image);
		axios.post('http://localhost:5000/employee/add', data)
			.then(res => {
				console.log(res.data);
				if(res.data.sucess){
					// we want to diply sucess message 
					navigate('/employee');
				}else if (res.data.isExist){
					alert("NIC already exist. Please check your NIC!!!")
				}
				
			})
			.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<div className='d-flex flex-column align-items-center pt-4 '>
				<div className='white-box'>
					<div className='d-flex flex-column align-items-center'><h2>Register New Employee </h2></div>

					<form className="row g-3 w-50" onSubmit={handleSubmit}>
						<div className="col-12">
							<label htmlFor="inputName" className="form-label">Name</label>
							<input type="text" className="form-control" id="inputName" placeholder="Enter Name" autoComplete="off"
								onChange={e => setData({ ...data, employee_name: e.target.value })} />
						</div>
						<div className="col-12">
							<label htmlFor="inputEmail4" className="form-label">Email</label>
							<input type="email" className="form-control" id="inputEmail4" placeholder="Enter Email" autoComplete="off"
								onChange={e => setData({ ...data, email: e.target.value })} />
						</div>
						<div className="col-12">
							<label htmlFor="inputPassword4" className="form-label">Password</label>
							<input type="password" className="form-control" id="inputPassword4" placeholder="Enter Password"
								onChange={e => setData({ ...data, password: e.target.value })} />
						</div>
						
						<div className="col-12">
							<label htmlFor="inputAddress" className="form-label">Address</label>
							<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete="off"
								onChange={e => setData({ ...data, address: e.target.value })} />
						</div>
						<div className="col-12">
							<label htmlFor="inputMobile" className="form-label">Mobile</label>
							<input type="text" className="form-control" id="inputMobile" placeholder="Enter Mobile" autoComplete="off"
								onChange={e => setData({ ...data, mobile: e.target.value })} />
						</div>
						<div className="col-12">
							<label htmlFor="inputNic" className="form-label">NIC</label>
							<input type="text" className="form-control" id="inputNic" placeholder="Enter NIC" autoComplete="off"
								onChange={e => setData({ ...data, nic: e.target.value })} />
						</div>
						<div className="col-12">
							<label htmlFor="inputType" className="form-label">Type ID</label>
							<input type="text" className="form-control" id="inputType" placeholder="Enter Type ID" autoComplete="off"
								onChange={e => setData({ ...data, type_id: e.target.value })} />
						</div>
						<div className="col-12">
							<label htmlFor="inputAge" className="form-label">Age</label>
							<input type="text" className="form-control" id="inputAge" placeholder="Enter Age" autoComplete="off"
								onChange={e => setData({ ...data, age: e.target.value })} />
						</div>
						<div className="col-12 mb-3">
							<label className="form-label" htmlFor="inputGroupFile01">Employee Photo</label>
							<input type="file" className="form-control" id="inputGroupFile01"
								onChange={e => setData({ ...data, image: e.target.files[0] })} />
						</div>
						<div className="col-12">
							<button type="submit" className="btn btn-primary">Create</button>
						</div>
					</form>

				</div>
			</div></div>)
}

export default AddEmployee