import React from "react";
import { Box } from "@mui/material";
import { HeaderSection } from "./HeaderSection";
import { HistoryTable } from "./HistoryTable";
import { ThemeProvider } from "../layout/ThemeProvider";

export const MainSection = () => {
  return (
    <ThemeProvider>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, md: 4 },
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "primary.light",
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <HeaderSection />
        <HistoryTable />
      </Box>
    </ThemeProvider>
  );
};

export default MainSection;