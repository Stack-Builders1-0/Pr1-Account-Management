import React, { useState } from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavAndHeder from "./layouts/NavAndHeder";
import Employee from "./pages/employee/Employee";
import Profile from "./pages/employee/Profile";
import Customer from "./pages/customer/Customer";
import Dashboard from "./pages/dashboard/Dashboard";
import AddEmployee from "./pages/employee/AddEmployee";
import AddTransaction from "./pages/transaction/AddTransaction";
import AddCustomer from "./pages/customer/AddCustomer";
import CashTransaction from "./pages/transaction/CashTransaction";
import CreditTransaction from "./pages/transaction/CreditTransaction";
import AdvanceOnly from "./pages/transaction/AdvanceOnly";
import EditTransaction from "./pages/transaction/EditTransaction";
import EditCashTransaction from "./pages/transaction/EditCashForm";
import EditCreditTransaction from "./pages/transaction/EditCreditForm";
import EditAdvanceTransaction from "./pages/transaction/EditAdvanceForm";
import { UserContext } from "./UserContext";

function App() {
  const [user,setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<NavAndHeder />}>

        {/* <UserContext.Provider value={{user,setUser}}> */}
            <Route path="" element={<Dashboard />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/transaction" element={<AddTransaction />}></Route>
            <Route
              path="/transaction/cashtransaction"
              element={<CashTransaction />}
            ></Route>
            <Route
              path="/transaction/credittransaction"
              element={<CreditTransaction />}
            ></Route>
            <Route
              path="/transaction/advanceonly"
              element={<AdvanceOnly />}
            ></Route>
            
          <Route path="/edittransaction" element={<EditTransaction />}></Route>
          <Route
            path="/editcashtransaction"
            element={<EditCashTransaction />}
          ></Route>
          <Route
            path="/editcredittransaction"
            element={<EditCreditTransaction />}
          ></Route>
          <Route
            path="/editadvancetransaction"
            element={<EditAdvanceTransaction />}
          ></Route>

            
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/customer" element={<Customer />}></Route>
            <Route path="/addemployee" element={<AddEmployee />}></Route>
            <Route path="/addcustomer" element={<AddCustomer />}></Route>
          {/* </UserContext.Provider> */}
          
          </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
