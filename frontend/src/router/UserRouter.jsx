import React from "react";
import HomeLayout from "../actors/users/users_components/layout/HomeLayout.jsx"
import Home from "../actors/users/users_pages/user_home/user_home.jsx";
import Menu from "../actors/users/users_pages/user_menu/user_menu.jsx";
import Promotion from "../actors/users/users_pages/user_promote/user_promote.jsx";
import ProfilePage from "../actors/users/users_pages/users_profile/users_profile.jsx";

const userRouter = {
  path: "/",
  element: <HomeLayout/>,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "menu",
      element: <Menu/>,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "promotion",
      element: <Promotion />,
    },
  ],
};

export default userRouter;