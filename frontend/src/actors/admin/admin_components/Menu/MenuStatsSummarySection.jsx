import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { Box, Paper, Stack, Typography } from "@mui/material";

export const MenuStatsSummarySection = ({ stats }) => {
    const statsList = [
        {
            icon: <RestaurantMenuOutlinedIcon sx={{ width: 24, height: 24, color: "#b14135" }} />,
            iconBg: "#b141351a",
            label: "TỔNG SỐ MÓN",
            labelColor: "#661c00",
            value: stats.total, // Động
            borderColor: "#b141351a",
        },
        {
            icon: <CheckCircleOutlinedIcon sx={{ width: 24, height: 24, color: "#22c55e" }} />,
            iconBg: "#dcfce7",
            label: "ĐANG PHỤC VỤ",
            labelColor: "#5a403c",
            value: stats.serving, // Động
            borderColor: "#8a00001a",
        },
        {
            icon: <CancelOutlinedIcon sx={{ width: 24, height: 24, color: "#b14135" }} />,
            iconBg: "#b141351a",
            label: "NGƯNG BÁN",
            labelColor: "#5a403c",
            value: stats.stopped, // Động
            borderColor: "#8a00001a",
        },
    ];

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {statsList.map((stat, index) => (
                <Paper
                    key={index}
                    elevation={0}
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        borderRadius: "12px",
                        border: `1px solid ${stat.borderColor}`,
                        boxShadow: "0px 1px 2px #0000000d",
                        backgroundColor: "background.paper",
                    }}
                >
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: stat.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {stat.icon}
                    </Box>
                    <Stack spacing={0} sx={{ width: 138 }}>
                        <Typography
                            variant="captionCaption1Bold"
                            sx={{ color: stat.labelColor, lineHeight: "15px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: 700 }}
                        >
                            {stat.label}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, lineHeight: "28px" }}
                        >
                            {stat.value}
                        </Typography>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
};