import React, { useState, useEffect } from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import OwnerPath from "./owner/ownerPath";
import EmployeePath from "./employee/EmployeePath";
// OWNER PAGES
// import NavAndHeder from "./owner/layouts/NavAndHeder";
// import Employee from "./owner/pages/employee/Employee";
// import Profile from "./owner/pages/employee/Profile";
// import Customer from "./owner/pages/customer/Customer";
// import Dashboard from "./owner/pages/dashboard/Dashboard";
// import AddEmployee from "./owner/pages/employee/AddEmployee";
// import AddTransaction from "./owner/pages/transaction/AddTransaction";
// import AddCustomer from "./owner/pages/customer/AddCustomer";
// import CashTransaction from "./owner/pages/transaction/Cash/CashTransaction";
// import CreditTransaction from "./owner/pages/transaction/Credit/CreditTransaction";
// import AdvanceBPTransaction from "./owner/pages/transaction/AdvanceBP/AdvanceBPTransaction";
// import AddAdvanceBPForm from "./owner/pages/transaction/AdvanceBP/AddAdvancedBP";
// import AdvanceAPTransaction from "./owner/pages/transaction/AdvanceAP/AdvanceAPTransaction";
// import AddAdvanceAPForm from "./owner/pages/transaction/AdvanceAP/AdvanceAPForm";
// import SettleAdvancedAP from "./owner/pages/transaction/AdvanceAP/SettleAdvancedAP";
// import EditCashForm from "./owner/pages/transaction/Cash/EditCashForm";
// import EditCreditForm from "./owner/pages/transaction/Credit/EditCreditForm";
// import EditTransaction from "./owner/pages/transaction/EditTransaction";
// import EditAdvanceBPForm from "./owner/pages/transaction/AdvanceBP/EditAdvanceBPForm";
// import EditAdvanceAPForm from "./owner/pages/transaction/AdvanceAP/EditAdvanceAPForm";
// import AddCreditForm from "./owner/pages/transaction/Credit/AddCreditForm";
// import ReturnAdvanceBP from "./owner/pages/transaction/AdvanceBP/ReturnAdvanceBP";
// import SettleAdvancedBP from "./owner/pages/transaction/AdvanceBP/SettleAdvancedBP";
// import Expenses from "./owner/pages/expenses/Expenses";
// import AddExpense from "./owner/pages/expenses/AddExpense";
// import SettleForm from "./owner/pages/transaction/Credit/SettleForm";
// import History from "./owner/pages/customer/History";
// import Report from "./owner/pages/report/Report";

//EMPLOYEEPAGES
import NavAndHeder from "./employee/layouts/NavAndHeder";
import Profile from "./employee/pages/employee/Profile";
import Customer from "./employee/pages/customer/Customer";
import Dashboard from "./employee/pages/dashboard/Dashboard";
import AddTransaction from "./employee/pages/transaction/AddTransaction";
import AddCustomer from "./employee/pages/customer/AddCustomer";
import CashTransaction from "./employee/pages/transaction/Cash/CashTransaction";
import CreditTransaction from "./employee/pages/transaction/Credit/CreditTransaction";
import AdvanceBPTransaction from "./employee/pages/transaction/AdvanceBP/AdvanceBPTransaction";
import AddAdvanceBPForm from "./employee/pages/transaction/AdvanceBP/AddAdvancedBP";
import AdvanceAPTransaction from "./employee/pages/transaction/AdvanceAP/AdvanceAPTransaction";
import AddAdvanceAPForm from "./employee/pages/transaction/AdvanceAP/AdvanceAPForm";
import SettleAdvancedAP from "./employee/pages/transaction/AdvanceAP/SettleAdvancedAP";
import EditCashForm from "./employee/pages/transaction/Cash/EditCashForm";
import EditCreditForm from "./employee/pages/transaction/Credit/EditCreditForm";
import EditTransaction from "./employee/pages/transaction/EditTransaction";
import EditAdvanceBPForm from "./employee/pages/transaction/AdvanceBP/EditAdvanceBPForm";
import EditAdvanceAPForm from "./employee/pages/transaction/AdvanceAP/EditAdvanceAPForm";
import AddCreditForm from "./employee/pages/transaction/Credit/AddCreditForm";
import ReturnAdvanceBP from "./employee/pages/transaction/AdvanceBP/ReturnAdvanceBP";
import SettleAdvancedBP from "./employee/pages/transaction/AdvanceBP/SettleAdvancedBP";
import Expenses from "./employee/pages/expenses/Expenses";
import AddExpense from "./employee/pages/expenses/AddExpense";
import SettleForm from "./employee/pages/transaction/Credit/SettleForm";
import History from "./employee/pages/customer/History";
import Report from "./employee/pages/report/Report";



