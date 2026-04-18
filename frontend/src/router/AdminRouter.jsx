import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../actors/admin/AdminLayout"; // Đường dẫn tới file layout trên
import AdminHome from "../actors/admin/admin_pages/AdminHome";
import ContentAdAi from "../actors/admin/admin_pages/ContentAdAi";
import BuffetTicketPage from "../actors/admin/admin_pages/BuffetTicketPage";
import MenuPage from "../actors/admin/admin_pages/MenuPage";

const AdminRouter =
{
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true, // Đây là trang mặc định khi vào /admin
            element: <AdminHome />,
        },
        {
            path: "ai-thong-ke",
            element: <ContentAdAi />,
        },
        {
            path: "quan-ly-menu",
            element: <MenuPage />,
        },
        {
            path: "quan-ly-ve", // Path này phải khớp với 'id' ông đặt trong Sidebar
            element: <BuffetTicketPage />,
        },
    ],
}

export default AdminRouter;