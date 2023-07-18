import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';


function Profile() {
  const sessionToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    // show all the emplyee and details
    axios.post("http://localhost:5000/employee/showCurrent",{}, { headers: { 'Authorization': 'key ' + sessionToken } })
    .then((res) => {
      console.log(res.data.result[0]);
    });
  }, []);


  return (
    <div>Profile</div>
  )
}

export default Profile