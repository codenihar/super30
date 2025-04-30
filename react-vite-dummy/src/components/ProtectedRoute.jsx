import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  console.log(`isAuthenticated: ${isAuthenticated}`);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
