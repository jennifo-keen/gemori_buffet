import React from "react";
import { Box } from "@mui/material";
import { DetailsSection } from "../../users_components/History/DetailSection";
import { ThemeProvider } from "../../users_components/layout/ThemeProvider";

const Main = () => {
  return (
    <ThemeProvider>
      <Box
        component="main"
        sx={{
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 0,
          }}
        >
          <DetailsSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;