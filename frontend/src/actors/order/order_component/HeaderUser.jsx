import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Nhận vào 2 props: title (tiêu đề) và icon (icon tùy chỉnh)
export const Order_HeaderUser = ({ title = "Tiêu đề", icon: RightIcon }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #8a00001a",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 56, px: 2 }}>
        <IconButton edge="start" sx={{ color: "#6c0d0a", p: 0 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="body1"
          component="h1"
          sx={{
            color: "#6c0d0a",
            textAlign: "center",
            fontWeight: "bold",
            flex: 1, 
          }}
        >
          {title}
        </Typography>

        {RightIcon ? (
          <IconButton edge="end" sx={{ color: "#6c0d0a", p: 0 }}>
            <RightIcon />
          </IconButton>
        ) : (
          
          <div style={{ width: 24 }} /> 
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Order_HeaderUser;