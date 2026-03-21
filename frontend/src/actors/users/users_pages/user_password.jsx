import React from "react";
import { Box, Stack } from "@mui/material";
import { ChangePass } from "../users_components/password/ChangePass";
import { ProfileSidebar } from "../users_components/profile/ProfileSidebar";
import { ThemeProvider } from "../users_components/layout/ThemeProvider";

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
          <ProfileSidebar/>
          < ChangePass />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Main;