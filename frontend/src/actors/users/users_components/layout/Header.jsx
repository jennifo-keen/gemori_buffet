import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    setIsLogin(!!token);

    if (userData) {
      try {
        const user = JSON.parse(userData);

        const name =
          user?.full_name ||
          user?.name ||
          user?.username ||
          user?.customer_name ||
          "Người dùng";

        setUserName(name);
      } catch (error) {
        console.error("Lỗi đọc user từ localStorage:", error);
        setUserName("Người dùng");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    setUserName("");
    setMobileOpen(false);
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const renderDesktopMenu = () => (
    <Stack
      direction="row"
      spacing={{ md: 2, lg: 4, xl: 6 }}
      alignItems="center"
      sx={{ flexShrink: 1 }}
    >
      {menu.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.key}
            disableRipple
            onClick={() => navigate(item.path)}
            sx={{
              fontSize: { md: "14px", lg: "16px" },
              fontWeight: 700,
              color: isActive ? "#B6463A" : "#0f172a",
              whiteSpace: "nowrap",
              minWidth: "auto",
              px: 1,
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
  );

  const renderDesktopAuth = () => {
    if (isLogin) {
      return (
        <Stack direction="row" alignItems="center" spacing={{ md: 1, lg: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Avatar sx={{ width: 40, height: 40 }} />

            <Stack sx={{ minWidth: 0 }}>
              <Typography
                fontSize={15}
                fontWeight={700}
                sx={{
                  color: "#000000",
                  maxWidth: { md: 120, lg: 160 },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userName}
              </Typography>

              <Typography
                onClick={() => navigate("/profile")}
                sx={{
                  fontSize: "12px",
                  color: "#fe7465",
                  cursor: "pointer",
                  lineHeight: 1.2,
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
      );
    }

    return (
      <Button
        onClick={() => navigate("/login")}
        startIcon={<PersonIcon />}
        sx={{
          backgroundColor: "#B6463A",
          color: "#fff",
          px: { md: 2, lg: 3 },
          py: 1,
          borderRadius: "999px",
          textTransform: "none",
          fontWeight: 600,
          whiteSpace: "nowrap",
          "&:hover": {
            backgroundColor: "#9f3c32",
          },
        }}
      >
        Đăng nhập
      </Button>
    );
  };

  const drawerContent = (
    <Box sx={{ width: 280 }}>
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 100,
            height: 40,
            objectFit: "contain",
            filter:
              "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
            cursor: "pointer",
          }}
          onClick={() => handleNavigate("/")}
        />
      </Box>

      <Divider />

      <List sx={{ py: 1 }}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.key}
              onClick={() => handleNavigate(item.path)}
              sx={{
                color: isActive ? "#B6463A" : "#0f172a",
                backgroundColor: isActive ? "rgba(182, 70, 58, 0.08)" : "transparent",
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 600,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        {isLogin ? (
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ width: 40, height: 40 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#000",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userName}
                </Typography>
                <Typography
                  onClick={() => handleNavigate("/profile")}
                  sx={{
                    fontSize: 12,
                    color: "#fe7465",
                    cursor: "pointer",
                    mt: 0.3,
                  }}
                >
                  Xem hồ sơ
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                justifyContent: "flex-start",
                color: "#B6463A",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Đăng xuất
            </Button>
          </Stack>
        ) : (
          <Button
            fullWidth
            onClick={() => handleNavigate("/login")}
            startIcon={<PersonIcon />}
            sx={{
              backgroundColor: "#B6463A",
              color: "#fff",
              py: 1.2,
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
      </Box>
    </Box>
  );

  return (
    <ThemeProvider>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "rgba(177, 65, 53, 0.1)",
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
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
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
            sx={{
              filter:
                "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
              width: { xs: 95, sm: 110, md: 120, lg: 130 },
              height: { xs: 38, sm: 42, md: 46, lg: "49.01px" },
              objectFit: "contain",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />

          {isMobile ? (
            <>
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <>
              {renderDesktopMenu()}
              {renderDesktopAuth()}
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;