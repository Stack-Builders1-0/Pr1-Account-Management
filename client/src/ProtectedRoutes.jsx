import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesOwner = () => {
  const loggedInOwner = localStorage.getItem("owner");

  return loggedInOwner ? <Outlet /> : <Navigate to="/" />;
};

const ProtectedRoutesEmployee = () => {
  const loggedInEmployee = localStorage.getItem("employee");

  return loggedInEmployee ? <Outlet /> : <Navigate to="/" />;
};

export { ProtectedRoutesOwner, ProtectedRoutesEmployee };


//app.jsx 
{/* <Route element={<ProtectedRoutesOwner />}>
          <Route path="/reports" element={<Reports />} />
          <Route path="/viewFlights" element={<ViewFlights />} />
        </Route>
        <Route element={<ProtectedRoutesEmployee />}>
          <Route path="/checkOut/:booking_id" element={<CheckOut />} />
          <Route path="/booking/:userid/:id" element={<Booking />} />
        </Route> */}