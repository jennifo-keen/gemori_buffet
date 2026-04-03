import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin_components/sidebar";
import AdminHeader from "./admin_components/header";

const AdminLayout = () => {
    // Định nghĩa màu trắng 98% (Off-white)
    const white98 = "#FAFAFA";

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: white98 // Đổi nền tổng thể thành trắng 98%
            }}
        >
            {/* Sidebar cố định bên trái */}
            <AdminSidebar />

            {/* Phần bên phải bao gồm Header và Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    // Đảm bảo phần này không bị tràn chiều rộng
                    width: { sm: `calc(100% - 288px)` },
                }}
            >
                {/* Header đã có nền white98 bên trong file AdminHeader */}
                <AdminHeader />

                {/* Nội dung chính (Trang con) */}
                <Box
                    component="main"
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        overflow: "auto",
                        bgcolor: white98, // Đồng bộ nền nội dung với layout
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;