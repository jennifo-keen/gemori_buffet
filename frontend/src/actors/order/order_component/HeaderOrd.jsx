import React from 'react';
import AvtIcon  from "../../../assets/icon/UserCircleDashed.svg?react";
import ChatIcon from "../../../assets/icon/Chats.svg?react";
import CookingPotIcon  from "../../../assets/icon/CookingPot.svg?react";
import ShoppingIcon from "../../../assets/icon/ShoppingCartSimple.svg?react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

export const Order_HeaderOrd = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "white", color: "text.primary", height: 54 }}
    >
      <Toolbar
        sx={{
          minHeight: "54px !important",
          height: 54,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left section: logo, divider, table button, feedback button */}
        <Box display="flex" alignItems="center" gap={1} px={1}>
          {/* Cooking pot icon */}
          <CookingPotIcon style={{ color: "#ca9600", width: 32, height: 32 }} />

          {/* Vertical divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 28, alignSelf: "center", mx: 0.5 }}
          />

          {/* Bàn 01 pill button */}
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "grey.200",
              color: "#190600",
              borderRadius: "999px",
              height: 34,
              minWidth: 88,
              fontWeight: "bold",
              fontSize: "0.8rem",
              textTransform: "none",
              px: 2,
              "&:hover": { bgcolor: "grey.300" },
            }}
          >
            Bàn 01
          </Button>

          {/* Góp ý pill button */}
          <Button
            variant="contained"
            disableElevation
            startIcon={
              <ChatIcon
                sx={{ width: 16, height: 16, color: "#190600" }}
              />
            }
            sx={{
              bgcolor: "#ca9600",
              color: "#190600",
              borderRadius: "999px",
              height: 34,
              minWidth: 88,
              fontWeight: "bold",
              fontSize: "0.8rem",
              textTransform: "none",
              px: 2,
              gap: 0.5,
              "&:hover": { bgcolor: "#b58500" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: "#190600",
                lineHeight: 1,
              }}
            >
              Góp ý
            </Typography>
          </Button>
        </Box>

        {/* Right section: cart and user icon buttons */}
        <Box display="flex" alignItems="center" gap={1} px={1}>
          {/* Shopping cart icon button */}
          <IconButton
            sx={{
              bgcolor: "grey.200",
              borderRadius: "999px",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "grey.300" },
            }}
          >
            <ShoppingIcon
              sx={{ width: 18, height: 18, color: "text.primary" }}
            />
          </IconButton>

          {/* User circle icon button */}
          <IconButton
            sx={{
              bgcolor: "grey.200",
              borderRadius: "999px",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "grey.300" },
            }}
          >
            <AvtIcon 
              sx={{ width: 24, height: 24, color: "#000000" }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Order_HeaderOrd;