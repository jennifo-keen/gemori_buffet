import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin_components/sidebar";
// 1. Nhớ import Header của ông vào đây nè
import AdminHeader from "./admin_components/header"; // Kiểm tra lại đường dẫn cho đúng nha

const AdminLayout = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
            {/* Sidebar cố định bên trái */}
            <AdminSidebar />

            {/* Phần bên phải bao gồm Header và Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column", // Để Header nằm trên, Content nằm dưới
                    width: { sm: `calc(100% - 288px)` }, // Trừ đi chiều rộng sidebar
                }}
            >
                {/* 2. Bỏ Header vào đây */}
                <AdminHeader />

                {/* 3. Nội dung chính (Trang con) */}
                <Box
                    component="main"
                    sx={{
                        p: 3, // Padding cho nội dung
                        flexGrow: 1,
                        overflow: "auto", // Để nếu nội dung dài thì scroll trong phần này thôi
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;