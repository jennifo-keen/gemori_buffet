import React from "react";
import AdminLayout from "../actors/admin/AdminLayout"; // Đường dẫn tới file layout trên
import AdminHome from "../actors/admin/admin_pages/AdminHome"; // Trang Dashboard/Tổng quan

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
            path: "quan-ly-ve",
            element: <div>Trang Quản lý vé Buffet</div>, // Thay bằng component thật sau
        },
        {
            path: "quan-ly-menu",
            element: <div>Trang Quản lý Menu</div>,
        },
        // Thêm các route khác tương ứng với ID trong Sidebar của bạn
    ],
}

export default AdminRouter;