function App() {
  const [user, setUser] = useState(null);
  const [typeID, setTypeID] = useState(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    const typeID = localStorage.getItem('typeID');
    setUser(sessionToken);
    setTypeID(typeID);
  });
  // fetchUser();



  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route
              path="*"
              element={<p>This page isn't available. Sorry about that.</p>}
            ></Route>
          </Routes>
        ) : (
       
          switch(typeID){
          case <OwnerPath></OwnerPath>

          <EmployeePath></EmployeePath>} 
          //OWNER ROUTES
          // <Routes>
          //   <Route path="/login" element={<Login />} />

          //   <Route path="/" element={<NavAndHeder />}>
          //     <Route path="" element={<Dashboard />}></Route>
          //     <Route path="/transaction" element={<AddTransaction />}></Route>
          //     <Route path="/profile" element={<Profile />}></Route>
          //     <Route path="/customer" element={<Customer />}></Route>
          //     <Route path="/employee" element={<Employee />}></Route>
          //     <Route path="/addemployee" element={<AddEmployee />}></Route>
          //     <Route path="/addcustomer" element={<AddCustomer />}></Route>
          //     <Route path="/expenses" element={<Expenses />}></Route>
          //     <Route path="/addexpense" element={<AddExpense />}></Route>
          //     <Route path="/history" element={<History />}></Route>
          //     <Route path="/report" element={<Report />}></Route>
          //     <Route path="/transaction/cashtransaction" element={<CashTransaction />} ></Route>
          //     <Route path="/transaction/credittransaction" element={<CreditTransaction />} ></Route>
          //     <Route path="/transaction/advancebptransaction" element={<AdvanceBPTransaction />} ></Route>
          //     <Route path="/transaction/credittransaction/settlepayment" element={<SettleForm />}  ></Route>
          //     <Route path="/transaction/advancebptransaction" element={<AdvanceBPTransaction />}  ></Route>
          //     <Route path="/transaction/credittransaction/add" element={<AddCreditForm />} ></Route>
          //     <Route path="/transaction/advancebptransaction/add" element={<AddAdvanceBPForm />} ></Route>
          //     <Route path="/transaction/advancebptransaction/settletransaction" element={<SettleAdvancedBP />} ></Route>
          //     <Route path="/transaction/advanceaptransaction/returntransaction" element={<ReturnAdvanceBP />} ></Route>
          //     <Route path="/transaction/advanceaptransaction" element={<AdvanceAPTransaction />} ></Route>
          //     <Route path="/transaction/advanceaptransaction/add" element={<AddAdvanceAPForm />}  ></Route>
          //     <Route path="/transaction/advanceaptransaction/settletransaction" element={<SettleAdvancedAP />}  ></Route>
          //     <Route path="/edittransaction/credit" element={<EditCreditForm />} ></Route>
          //     <Route path="/edittransaction/cash" element={<EditCashForm />}  ></Route>
          //     <Route path="/edittransaction/advancebp" element={<EditAdvanceBPForm />} ></Route>
          //     <Route path="/edittransaction/advanceap" element={<EditAdvanceAPForm />} ></Route>
          //     <Route path="/edittransaction" element={<EditTransaction />} ></Route>
          //     <Route path="*" element={<p>This page isn't available. Sorry about that.</p>}  ></Route>
          //   </Route>
          // </Routes>


          // //EMPLOYEE ROUTES
          // <Routes>
          //   <Route path="/login" element={<Login />} />

          //   <Route path="/" element={<NavAndHeder />}>
          //     <Route path="" element={<Dashboard />}></Route>
          //     <Route path="/transaction" element={<AddTransaction />}></Route>
          //     <Route path="/profile" element={<Profile />}></Route>
          //     <Route path="/customer" element={<Customer />}></Route>            
          //     <Route path="/addcustomer" element={<AddCustomer />}></Route>
          //     <Route path="/expenses" element={<Expenses />}></Route>
          //     <Route path="/addexpense" element={<AddExpense />}></Route>
          //     <Route path="/history" element={<History />}></Route>
          //     <Route path="/report" element={<Report />}></Route>
          //     <Route path="/transaction/cashtransaction" element={<CashTransaction />} ></Route>
          //     <Route path="/transaction/credittransaction" element={<CreditTransaction />} ></Route>
          //     <Route path="/transaction/advancebptransaction" element={<AdvanceBPTransaction />} ></Route>
          //     <Route path="/transaction/credittransaction/settlepayment" element={<SettleForm />}  ></Route>
          //     <Route path="/transaction/advancebptransaction" element={<AdvanceBPTransaction />}  ></Route>
          //     <Route path="/transaction/credittransaction/add" element={<AddCreditForm />} ></Route>
          //     <Route path="/transaction/advancebptransaction/add" element={<AddAdvanceBPForm />} ></Route>
          //     <Route path="/transaction/advancebptransaction/settletransaction" element={<SettleAdvancedBP />} ></Route>
          //     <Route path="/transaction/advanceaptransaction/returntransaction" element={<ReturnAdvanceBP />} ></Route>
          //     <Route path="/transaction/advanceaptransaction" element={<AdvanceAPTransaction />} ></Route>
          //     <Route path="/transaction/advanceaptransaction/add" element={<AddAdvanceAPForm />}  ></Route>
          //     <Route path="/transaction/advanceaptransaction/settletransaction" element={<SettleAdvancedAP />}  ></Route>
          //     <Route path="/edittransaction/credit" element={<EditCreditForm />} ></Route>
          //     <Route path="/edittransaction/cash" element={<EditCashForm />}  ></Route>
          //     <Route path="/edittransaction/advancebp" element={<EditAdvanceBPForm />} ></Route>
          //     <Route path="/edittransaction/advanceap" element={<EditAdvanceAPForm />} ></Route>
          //     <Route path="/edittransaction" element={<EditTransaction />} ></Route>
          //     <Route path="*" element={<p>This page isn't available. Sorry about that.</p>}  ></Route>
          //   </Route>
          // </Routes>





        )}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;










