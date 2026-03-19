import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStaff } from '../staff_context/AuthStaffContext';

const ProtectedStaffRoute = ({ children }) => {
  const { admin } = useAuthStaff();

  if (!admin) return <Navigate to="/staff/login" replace />;
  return children;
};

export default ProtectedStaffRoute;