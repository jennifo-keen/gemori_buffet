import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin_components/sidebar"; // Đường dẫn tới file sidebar của bạn

const AdminLayout = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
            {/* Sidebar cố định */}
            <AdminSidebar />

            {/* Nội dung thay đổi theo Route nằm ở đây */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 288px)` }, // Trừ đi chiều rộng sidebar
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;