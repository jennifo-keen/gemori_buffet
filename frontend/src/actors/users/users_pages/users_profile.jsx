import React from "react";
import { Box, Stack } from "@mui/material";
import { DetailsSection } from "../users_components/profile/DetailsSection";
import { ProfileSidebar } from "../users_components/profile/ProfileSidebar";
import { ThemeProvider } from "../users_components/layout/ThemeProvider";

const Main = () => {
  return (
    <ThemeProvider>
      <Box
        component="main"
        sx={{
          px: { xs: 2, sm: 3, md: 6, lg: 9 },
          py: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "#F5F5F5",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, sm: 3, md: 4 }}
          alignItems="stretch"
        >
          <ProfileSidebar />
          <DetailsSection />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Main;