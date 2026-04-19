import React from 'react';
import { Box, Stack } from "@mui/material";
import { DailyRevenueChartSection } from "../admin_components/DailyRevenue/DailyRevenueChartSection";
import Ai from "../admin_components/Ai/Ai.index";
import { AccuracyChart } from '../admin_components/Ai/Chart';

const ContentAdAi = () => {
    return (
        <Box
            sx={{
                p: { xs: 2, md: 4 },
                width: "100%",
                minHeight: "100vh",
                bgcolor: "#fafafa",
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: "100%",
                    maxWidth: "1600px" // Giới hạn chiều rộng để layout không bị loãng
                }}
            >
                {/* Biểu đồ doanh thu phía trên */}
                <Box sx={{ width: "100%" }}>
                    <DailyRevenueChartSection />
                </Box>

                {/* Phần AI và Dự báo món ăn phía dưới */}
                <Ai />
                <AccuracyChart />
            </Stack>
        </Box>
    );
};

export default ContentAdAi;