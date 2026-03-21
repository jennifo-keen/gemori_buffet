import React from "react";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../../users_components/profile/ProfileSidebar";
import { ThemeProvider } from "../../users_components/layout/ThemeProvider";

const Main = () => {
  return (
    <ThemeProvider>
      <Box component="main" 
            sx={{ 
              px: 9, 
              py: 4,
              backgroundColor: "#F5F5F5",
                }}>
        <Stack direction="row" spacing={4} alignItems="flex-start">
          <ProfileSidebar />

          <Box sx={{ flex: 1, width: "100%" }}>
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Main;