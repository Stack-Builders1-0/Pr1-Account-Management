import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()


  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefalt();
    axios.post('http://localhost:5173/login', values)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/')
        } else {
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
          <img src="Images/Screenshot (27).jpg" />
        </div>
        <h2 className="align-items-center"> Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' name='email'
              onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
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

export default Login