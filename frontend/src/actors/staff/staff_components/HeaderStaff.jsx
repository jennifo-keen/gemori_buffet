import React from "react";
import Logo1 from "../../../assets/Logo 1.png?reach";
import NotificationsOutlinedIcon from "../../../assets/BellRinging.svg?reach";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  SvgIcon,
} from "@mui/material";

export default function Header() {
  const userData = {
    name: "Phạm Hữu Kiên",
    role: "Admin staff",
    avatar: "/avatar.png",
  };

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
            width:130,
            height: "49px",
            Color: "#B4463C",
            filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)" }}
        />

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <IconButton
            sx={{
              bgcolor: "grey.100",
              borderRadius: 2,
              p: 1.25,
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          >
            <Box
            component="img"
            src ={NotificationsOutlinedIcon} 
            sx={{ fontSize: 24 }} />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 48, width: 2, bgcolor: "grey.300" }}
          />

          <Stack alignItems="flex-end" spacing={0}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "black",
                lineHeight: 1.5,
              }}
            >
              {userData.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: "grey.500",
                lineHeight: 1.5,
              }}
            >
              {userData.role}
            </Typography>
          </Stack>

          <Avatar
            src={userData.avatar}
            alt={userData.name}
            sx={{
              width: 44,
              height: 44,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}