import React from "react";
import { Stack, Box } from "@mui/material";
import { DailyRevenueChartSection } from "../admin_components/DailyRevenue/DailyRevenueChartSection";
import { AiAssistantChatSection } from "../admin_components/AiAssistant/AiAssistantChatSection";

const ContentAdAi = () => {
    return (
        <Stack spacing={4} sx={{ width: "100%" }}>
            <DailyRevenueChartSection />
            <AiAssistantChatSection />
        </Stack>
    );
};

export default ContentAdAi;