import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm 2 hook này
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";

// Import icons... (giữ nguyên dàn icon cũ của bạn)
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";

const navSections = [
    {
        sectionLabel: "CHUNG",
        items: [
            { id: "tong-quan", path: "/admin", label: "Tổng quan", icon: <CampaignOutlinedIcon /> },
        ],
    },
    {
        sectionLabel: "VẬN HÀNH",
        items: [
            { id: "quan-ly-ve", path: "/admin/quan-ly-ve", label: "Quản lý vé Buffet", icon: <ConfirmationNumberOutlinedIcon /> },
            { id: "quan-ly-menu", path: "/admin/quan-ly-menu", label: "Quản lý Menu", icon: <RestaurantMenuOutlinedIcon /> },
            { id: "quan-ly-ban", path: "/admin/quan-ly-ban", label: "Quản lý bàn", icon: <TableRestaurantOutlinedIcon /> },
            { id: "quan-ly-don-hang", path: "/admin/quan-ly-don-hang", label: "Quản lý đơn hàng", icon: <ShoppingCartOutlinedIcon /> },
        ],
    },
    {
        sectionLabel: "MARKETING & KHO",
        items: [
            { id: "voucher", path: "/admin/voucher", label: "Voucher & Khuyến mãi", icon: <LocalOfferOutlinedIcon /> },
            { id: "quan-ly-kho", path: "/admin/quan-ly-kho", label: "Quản lý Kho", icon: <WarehouseOutlinedIcon /> },
        ],
    },
    {
        sectionLabel: "HỆ THỐNG",
        items: [
            { id: "nguoi-dung", path: "/admin/nguoi-dung", label: "Người dùng", icon: <PeopleAltOutlinedIcon /> },
            { id: "ai-thong-ke", path: "/admin/ai-thong-ke", label: "Ai & Thống kê", icon: <BarChartOutlinedIcon /> },
            { id: "dieu-hanh", path: "/admin/dieu-hanh", label: "Điều hành hệ thống", icon: <SettingsOutlinedIcon /> },
        ],
    },
];

export const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("tong-quan");

    // Tự động cập nhật nút active khi URL thay đổi (VD: bấm nút back trên trình duyệt)
    useEffect(() => {
        const currentPath = location.pathname;
        navSections.forEach(section => {
            section.items.forEach(item => {
                if (item.path === currentPath) {
                    setActiveItem(item.id);
                }
            });
        });
    }, [location.pathname]);

    const handleItemClick = (id, path) => {
        setActiveItem(id);
        navigate(path); // Chuyển hướng trang
    };

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                flexDirection: "column",
                width: 288,
                height: "100vh",
                position: "sticky", // Giữ sidebar cố định khi cuộn trang nội dung
                top: 0,
                bgcolor: "background.paper",
                borderRight: "1px solid",
                borderColor: "divider",
            }}
        >
            {/* Logo section */}
            <Box
                sx={{ px: 3, py: 3, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", cursor: 'pointer' }}
                onClick={() => navigate("/admin")}
            >
                <Box
                    component="img"
                    src="https://via.placeholder.com/130x49?text=Gemori"
                    alt="Logo"
                    sx={{ width: 130, height: 49, objectFit: "contain" }}
                />
            </Box>

            {/* Navigation sections */}
            <Box sx={{ flex: 1, px: 2, py: 2, overflowY: "auto" }}>
                {navSections.map((section) => (
                    <Box key={section.sectionLabel} sx={{ pb: 2 }}>
                        <Box sx={{ px: 1.5, pb: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: '"Be Vietnam Pro", sans-serif',
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: "#bc4d42",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {section.sectionLabel}
                            </Typography>
                        </Box>

                        <List disablePadding>
                            {section.items.map((item) => {
                                const isActive = activeItem === item.id;
                                return (
                                    <ListItem
                                        key={item.id}
                                        onClick={() => handleItemClick(item.id, item.path)}
                                        sx={{
                                            px: 1.5,
                                            py: 1.25,
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            bgcolor: isActive ? "rgba(138, 0, 0, 0.08)" : "transparent",
                                            color: isActive ? "#a21a16" : "#334155",
                                            "&:hover": {
                                                bgcolor: isActive ? "rgba(138, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.04)",
                                            },
                                            mb: 0.25,
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 36,
                                                color: "inherit",
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                sx: {
                                                    fontFamily: '"Be Vietnam Pro", sans-serif',
                                                    fontSize: "15px",
                                                    fontWeight: isActive ? 700 : 500,
                                                },
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            {/* User profile section */}
            <Box sx={{ borderTop: "1px solid", borderColor: "divider", p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1.5, py: 1 }}>
                    <Avatar
                        src="/admin.png"
                        sx={{ width: 40, height: 40, bgcolor: "rgba(138, 0, 0, 0.2)" }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography noWrap sx={{ fontSize: "14px", fontWeight: 700 }}>
                            Trần Hoàng Nam
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                            Quản trị viên
                        </Typography>
                    </Box>
                    <LogoutOutlinedIcon
                        onClick={() => navigate("/login")} // Ví dụ chuyển về login
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: "#8a0000" },
                        }}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default AdminSidebar;