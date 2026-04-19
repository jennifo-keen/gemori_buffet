import React from "react";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../../users_components/profile/ProfileSidebar";
import { ThemeProvider } from "../../users_components/layout/ThemeProvider";

const Main = () => {
  return (
    <ThemeProvider>
      <Box
        component="main"
        sx={{
          backgroundColor: "#F5F5F5",
          minHeight: "100vh",
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            boxSizing: "border-box",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, sm: 3, md: 4 }}
            alignItems="stretch"
          >
            <ProfileSidebar />

            <Box
              sx={{
                flex: 1,
                width: "100%",
                minWidth: 0,
              }}
            >
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;