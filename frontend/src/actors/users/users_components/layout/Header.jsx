import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";
import Logo from "../../../../assets/img/Logo 1.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "promotion", label: "Khuyến mãi", path: "/promotion" },
    { key: "menu", label: "Thực đơn", path: "/menu" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: "72px",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        onClick={() => navigate("/")}
        sx={{
          width: 130,
          height: "49px",
          cursor: "pointer",
          filter:
            "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
        }}
      />

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          gap: "40px",
        }}
      >
        {menu.map((item) => (
          <Typography
            key={item.key}
            onClick={() => navigate(item.path)}
            sx={{
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              color:
                location.pathname === item.path
                  ? "#B6463A"
                  : "#2c2c2c",
              transition: "0.2s",
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>

      {/* User profile */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Avatar
          src="https://i.pravatar.cc/40"
          sx={{ width: 40, height: 40 }}
        />

        <Box>
          <Typography fontSize={14} fontWeight={600}>
            Hữu Kiên
          </Typography>

          <Typography
            fontSize={12}
            sx={{
              color: "#B6463A",
              cursor: "pointer",
            }}
          >
            Xem hồ sơ.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}