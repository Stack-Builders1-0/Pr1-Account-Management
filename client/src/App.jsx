import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './routerComponent/Dashboard'
import Employee from './routerComponent/Employee'
import Profile from './routerComponent/Profile'
import Customer from './routerComponent/Customer'
import Home from './routerComponent/Home'
import AddEmployee from './routerComponent/AddEmployee'
import AddCustomer from './routerComponent/AddCustomer'
import CashTransaction from './routerComponent/CashTransaction'
import CreditTransaction from './routerComponent/CreditTransaction'
import AdvanceOnly from './routerComponent/AdvanceOnly'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/customer' element={<Customer />}></Route>
          <Route path='/create' element={<AddEmployee />}></Route>
          <Route path='/addcustomer' element={<AddCustomer />}></Route>
          <Route path='/cashtransaction' element={<CashTransaction />}></Route>
          <Route path='/credittransaction' element={<CreditTransaction />}></Route>
          <Route path='/advanceonly' element={<AdvanceOnly />}></Route>

        </Route>
        <Route path='/login' element={<Login />}></Route>

      </Routes>
    </BrowserRouter>
    
  )
}

export default App
