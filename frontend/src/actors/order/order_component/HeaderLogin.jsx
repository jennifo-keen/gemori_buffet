import React from 'react';

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import Logo from "../../../assets/img/Logo 1.png"

export const HeaderLogin = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar >
        <IconButton  
            justifyContent="start"
            aria-label="menu" 
            sx={{ color: "#b5451b" }}>
          <MenuIcon fontSize="medium" />
        </IconButton>


        <Box 
            src={Logo}
            component="img"
            sx={{ 
                height:45,
                display: "flex", 
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                justifyContent: "center", 
                gap: 0.5 
            }}
        >
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderLogin;