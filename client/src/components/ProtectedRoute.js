import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Import your authentication logic

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // User is not authenticated, redirect to sign-in page
    return <Navigate to="/signin" replace />;
  }
  return children;
};


export default ProtectedRoute;