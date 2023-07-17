import React, { useState } from 'react'
import '../../style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [values, setValues] = useState({
    nic: '',
    password: ''
  })

  const navigate = useNavigate()


  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', values)
      .then(res => {
        console.log(res.data);
        if (res.data.sucess) {
          // store the session token in the local storage
          localStorage.setItem('sessionToken',res.data.sessionToken);
          navigate('/')
        } else {
          alert("Incorrect Username pasword");
          setError(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }

  return (


    <div className='vh-100 d-flex align-items-center justify-content-center  loginPage'>
      <div className='bg-white p-4 rounded w-30 border'>
        <div className='text-danger'>
          {error && error}

        </div>
        <div className="row justify-content-center logoContainer">
          <img src="Images/aivha-full.png" />
        </div>
        <h3 className="align-items-center "> Log in</h3>
        <form onSubmit={handleSubmit} >
          <div className='mb-3'>
            <label htmlFor="nic"><strong>NIC</strong></label>
            <input type="text" placeholder='Enter NIC' name='nic'
              onChange={e => setValues({ ...values, nic: e.target.value })} className='form-control rounded-0' />
          </div>

          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' name='password'
              onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>

        </form>


      </div>
    </div>



  )
}

export default Login