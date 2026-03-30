import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../actors/admin/AdminLayout"; // Đường dẫn tới file layout trên
import AdminHome from "../actors/admin/admin_pages/AdminHome";
import ContentAdAi from "../actors/admin/admin_pages/ContentAdAi";

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
            element: <div>Trang Quản lý Menu</div>,
        },
        // Thêm các route khác tương ứng với ID trong Sidebar của bạn
    ],
}

export default AdminRouter;