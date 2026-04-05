import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useOrder } from '../order_context/OrderContext';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../../../assets/img/Logo 1.png";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";

export const HeaderProfile = () => {
  const navigate = useNavigate();
  // const { tableCode } = useOrder();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ maxWidth: "100%", mx: "auto", backgroundColor: "#FFF7F4" }}
    >
      <Toolbar
        component={Stack}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3, py: 2 }}
      >
        {/* Back arrow button */}
        <IconButton 
        onClick={() => navigate(-1)}
        edge="start" aria-label="go back" sx={{ color: "#7B0000" }}>

          <ArrowBackIcon sx={{ width: 24, height: 24 }} />
        </IconButton>

        {/* Centered Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ width: 100, height: 38, objectFit: "contain" }}
        />

        <Box></Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderProfile;