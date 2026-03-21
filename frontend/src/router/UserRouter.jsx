import React from "react";
import HomeLayout from "../actors/users/users_components/layout/HomeLayout.jsx"
import Home from "../actors/users/users_pages/user_home.jsx";
import Menu from "../actors/users/users_pages/user_menu.jsx";
import Promotion from "../actors/users/users_pages/user_promote.jsx";
import ProfilePage from "../actors/users/users_pages/users_profile.jsx";
import History from "../actors/users/users_pages/user_history/user_history.jsx"
import { MainSection } from "../actors/users/users_components/History/MainSection.jsx";
import HistoryDetail from "../actors/users/users_pages/user_history/detail_history.jsx"
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
      path: "promotion",
      element: <Promotion />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "history",
      element: <History />,
      children: [
        {
          index: true,
          element: <MainSection />,
        },
        {
          path: "detail",
          element: <HistoryDetail />,
        },
      ],
    },
    
  ],
};

export default userRouter;