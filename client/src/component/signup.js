import React, { useState } from 'react';
import './signup.css'

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const data = {userName:userName,password:password, firstName:firstName, lastName:lastName, email:email, NIC:NIC, phoneNo:phoneNo, address:address,gender:gender, type:type }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', userName, firstName,lastName,email,NIC,phoneNo,address,gender,type);
  }

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <select required value={type}
            onChange={(e)=> setType(e.target.value)}>
            <option value="">None</option>    
            <option value="cashier">cashier</option>
            <option value="SpecialCashier">Special Cashier</option>
        </select>

        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor="NIC">NIC:</label>
        <input
          type="text"
          id="NIC"
          value={NIC}
          onChange={(event) => setNIC(event.target.value)}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <label htmlFor="phoneNO">Phone NO:</label>
        <input
          type="tel"
          id="phoneNO"
          value={phoneNo}
          onChange={(event) => setPhoneNo(event.target.value)}
          required
        />
        <label htmlFor="gender">Gender:</label>
        <select required value={gender}
            onChange={(e)=> setGender(e.target.value)}>
            <option value="">None</option>    
            <option value="male">male</option>
            <option value="female">female</option>
        </select>
        <br></br>
        <button type="submit">SignUp</button>

        <p> Already have an account?</p>
        <a href= "/">logIn</a>
      </form>
    </div>
  );
};

export default SignUp;
