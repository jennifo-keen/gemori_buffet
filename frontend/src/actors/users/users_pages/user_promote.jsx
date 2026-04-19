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
        <Box sx={{ px: 3, py: 4, width: "100%" }}>
          <PromotionsHeaderSection />
          <PromotionsCardsSection />
          <FooterTermsSection />
        </Box>
      </Box>
      </ThemeProvider>
  );
};

export default Main;
