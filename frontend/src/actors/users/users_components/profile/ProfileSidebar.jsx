import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HistoryIcon from "@mui/icons-material/History";
import PasswordIcon from "@mui/icons-material/Password";


// COMPONENT ITEM
function ProfileMenuItem({ icon, label, active, onClick }) {
  return (
    <Box
    onClick={onClick}
    sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "208px",
        p: "12px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: active ? "#B6463A" : "transparent",
        color: active ? "white" : "#5f6b7a",

        "& svg": {
        fontSize: 18
        }
    }}
    >
      {icon}
      <Typography
        sx={{
          display: "flex",
          height: "20px",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 500
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}


// SIDEBAR COMPONENT
export default function ProfileSidebar() {
  const [active, setActive] = useState("profile");

  const menu = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <PersonIcon />
    },
    {
      key: "voucher",
      label: "Mã giảm giá",
      icon: <LocalOfferIcon />
    },
    {
      key: "history",
      label: "Lịch sử gọi món",
      icon: <HistoryIcon sx={{ fontSize: 18}}  />
    },
    {
      key: "password",
      label: "Đổi mật khẩu",
      icon: <PasswordIcon />
    }
  ];

  return (
    <Box sx={{ width: "250px" }}>
      {menu.map((item) => (
        <ProfileMenuItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          active={active === item.key}
          onClick={() => setActive(item.key)}
        />
      ))}
    </Box>
  );
}