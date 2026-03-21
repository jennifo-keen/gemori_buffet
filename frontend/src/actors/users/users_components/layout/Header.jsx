import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/img/Logo 1.png";
import { ThemeProvider } from "./ThemeProvider";

const menu = [
  { key: "home", label: "Trang chủ", path: "/" },
  { key: "promotion", label: "Khuyến mãi", path: "/promotion" },
  { key: "menu", label: "Thực đơn", path: "/menu" },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
  <ThemeProvider >
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "rgba(177, 65, 53, 0.1)",
        px: "72px",
        py: 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          mx: "auto",
          justifyContent: "space-between",
          minHeight: "unset",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          sx={{
            width: 130,
            height: "49.01px",
            objectFit: "contain",
            flexShrink: 0,
            cursor: "pointer",
            filter:
              "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

        {/* Navigation Links */}
        <Stack direction="row" spacing={7.5} alignItems="center">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.key}
                disableRipple
                onClick={() => navigate(item.path)}
                sx={{
                  px: 1,
                  py: 0.5,
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0px",
                  lineHeight: "24px",
                  color: isActive ? "#B6463A" : "#0f172a",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#B6463A",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>

        {/* User Section */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ p: 1, borderRadius: "999px" }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* Avatar */}
            <Avatar
              src="/nh-i-di-n-ng-i-d-ng.png"
              alt="Hữu Kiên"
              sx={{ width: 40, height: 40 }}
            />

            {/* User Info */}
            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0px",
                  lineHeight: "16px",
                  color: "#0f172a",
                  whiteSpace: "nowrap",
                }}
              >
                Hữu Kiên
              </Typography>

              <Typography
                onClick={() => navigate("/profile")}
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0px",
                  lineHeight: "20px",
                  color: "#fe7465",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Xem hồ sơ.
              </Typography>
            </Stack>
          </Stack>

          {/* Logout Button */}
          <IconButton
            size="small"
            sx={{
              border: "1px solid rgba(177, 65, 53, 0.2)",
              borderRadius: "999px",
              p: 1,
              color: "#0f172a",
              "&:hover": {
                backgroundColor: "rgba(177, 65, 53, 0.05)",
              },
            }}
          >
            <LogoutIcon sx={{ width: 13, height: 13 }} />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  </ThemeProvider>
  );
};

export default Header;