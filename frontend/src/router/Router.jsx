import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../actors/users/users_pages/user_home/App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <div>Đây là trang About</div>,
  },
]);

export default router;