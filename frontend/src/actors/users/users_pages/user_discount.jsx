import React from "react";
import { Box, Stack } from "@mui/material";
import { Voucher } from "../users_components/discount/voucher";
import { ProfileSidebar } from "../users_components/profile/ProfileSidebar";
import { ThemeProvider } from "../users_components/layout/ThemeProvider";

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
            <Voucher />
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;