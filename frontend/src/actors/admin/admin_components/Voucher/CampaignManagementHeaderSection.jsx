import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const CampaignManagementHeaderSection = () => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
            <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 800, color: "#230f0f", fontSize: "26px", letterSpacing: "-0.5px" }}>
                    Quản lý chiến dịch ưu đãi
                </Typography>
                <Typography sx={{ color: "#78716c", fontSize: "14px" }}>
                    Dành riêng cho hệ thống buffet - Theo dõi và tối ưu hóa doanh thu.
                </Typography>
            </Stack>
            <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                    backgroundColor: "#8a0000",
                    borderRadius: "8px",
                    px: 3,
                    py: 1.25,
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#6a0000" },
                }}
            >
                Tạo chiến dịch mới
            </Button>
        </Stack>
    );
};