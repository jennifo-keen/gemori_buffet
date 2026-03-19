import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../actors/users/users_pages/user_home/App.jsx';
import User from '../router/UserRouter.jsx'
import staffRouter from './StaffRouter.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <User/>,
  },
  {
    path: "/about",
    element: <div>Đây là trang About</div>,
  },
  staffRouter,
]);

export default router;