// import EditCashTransaction from "./pages/transaction/Cash" "./pages/transaction/Cash/EditCashForm";
// import EditCreditTransaction from "./pages/transaction/Credit/EditCreditForm";
// import EditAdvanceTransaction from "./pages/transaction/AdvanceBP/EditAdvanceForm";

{/* <Route path="/" element={<NavAndHeder />}>
              <Route path="" element={<Dashboard />}></Route>
              <Route path="/employee" element={<Employee />}></Route>
              <Route path="/transaction" element={<AddTransaction />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/addemployee" element={<AddEmployee />}></Route>
              <Route path="/addcustomer" element={<AddCustomer />}></Route>
              <Route path="/expenses" element={<Expenses />}></Route>
              <Route path="/addexpense" element={<AddExpense />}></Route>
              <Route path="/history" element={<History />}></Route>
              <Route path="/report" element={<Report />}></Route>
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
                path="/transaction/credittransaction/settlepayment"
                element={<SettleForm />}
              ></Route>
              <Route
                path="/transaction/advancebptransaction"
                element={<AdvanceBPTransaction />}
              ></Route>

              <Route
                path="/transaction/credittransaction/add"
                element={<AddCreditForm />}
              ></Route>

              <Route
                path="/transaction/advancebptransaction/add"
                element={<AddAdvanceBPForm />}
              ></Route>

              <Route
                path="/transaction/advancebptransaction/settletransaction"
                element={<SettleAdvancedBP />}
              ></Route>

              <Route
                path="/transaction/advanceaptransaction/returntransaction"
                element={<ReturnAdvanceBP />}
              ></Route>

              <Route
                path="/transaction/advanceaptransaction"
                element={<AdvanceAPTransaction />}
              ></Route>

              <Route
                path="/transaction/advanceaptransaction/add"
                element={<AddAdvanceAPForm />}
              ></Route>

              <Route
                path="/transaction/advanceaptransaction/settletransaction"
                element={<SettleAdvancedAP />}
              ></Route>

              <Route
                path="/edittransaction/credit"
                element={<EditCreditForm />}
              ></Route>

              <Route
                path="/edittransaction/cash"
                element={<EditCashForm />}
              ></Route>

              <Route
                path="/edittransaction/advancebp"
                element={<EditAdvanceBPForm />}
              ></Route>

              <Route
                path="/edittransaction/advanceap"
                element={<EditAdvanceAPForm />}
              ></Route>

              <Route
                path="/edittransaction"
                element={<EditTransaction />}
              ></Route> */}
{/* <Route
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
              ></Route> */}

{/* <Route
                path="*"
                element={<p>This page isn't available. Sorry about that.</p>}
              ></Route>
            </Route> */}