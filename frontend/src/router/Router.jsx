import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../actors/users/users_pages/user_home/user_home.jsx';
import UserRouter from '../router/UserRouter.jsx'
import staffRouter from './StaffRouter.jsx';
const router = createBrowserRouter([
  UserRouter,
  staffRouter,
]);

export default router;