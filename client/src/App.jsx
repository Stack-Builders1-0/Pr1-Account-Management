import React, { useState, useEffect } from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import OwnerPath from "./owner/ownerPath";
import EmployeePath from "./employee/EmployeePath";

function App() {
  const [user, setUser] = useState(null);
  const [typeID, setTypeID] = useState(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    const typeID = localStorage.getItem('type_id');
    setUser(sessionToken);
    setTypeID(typeID);
  });

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
        // ):(<OwnerPath></OwnerPath>
        ) : typeID === "sca" ? (
          <OwnerPath></OwnerPath>
        ) : typeID === "cas" ? (
          <EmployeePath></EmployeePath>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route
              path="*"
              element={<p>This page isn't available. Sorry about that.</p>}
            ></Route>
          </Routes>

        )}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;