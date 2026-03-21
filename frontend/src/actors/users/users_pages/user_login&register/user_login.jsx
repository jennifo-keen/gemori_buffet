import React from "react";
import { Box, Stack } from "@mui/material";

import { ThemeProvider } from "../../users_components/layout/ThemeProvider";
import {Header} from "../../users_components/login&register/Header";
import {Footer} from "../../users_components/login&register/Footer";
import {MainLogin} from "../../users_components/login&register/MainLogin"

const Main = () => {
  return (
    <ThemeProvider>
      <Box component="main">
          <Header/>
          <MainLogin />
          <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Main;