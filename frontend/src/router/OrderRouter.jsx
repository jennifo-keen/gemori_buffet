import React from "react";
import { OrderProvider } from "../actors/order/order_context/OrderContext";
import Layout from "../actors/order/order_page/Order_Layout"
import Home from "../actors/order/order_page/Order_Home";
import Menu from "../actors/order/order_page/Order_Menu"
import Login from "../actors/order/order_page/Order_Login"
import Cart from "../actors/order/order_page/Order_Cart"
import Profile from "../actors/order/order_page/Order_Profile"
import ProfileBuffer from "../actors/order/order_page/Order_ProfileBuffer"
import Setting from "../actors/order/order_page/Order_Setting"


const OrderRouter = [
 {
  path: "/order/:tableCode",
  element: <OrderProvider />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    { 
      path: "menu", 
      element: <Menu /> 
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "profilebuffer",
      element: <ProfileBuffer />,
    },
    {
      path: "set",
      element: <Setting />,
    },
  ],
},
];

export default OrderRouter;