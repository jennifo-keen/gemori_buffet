import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../actors/admin/AdminLayout";
import AdminHome from "../actors/admin/admin_pages/AdminHome";
import ContentAdAi from "../actors/admin/admin_pages/ContentAdAi";
import BuffetTicketPage from "../actors/admin/admin_pages/BuffetTicketPage";
import MenuPage from "../actors/admin/admin_pages/MenuPage";
import TablePage from "../actors/admin/admin_pages/TablePage";
import OrderPage from "../actors/admin/admin_pages/OrderPage";
import ProtectedRoute from "../actors/admin/admin_context/login/ProtectedRoute";
import AdLogin from "../actors/admin/AdLogin";

const AdminRouter = {
    path: "/admin",
    children: [
        {
            path: "login",
            element: <AdLogin />,
        },
        {
            element: (
                <ProtectedRoute>
                    {/* Bạn có thể bọc thêm Provider của Admin ở đây nếu có */}
                    <AdminLayout />
                </ProtectedRoute>
            ),
            children: [
                { index: true, element: <AdminHome /> },
                { path: "ai-thong-ke", element: <ContentAdAi /> },
                { path: "quan-ly-menu", element: <MenuPage /> },
                { path: "quan-ly-ve", element: <BuffetTicketPage /> },
                { path: "quan-ly-ban", element: <TablePage /> },
                { path: "quan-ly-don-hang", element: <OrderPage /> },
            ],
        },
    ],
};
export default AdminRouter;
