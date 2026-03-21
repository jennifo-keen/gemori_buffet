import React from "react";
import { Box, Stack } from "@mui/material";
import { DetailsSection } from "../../users_components/History/DetailSection";
import { ThemeProvider } from "../../users_components/layout/ThemeProvider";

const Main = () => {
  return (
    <ThemeProvider>
      <Box>
        <Stack direction="row" spacing={4} alignItems="flex-start">
          <DetailsSection />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Main;