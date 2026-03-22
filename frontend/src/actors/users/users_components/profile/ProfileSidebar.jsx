import React from "react";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
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
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    id: "profile",
    label: "Thông tin cá nhân",
    path: "/profile",
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: "discount",
    label: "Mã giảm giá",
    path: "/discount",
    icon: <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: "history",
    label: "Lịch sử ăn uống",
    path: "/history",
    icon: <HistoryOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: "password",
    label: "Đổi mật khẩu",
    path: "/password",
    icon: <LockOutlinedIcon sx={{ fontSize: 18 }} />,
  },
];

export const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.full_name || user.name || "Người dùng";

  return (
    <Box
      component="aside"
      sx={{
        width: 256,
        flexShrink: 0,
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          width: 256,
          bgcolor: "background.paper",
          borderRadius: "12px",
          border: "1px solid rgba(177, 65, 53, 0.1)",
          p: 3,
          boxSizing: "border-box",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Avatar alt={userName} sx={{ width: 44, height: 44 }} />
          <Stack spacing={0}>
            <Typography
              variant="captionCaption2Medium"
              sx={{
                color: "rgba(15, 23, 42, 1)",
                fontSize: "9px",
                fontWeight: 500,
                lineHeight: "17px",
              }}
            >
              Xin chào
            </Typography>
            <Typography
              variant="labelLabel1Bold"
              sx={{
                color: "rgba(15, 23, 42, 1)",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              {userName}
            </Typography>
          </Stack>
        </Stack>

        <List
          disablePadding
          sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          {menuItems.map((item) => {
            const isActive =
              item.path === "/history"
                ? location.pathname.startsWith("/history")
                : location.pathname === item.path;

            return (
              <ListItem
                key={item.id}
                onClick={() => navigate(item.path)}
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: "8px",
                  bgcolor: isActive ? "#b4463c" : "background.paper",
                  cursor: "pointer",
                  gap: 1.5,
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: isActive
                      ? "#b4463c"
                      : "rgba(177, 65, 53, 0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "unset",
                    color: isActive ? "#ffffff" : "rgba(71, 85, 105, 1)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "22px",
                      letterSpacing: "0px",
                      color: isActive ? "#ffffff" : "rgba(71, 85, 105, 1)",
                      whiteSpace: "nowrap",
                    },
                  }}
                  sx={{ m: 0 }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;