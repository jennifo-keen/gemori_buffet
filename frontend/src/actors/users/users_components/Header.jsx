import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Logo from "../../../assets/img/Logo 1.png"
export default function Header() {
  const [active, setActive] = useState("home");

  const menu = [
    { key: "home", label: "Trang chủ" },
    { key: "promotion", label: "Khuyến mãi" },
    { key: "menu", label: "Thực đơn" }
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
        backgroundColor: "#fff"
      }}
    >
      {/* Logo */}
      <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{ 
                  width:130,
                  height: "49px",
                  Color: "#B4463C",
                  filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)" }}
              />

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          gap: "40px"
        }}
      >
        {menu.map((item) => (
          <Typography
            key={item.key}
            onClick={() => setActive(item.key)}
            sx={{
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              color: active === item.key ? "#B6463A" : "#2c2c2c",
              transition: "0.2s",
              fontWeight: 700
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
          gap: "12px"
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
            sx={{ color: "#B6463A", cursor: "pointer" }}
          >
            Xem hồ sơ.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}