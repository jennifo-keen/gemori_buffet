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
          gap: 4,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "primary.light",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <HeaderSection />
        <HistoryTable />
      </Box>
    </ThemeProvider>
  );
};