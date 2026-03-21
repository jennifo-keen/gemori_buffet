import React from "react";
import { AppBar, Box, Button, Toolbar,Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/img/Logo 1.png"

export const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(245, 245, 245, 1)",
        borderBottom: "1px solid rgba(177, 65, 53, 0.102)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: "72px" },
          py: 1,
          minHeight: "unset",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", width: 200 }}>
          <Box
            onClick={() => navigate("/")}
            component="img"
            src={logo}
            alt="Logo"
            sx={{ 
              cursor: "pointer",
              width: 130, 
              height: "49.01px", 
              objectFit: "contain",
              filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
             }}
          />
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>

          <Button
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#b4463c",
              color: "#ffffff",
              minWidth: "100px",
              height: "40px",
              px: "28px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "16px",
              whiteSpace: "nowrap",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#9e3c33",
              },
            }}
          >
            Hỗ trợ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;