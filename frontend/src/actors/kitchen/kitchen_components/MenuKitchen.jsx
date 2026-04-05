import React from "react";
import { useNavigate } from 'react-router-dom';
import CallBell from "../../../assets/icon/CallBell.svg?react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import ClockUser from "../../../assets/icon/ClockUser.svg?react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import useAuthStaff from '../../staff/staff_hook/useAuthStaff';

const BRAND_RED = "#b4463c";
const BRAND_RED_LIGHT = "rgba(177, 65, 53, 0.1)";
const BRAND_RED_BORDER = "rgba(177, 65, 53, 0.05)";

export const MenuKitchen = () => {
  const navigate = useNavigate();
  const { logoutStaff} = useAuthStaff();
  const [activeItem, setActiveItem] = useState("so-do-ban");

  const handleLogout = () => {
    logoutStaff();
    navigate('/kitchen/login');
  };

 const handleOrderNewClick = () => {
    navigate(`/kitchen/detail`);
  };

  const handleOrderAllClick = () => {
    navigate(`/kitchen/all`);
  };
const menuItems = [
  {
    id: "so-do-ban",
    label: "Sơ đồ bàn",
    icon: <GridViewRoundedIcon />,
    badge: 28,
    path: "/kitchen",
    matchPaths: ['/kitchen', '/kitchen/f2'],
  },
  {
    id: "don-goi-moi",
    label: "Đơn gọi mới",
    icon: <ClockUser />,
    badge: 14,
    path: "/kitchen/detail",
    matchPaths: ['/kitchen/detail'],
    onClick: handleOrderNewClick,
  },
  {
    id: "tat-ca-don",
    label: "Tất cả đơn",
    icon: <CallBell/>,
    badge: 12,
    path: "/kitchen/all",
    matchPaths: ['/kitchen/all'],
    onClick: handleOrderAllClick,
  },
];
  return (
    <Paper
      elevation={2}
      component="nav"
      sx={{
        width: 260,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        boxSizing: "border-box",
        borderRadius: 0,
      }}
    >
      {/* Navigation Menu */}
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <ListItem
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                if (item.onClick) {
                  item.onClick();
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                cursor: "pointer",
                backgroundColor: isActive ? BRAND_RED_LIGHT : "transparent",
                border: isActive
                  ? `1px solid ${BRAND_RED_BORDER}`
                  : "1px solid transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? BRAND_RED_LIGHT
                    : "rgba(0,0,0,0.04)",
                },
                gap: 1,
              }}
            >
              {/* Icon */}
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? BRAND_RED : "text.secondary",
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>

              {/* Label */}
              <ListItemText
                primary={item.label}
                sx={{ m: 0 }}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: isActive ? BRAND_RED : "text.secondary",
                  whiteSpace: "nowrap",
                }}
              />

              {/* Badge */}
              <Box
                sx={{
                  width: 32,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isActive ? BRAND_RED : BRAND_RED_LIGHT,
                  borderRadius: "16px",
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: "10px",
                    color: isActive ? "#fff" : BRAND_RED,
                    lineHeight: 1,
                  }}
                >
                  {item.badge}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Section */}
      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={0.5} 
        onClick={handleLogout}
        sx={{ cursor: "pointer" }}
      >
        {/* Logout icon button */}
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BRAND_RED_LIGHT,
            border: `1px solid ${BRAND_RED_BORDER}`,
            borderRadius: 2,
            cursor: "pointer",
            flexShrink: 0,
            "&:hover": {
              backgroundColor: "rgba(177, 65, 53, 0.18)",
            },
          }}
        >
          <LogoutIcon sx={{ color: BRAND_RED, fontSize: 24 }} />
        </Box>

        {/* Logout label */}
        <Box sx={{ px: 1.25, py: 1.25 }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: BRAND_RED,
              whiteSpace: "nowrap",
              // cursor: "pointer",
            }}
          >
            Đăng xuất
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default MenuKitchen;