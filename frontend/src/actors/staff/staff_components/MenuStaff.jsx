import React from "react";
import { useNavigate } from 'react-router-dom';

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon    from "@mui/icons-material/Logout";
import PaymentIcon   from "@mui/icons-material/Payment";
import { Box, Stack, Typography } from "@mui/material";

import MenuOption from "./MenuOption.jsx";

import useAuthStaff from '../staff_hook/useAuthStaff';
import useDialog    from '../staff_hook/useDialog';

export default function MenuStaff() {
  const navigate = useNavigate();
  const { logoutStaff, tables } = useAuthStaff();
  const { showError } = useDialog();

  const handleLogout = () => {
    logoutStaff();
    navigate('/staff/login');
  };

 const handlePaymentClick = () => {
    // Tìm bàn ordering đầu tiên
    const firstOrdering = tables
      .filter(t => t.status === 'ordering')
      .sort((a, b) => {
        const numA = parseInt(a.table_code.replace(/\D/g, ''));
        const numB = parseInt(b.table_code.replace(/\D/g, ''));
        return numA - numB;
      })[0];

    if (!firstOrdering) {
      showError({
        title: 'Không có bàn nào đang phục vụ',
        subtitle: 'Hiện tại chưa có bàn nào có khách để thanh toán',
        confirmText: 'Đã hiểu',
      });
      return;
    }

    navigate(`/staff/checkout?tableId=${firstOrdering.id}&tableCode=${firstOrdering.table_code}`);
  };

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
        menuItems={[
          {
            id: "table-map",
            label: "Sơ đồ bàn",
            icon: DashboardIcon,
            path: "/staff",
            matchPaths: ['/staff', '/staff/f2', '/staff/order'],
          },
          {
            id: "payment",
            label: "Thanh toán",
            icon: PaymentIcon,
            path: "/staff/checkout",
            matchPaths: ['/staff/checkout'],
            onClick: handlePaymentClick,
          },
        ]}
      />

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={handleLogout}
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