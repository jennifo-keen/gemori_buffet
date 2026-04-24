import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";

// Import icons
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
import logo from "../../../assets/img/Logo 1.png";

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
            { id: "voucher", path: "/admin/quan-ly-voucher", label: "Voucher & Khuyến mãi", icon: <LocalOfferOutlinedIcon /> },
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

    // Các biến màu đồng bộ theo phong cách Manwah
    const baseColor = "#B14135";
    const bgLight = "rgba(177, 65, 53, 0.05)";
    const bgActive = "rgba(177, 65, 53, 0.1)";
    const scrollbarThumb = "rgba(177, 65, 53, 0.2)";

    // Khởi tạo userData: Ưu tiên lấy fullName, nếu không có mới lấy name hoặc username
    const [userData] = useState(() => {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return {
                    // Check mọi trường có thể chứa tên thật
                    fullName: user.fullName || user.name || user.username || "Quản trị viên",
                    role: user.role === 'admin' ? "Quản trị viên" : "Nhân viên",
                    avatar: user.avatar || ""
                };
            } catch (error) {
                console.error("Lỗi parse user data:", error);
            }
        }
        return { fullName: "Admin", role: "Hệ thống", avatar: "" };
    });

    const getActiveId = () => {
        for (const section of navSections) {
            const activeItem = section.items.find(item => location.pathname === item.path);
            if (activeItem) return activeItem.id;
        }
        return "tong-quan";
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/admin/login", { replace: true });
    };

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                flexDirection: "column",
                width: 288,
                height: "100vh",
                position: "sticky",
                top: 0,
                bgcolor: bgLight,
                borderRight: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.08)",
            }}
        >
            {/* Logo section */}
            <Box
                sx={{
                    px: 3, py: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: 'pointer'
                }}
                onClick={() => navigate("/admin")}
            >
                <Box component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        maxWidth: 160,
                        height: "auto",
                        objectFit: "contain"
                    }}
                />
            </Box>

            {/* Navigation sections */}
            <Box
                sx={{
                    flex: 1, px: 2, py: 2,
                    overflowY: "auto",
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: scrollbarThumb,
                        borderRadius: '10px',
                    },
                    scrollbarWidth: 'thin',
                }}
            >
                {navSections.map((section) => (
                    <Box key={section.sectionLabel} sx={{ pb: 2 }}>
                        <Typography
                            sx={{
                                px: 1.5, pb: 1,
                                fontSize: "11px",
                                fontWeight: 700,
                                color: baseColor,
                                textTransform: "uppercase",
                                opacity: 0.7,
                                letterSpacing: '0.5px'
                            }}
                        >
                            {section.sectionLabel}
                        </Typography>

                        <List disablePadding>
                            {section.items.map((item) => {
                                const isActive = getActiveId() === item.id;
                                return (
                                    <ListItem
                                        key={item.id}
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            px: 1.5, py: 1.2,
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            bgcolor: isActive ? bgActive : "transparent",
                                            color: isActive ? baseColor : "#334155",
                                            mb: 0.5,
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                bgcolor: isActive ? bgActive : "rgba(177, 65, 53, 0.08)",
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                sx: {
                                                    fontSize: "14px",
                                                    fontWeight: isActive ? 700 : 500,
                                                    fontFamily: '"Be Vietnam Pro", sans-serif',
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
            <Box sx={{ borderTop: "1px solid", borderColor: "rgba(0, 0, 0, 0.05)", p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1, py: 1 }}>
                    <Avatar
                        src={userData.avatar}
                        sx={{
                            width: 38, height: 38,
                            bgcolor: baseColor,
                            fontWeight: 700,
                            fontSize: '14px'
                        }}
                    >
                        {userData.fullName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            noWrap
                            sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                textTransform: 'capitalize' // Tự động viết hoa chữ cái đầu cho đẹp
                            }}
                        >
                            {userData.fullName}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                            {userData.role}
                        </Typography>
                    </Box>
                    <IconButton
                        size="small"
                        onClick={handleLogout}
                        sx={{ "&:hover": { color: baseColor } }}
                    >
                        <LogoutOutlinedIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
};

export default AdminSidebar;