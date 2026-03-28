import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import logo from "../../../assets/img/Logo 1.png"


export const Order_Navbar = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ bgcolor: "white" }}
    >
      <Toolbar sx={{ minHeight: 48, px: 1, justifyContent: "space-between" }}>
        {/* Left: Back and Close icons */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small" aria-label="go back">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Center: Gemori Logo text */}
        <Box 
        src={logo}
        component="img"
            sx={{ 
                width: 106,
                display: "flex", 
                alignItems: "center", 
                gap: 0.5 
                }}
        >
        </Box>

        {/* Right: More options icon */}
        <IconButton size="small" aria-label="more options">
          <MoreHorizIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Order_Navbar;