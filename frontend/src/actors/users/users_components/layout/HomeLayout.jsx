import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function HomeLayout() {
  return (
    <Box>
      <Header />

      <Box component="main">
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default HomeLayout;