import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const { role, isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

// Outlet predefine component : - it work like children when the allowedRoles is having some value or calling that values . At the time when allowedRoles is pass from another component that component having some child value those child values are show in the outlet if it is isLoggedIn

export default RequireAuth;
