import React from "react";
import { Box, Stack } from "@mui/material";
import { DetailsSection } from "../users_components/profile/DetailsSection";
import { ProfileSidebar } from "../users_components/profile/ProfileSidebar";
import { ThemeProvider } from "../users_components/layout/ThemeProvider";

const Main = () => {
  return (
    <ThemeProvider>
      <Box component="main" sx={{ px: 9, py: 4 }}>
        <Stack direction="row" spacing={4} alignItems="flex-start">
          <ProfileSidebar/>
          <DetailsSection />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Main;