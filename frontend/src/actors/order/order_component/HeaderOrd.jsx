import React from 'react';
import { useNavigate } from 'react-router-dom'; 
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
  Snackbar, Alert, Avatar
} from "@mui/material";
import { useOrder } from '../order_context/OrderContext';
import { useState } from 'react';

export const Order_HeaderOrd = () => {
  const navigate = useNavigate();
  const { tableCode, customer } = useOrder(); 
  const [showAlert, setShowAlert] = useState(false);

  const handleAvatarClick = () => {
    if (customer) {
      navigate(`/order/${tableCode}/profilebuffer`);
    } else {
      setShowAlert(true); 
    }
  };
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
            Bàn  {tableCode || '...'}
          </Button>

        </Box>

        {/* Right section: cart and user icon buttons */}
        <Box display="flex" alignItems="center" gap={1} px={1}>
          {/* Shopping cart icon button */}
          <IconButton
          onClick ={() => navigate(`/order/${tableCode}/cart`)}
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

          <IconButton onClick={handleAvatarClick}
            sx={{ bgcolor: "grey.200", borderRadius: "999px", width: 32, height: 32, p: 0, "&:hover": { bgcolor: "grey.300" } }}
          >
            {customer ? (
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#a21a16", fontSize: 14, fontWeight: 700 }}>
                {customer.full_name?.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <AvtIcon sx={{ width: 24, height: 24, color: "#000000" }} />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Snackbar thông báo chưa đăng nhập */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setShowAlert(false)}
          action={
            <Button size="small" color="inherit" onClick={() => { setShowAlert(false); navigate(`/order/${tableCode}/login`); }}>
              Đăng nhập
            </Button>
          }
        >
          Bạn chưa đăng nhập 
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Order_HeaderOrd;