import React, { useState, useEffect } from "react";
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
import AdvanceBPTransaction from "./pages/transaction/AdvanceBPTransaction";
import AdvanceAPTransaction from "./pages/transaction/AdvanceAPTransaction";
import EditTransaction from "./pages/transaction/EditTransaction";
import EditCashTransaction from "./pages/transaction/EditCashForm";
import EditCreditTransaction from "./pages/transaction/EditCreditForm";
import EditAdvanceTransaction from "./pages/transaction/EditAdvanceForm";
import Expenses from "./pages/expenses/Expenses";
import AddExpense from "./pages/expenses/AddExpense";
import Report from "./pages/report/Report";
import { UserContext } from "./UserContext";
import History from "./Histoty";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    setUser(sessionToken);
  });
  // fetchUser();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        {
          !user ? (
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
              <Route path="*" element={<p>This page isn't available. Sorry about that.</p>}></Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<NavAndHeder />}>
                <Route path="" element={<Dashboard />}></Route>
                <Route path="/employee" element={<Employee />}></Route>
                <Route path="/transaction" element={<AddTransaction />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/customer" element={<Customer />}></Route>
                <Route path="/addemployee" element={<AddEmployee />}></Route>
                <Route path="/addcustomer" element={<AddCustomer />}></Route>
                <Route path="/expenses" element={<Expenses />}></Route>
                <Route path="/report" element={<Report />}></Route>
                  <Route path="/addexpense" element={<AddExpense />}></Route>
                  <Route
                    path="/history" element={<History/>}>
                </Route>
                <Route
                  path="/transaction/cashtransaction"
                  element={<CashTransaction />}
                ></Route>
                <Route
                  path="/transaction/credittransaction"
                  element={<CreditTransaction />}
                ></Route>
                <Route
                  path="/transaction/advancebptransaction"
                  element={<AdvanceBPTransaction />}
                ></Route>

                <Route
                  path="/transaction/advanceaptransaction"
                  element={<AdvanceAPTransaction />}
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
                  
                <Route path="*" element={<p>This page isn't available. Sorry about that.</p>}></Route>
              </Route>
             
            </Routes>
          )
        }
           
        
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
