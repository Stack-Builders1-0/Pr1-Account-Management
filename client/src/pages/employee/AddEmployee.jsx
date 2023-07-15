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
		nic :'',
		type_id : '',
		age: '',
		image: ''
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("employee_name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("address", data.address);
		formdata.append("mobile", data.salary);
		formdata.append("nic", data.nic);
		formdata.append("type_id", data.type_id);
		formdata.append("age", data.age);
		formdata.append("image", data.image);
		axios.post('http://localhost:5000/employee/add', formdata)
		.then(res => {
			console.log(res);
			navigate('/employee')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<div className='d-flex flex-column align-items-center pt-4 '>
        <div className='white-box'>
         <div className='d-flex flex-column align-items-center'><h2>Register New Employee </h2></div> 
			
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Salary</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setData({...data, salary: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})}/>
				</div>
				<div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Employee Photo</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
				</div>
				</div></div>)
}

export default AddEmployee