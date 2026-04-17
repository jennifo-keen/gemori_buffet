import React from "react";

import Logo1 from "../../../assets/img/Logo 1.png?reach";
import NofiIcon from "../../../assets/icon/BellRinging.svg?reach";

import useAuthStaff  from "../staff_hook/useAuthStaff";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const roleLabel = {
  admin: "Admin",
  staff: "Nhân viên",
  kitchen: "Đầu bếp",
};

export default function Header() {
  const { admin } = useAuthStaff();

  return (
    <Box
      component="header"
      sx={{
        bgcolor: "white",
        boxShadow: 1,
        px: "32px",
        py: "16px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          component="img"
          src={Logo1}
          alt="Logo"
          sx={{
            width: 130,
            height: "49px",
            filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
          }}
        />

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <IconButton
            sx={{
              bgcolor: "grey.100",
              borderRadius: 2,
              p: 1.25,
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            <Box component="img" src={NofiIcon} sx={{ fontSize: 24 }} />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ height: 48, width: 2, bgcolor: "grey.300" }} />

          <Stack alignItems="flex-end" spacing={0}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "black", lineHeight: 1.5 }}>
              {admin?.full_name || "---"}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 500, color: "grey.500", lineHeight: 1.5 }}>
              {roleLabel[admin?.role] || "---"}
            </Typography>
          </Stack>

          {/* Avatar lấy chữ cái đầu nếu không có ảnh */}
          <Avatar
            alt={admin?.full_name}
            sx={{ width: 44, height: 44, bgcolor: "#b4463c", fontWeight: 700 }}
          >
            {admin?.full_name?.charAt(0).toUpperCase()}
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
}