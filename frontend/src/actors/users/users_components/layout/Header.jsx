import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
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

  const [isLogin, setIsLogin] = useState(false);

  // check login khi load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLogin(false); // 👉 chỉ update UI, không navigate
  };

  return (
    <ThemeProvider>
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
              filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
              width: 130,
              height: "49.01px",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />

          {/* Menu */}
          <Stack direction="row" spacing={7.5} alignItems="center">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.key}
                  disableRipple
                  onClick={() => navigate(item.path)}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
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

          {/* Right Section */}
          {isLogin ? (
            // 👉 ĐÃ LOGIN
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ width: 40, height: 40 }} />

                <Stack>
                  <Typography fontSize={14} fontWeight={700}>
                    Hữu Kiên
                  </Typography>

                  <Typography
                    onClick={() => navigate("/profile")}
                    sx={{
                      fontSize: "12px",
                      color: "#fe7465",
                      cursor: "pointer",
                    }}
                  >
                    Xem hồ sơ
                  </Typography>
                </Stack>
              </Stack>

              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Stack>
          ) : (
            // 👉 CHƯA LOGIN → NÚT ĐĂNG NHẬP
            <Button
              onClick={() => navigate("/login")}
              startIcon={<PersonIcon />}
              sx={{
                backgroundColor: "#B6463A",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#9f3c32",
                },
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;