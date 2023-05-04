import React, { useState } from 'react';
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', username, password);
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <a href='/forgotten'>Forgot Password</a>
        <br></br>
        <button type="submit">Login</button>
        <p></p>
        <a href= "/signup">SignUp</a>
      </form>
    </div>
  );
};

export default Login;
