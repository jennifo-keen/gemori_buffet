import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserRouter from "../router/UserRouter.jsx";
import StaffRouter from "./StaffRouter.jsx";
import AdminRouter from "./AdminRouter.jsx"
import OrderRouter from "./OrderRouter.jsx"
import KitchenRouter from "./KitchenRouter.jsx";

const router = createBrowserRouter([
  ...UserRouter,
  StaffRouter,
  AdminRouter,
  ...OrderRouter,
  ...KitchenRouter
]);

export default router;