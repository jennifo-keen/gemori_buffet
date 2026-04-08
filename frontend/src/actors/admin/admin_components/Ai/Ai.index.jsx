import React from 'react';
import { Stack, Box } from "@mui/material";
import { DishForecastSection } from "./DishForecastSection";
import { AiAssistantChatSection } from "./AiAssistantChatSection";

const Ai = () => {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={4}
      sx={{ width: "100%", mt: 2 }}
    >
      {/* Phần dự báo món ăn bên trái - Chiếm phần lớn diện tích */}
      <Box sx={{ flex: 1.8 }}>
        <DishForecastSection />
      </Box>

      {/* Phần Chatbot bên phải - Cố định độ rộng tối đa trên màn hình lớn */}
      <Box sx={{ width: { xs: "100%", lg: "400px" }, flexShrink: 0 }}>
        <AiAssistantChatSection />
      </Box>
    </Stack>
  );
};

export default Ai;