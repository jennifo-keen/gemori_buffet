import React from 'react';
import { AuthStaffProvider } from '../actors/staff/staff_context/AuthStaffContext.jsx'
import ProtectedStaffRoute from '../actors/staff/staff_context/ProtectedStaffRoute.jsx';
import StaffLayout from '../actors/staff/staff_pages/StaffLayout.jsx';
import Floor1 from '../actors/staff/staff_pages/Floor1.jsx';
import Floor2 from '../actors/staff/staff_pages/Floor2.jsx';
import StaffLogin from '../actors/staff/staff_pages/StaffLogin.jsx';
import StaffOrders from '../actors/staff/staff_pages/StaffOrders.jsx';
import StaffCheckOut from '../actors/staff/staff_pages/StaffCheckOut.jsx';
import StaffPay from '../actors/staff/staff_pages/StaffPay.jsx';

const staffRouter = {
  path: "/staff",
  element: <AuthStaffProvider />, 
  children: [

    {
      path: "login",
      element: <StaffLogin />,
    },
    {
      element: (
        <ProtectedStaffRoute>
          <StaffLayout />
        </ProtectedStaffRoute>
      ),
      children: [
        { index: true, element: <Floor1 /> },
        { path: "f2", element: <Floor2 /> },
        { path: "order", element: <StaffOrders /> },
        { 
          path: "checkout", 
          children: [
            { index: true, element: <StaffCheckOut /> },
            { path: "pay", element: <StaffPay /> } 
          ]
        },
      ],
    },

  ],
};

export default staffRouter;