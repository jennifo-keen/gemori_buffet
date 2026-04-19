import React, { useEffect, useState } from "react";
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
    const [activeItem, setActiveItem] = useState("tong-quan");

    // Các biến màu để đồng bộ toàn bộ sidebar
    const baseColor = "#B14135";
    const bgLight = "rgba(177, 65, 53, 0.05)"; // Nền sidebar 5%
    const bgActive = "rgba(177, 65, 53, 0.1)"; // Item đang chọn 10%
    const scrollbarThumb = "rgba(177, 65, 53, 0.2)"; // Thanh trượt đậm hơn chút để dễ thấy

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
        navigate(path);
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
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid",
                    borderColor: "rgba(0, 0, 0, 0.05)",
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
                        filter: "invert(24%) sepia(51%) saturate(1478%) hue-rotate(346deg) brightness(88%) contrast(91%)",
                        maxWidth: 200,
                        maxHeight: 100,
                        width: "40%",
                        height: "auto",
                        objectFit: "contain"
                    }}
                />
            </Box>

            {/* Navigation sections với Custom Scrollbar */}
            <Box
                sx={{
                    flex: 1,
                    px: 2,
                    py: 2,
                    overflowY: "auto",
                    // Tùy chỉnh Scrollbar cho Chrome, Edge, Safari
                    '&::-webkit-scrollbar': {
                        width: '6px', // Độ rộng thanh cuộn
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent', // Để lộ nền sidebar phía dưới
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: scrollbarThumb,
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: 'rgba(108, 13, 10, 0.4)', // Đây là màu #6C0D0A với alpha 0.4
                        }
                    },
                    // Tùy chỉnh cho Firefox
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${scrollbarThumb} transparent`,
                }}
            >
                {navSections.map((section) => (
                    <Box key={section.sectionLabel} sx={{ pb: 2 }}>
                        <Box sx={{ px: 1.5, pb: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: '"Be Vietnam Pro", sans-serif',
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: baseColor,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    opacity: 0.8
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
                                            bgcolor: isActive ? bgActive : "transparent",
                                            color: isActive ? baseColor : "#334155",
                                            "&:hover": {
                                                bgcolor: isActive ? bgActive : "rgba(177, 65, 53, 0.08)",
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
            <Box sx={{ borderTop: "1px solid", borderColor: "rgba(0, 0, 0, 0.05)", p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1.5, py: 1 }}>
                    <Avatar
                        src="/admin.png"
                        sx={{ width: 40, height: 40, bgcolor: "rgba(177, 65, 53, 0.2)" }}
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
                        onClick={() => navigate("/login")}
                        sx={{
                            cursor: "pointer",
                            transition: "color 0.2s",
                            "&:hover": { color: baseColor },
                        }}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default AdminSidebar;