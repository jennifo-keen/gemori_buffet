import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserRouter from "../router/UserRouter.jsx";
import staffRouter from "./StaffRouter.jsx";
import AdminRouter from "./AdminRouter.jsx"
import orderRouter from "./OrderRouter.jsx"

const router = createBrowserRouter([
  ...UserRouter,
  staffRouter,
  AdminRouter,
  ...orderRouter,
]);

export default router;