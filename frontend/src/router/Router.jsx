import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserRouter from "../router/UserRouter.jsx";
import staffRouter from "./StaffRouter.jsx";

const router = createBrowserRouter([
  ...UserRouter,
  staffRouter,
]);

export default router;