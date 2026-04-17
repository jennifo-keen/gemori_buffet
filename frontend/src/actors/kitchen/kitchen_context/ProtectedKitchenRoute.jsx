import React from 'react';
import { Navigate } from 'react-router-dom';

import  useAuthStaff  from '../../staff/staff_hook/useAuthStaff';

const ProtectedKitchenRoute = ({ children }) => {
  const { admin, kitchen } = useAuthStaff();

  if (!(admin || kitchen)) return <Navigate to="/kitchen/login" replace />;
  return children;
};

export default ProtectedKitchenRoute;