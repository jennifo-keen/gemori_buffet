import React from "react";
import { Box, Stack } from "@mui/material";

import { ThemeProvider } from "../../users_components/layout/ThemeProvider";
import {Header} from "../../users_components/login&register/Header";
import {Footer} from "../../users_components/login&register/Footer";
import {MainRegister} from "../../users_components/login&register/MainRegister"

const Main = () => {
  return (
    <ThemeProvider>
      <Box component="main">
          <Header/>
          <MainRegister/>
          <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Main;