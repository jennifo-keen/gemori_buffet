
import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";
import { Box, Stack, Typography } from "@mui/material";
import MenuOption from "./MenuOption.jsx";

export default function MenuStaff({ onLogout }) {
  const [, setActiveItem] = useState("table-map");

  return (
    <Box
      sx={{
        width: 260,
        height: "100%",
        bgcolor: "white",
        boxShadow: "95px 0 27px 0 rgba(0, 0, 0, 0.1)",
        p: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <MenuOption
        defaultActiveId="table-map"
        onSelect={(item) => setActiveItem(item.id)}
        menuItems={[
          { id: "table-map", label: "Sơ đồ bàn", icon: DashboardIcon },
          { id: "payment",   label: "Thanh toán", icon: PaymentIcon },
        ]}
      />

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={onLogout}
        sx={{ cursor: "pointer" }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#b4463c",
            borderRadius: 1,
          }}
        >
          <LogoutIcon sx={{ width: 24, height: 24, color: "white" }} />
        </Box>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#b4463c" }}>
          Đăng xuất
        </Typography>
      </Stack>
    </Box>
  );
}