import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../../../assets/img/Logo 1.png";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";

export const HeaderProfile = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ maxWidth: "100%", mx: "auto" }}
    >
      <Toolbar
        component={Stack}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3, py: 1 }}
      >
        {/* Back arrow button */}
        <IconButton edge="start" aria-label="go back" sx={{ color: "#7B0000" }}>
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