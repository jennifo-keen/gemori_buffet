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
  const userName = user.full_name || user.fullName || user.name || "Người dùng";

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: "100%", md: 256 },
        minWidth: 0,
        flexShrink: 0,
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: { xs: "10px", sm: "12px" },
          border: "1px solid rgba(177, 65, 53, 0.1)",
          p: { xs: 2, sm: 3 },
          boxSizing: "border-box",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          mb={2}
          sx={{ minWidth: 0 }}
        >
          <Avatar
            alt={userName}
            sx={{
              width: { xs: 40, sm: 44 },
              height: { xs: 40, sm: 44 },
              flexShrink: 0,
            }}
          />

          <Stack spacing={0} sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: "rgba(15, 23, 42, 1)",
                fontSize: "11px",
                fontWeight: 500,
                lineHeight: "17px",
              }}
            >
              Xin chào
            </Typography>

            <Typography
              sx={{
                color: "rgba(15, 23, 42, 1)",
                fontSize: { xs: "15px", sm: "16px" },
                fontWeight: 700,
                lineHeight: "24px",
                wordBreak: "break-word",
              }}
            >
              {userName}
            </Typography>
          </Stack>
        </Stack>

        <List
          disablePadding
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
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
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: "8px",
                  bgcolor: isActive ? "#b4463c" : "background.paper",
                  cursor: "pointer",
                  gap: 1.5,
                  transition: "0.2s",
                  minHeight: { xs: 48, sm: 50 },
                  "&:hover": {
                    bgcolor: isActive ? "#b4463c" : "rgba(177, 65, 53, 0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "unset",
                    flexShrink: 0,
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
                      fontSize: { xs: "13px", sm: "14px" },
                      fontWeight: 500,
                      lineHeight: "22px",
                      letterSpacing: "0px",
                      color: isActive ? "#ffffff" : "rgba(71, 85, 105, 1)",
                      whiteSpace: { xs: "normal", sm: "nowrap" },
                      wordBreak: "break-word",
                    },
                  }}
                  sx={{ m: 0, minWidth: 0 }}
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