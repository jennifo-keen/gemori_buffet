import React from "react";
import { Box } from "@mui/material";
import { FooterTermsSection } from "../users_components/promote/FooterTermsSection";
import { PromotionsCardsSection } from "../users_components/promote/PromotionsCardsSection";
import { PromotionsHeaderSection } from "../users_components/promote/PromotionsHeaderSection";
import { ThemeProvider } from "../users_components/layout/ThemeProvider";

export const Main = () => {
  return (
    <ThemeProvider>
      <Box component="main">
        <Box sx={{
        px: { xs: 2, sm: 3, md: 6, lg: "72px" },
        py: "24px",
      }}>
          <PromotionsHeaderSection />
          <PromotionsCardsSection />
          <FooterTermsSection />
        </Box>
      </Box>
      </ThemeProvider>
  );
};

export default Main;
