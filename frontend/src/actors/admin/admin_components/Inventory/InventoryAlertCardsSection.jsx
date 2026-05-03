import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
    Box,
    Card,
    Chip,
    Grid,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

// Cấu hình font chữ chung
const commonFontSx = {
    fontFamily: '"Be Vietnam Pro", sans-serif',
};

export default function InventoryAlertCardsSection({ stats }) {
    const theme = useTheme();

    // Mapping dữ liệu từ stats vào cấu trúc giao diện
    const alerts = [
        {
            title: "CẢNH BÁO HẾT KHO",
            count: stats?.out_of_stock || 0,
            description: "nguyên liệu đã hết",
            chipLabel: "Cần nhập ngay",
            accent: "#ba1a1a",
            chipBg: "#ba1a1a1a",
            borderColor: "#8a00001a",
        },
        {
            title: "CẢNH BÁO TỒN KHO",
            count: stats?.low_stock || 0,
            description: "nguyên liệu sắp hết",
            chipLabel: "Xem xét nhập hàng",
            accent: "#eab308",
            chipBg: "#fffce5",
            borderColor: "#8a00001a",
        },
    ];

    return (
        <Box component="section" sx={{ width: "100%" }}>
            <Grid container spacing={2}>
                {alerts.map((alert) => (
                    <Grid key={alert.title} item xs={12} md={6}>
                        <Card
                            sx={{
                                position: "relative",
                                minHeight: 154,
                                px: 5,
                                py: 5,
                                overflow: "hidden",
                                border: `1px solid ${alert.borderColor}`,
                                boxShadow: theme.shadows[1],
                                display: "flex",
                                alignItems: "center",
                                bgcolor: "background.paper",
                                borderRadius: 3,
                            }}
                        >
                            {/* Trang trí họa tiết phía sau */}
                            <Box
                                aria-hidden="true"
                                sx={{
                                    position: "absolute",
                                    right: -15,
                                    bottom: -15,
                                    opacity: 0.05,
                                    width: 28,
                                    height: 96,
                                    borderRadius: 999,
                                    background: `linear-gradient(180deg, ${alert.accent} 0%, ${alert.accent} 100%)`,
                                }}
                            />

                            <Stack spacing={1} sx={{ position: "relative", zIndex: 1 }}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        ...commonFontSx,
                                        fontSize: 12,
                                        fontWeight: 800, // Đã tăng độ đậm lên 800
                                        lineHeight: "16px",
                                        letterSpacing: "0.6px",
                                        color: "#0F172A", // Đã đổi sang màu xanh đen đậm theo yêu cầu
                                    }}
                                >
                                    {alert.title}
                                </Typography>

                                <Stack
                                    direction="row"
                                    alignItems="baseline"
                                    spacing={1}
                                    sx={{ minHeight: 44 }}
                                >
                                    <Typography
                                        sx={{
                                            ...commonFontSx,
                                            fontSize: 32,
                                            fontWeight: 900,
                                            lineHeight: "36px",
                                            color: alert.accent,
                                        }}
                                    >
                                        {alert.count}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...commonFontSx,
                                            fontSize: 14,
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                            color: "text.secondary",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {alert.description}
                                    </Typography>
                                </Stack>

                                <Box sx={{ mt: 1 }}>
                                    <Chip
                                        icon={
                                            <WarningAmberOutlinedIcon
                                                sx={{
                                                    fontSize: "14px !important",
                                                    color: `${alert.accent} !important`,
                                                }}
                                            />
                                        }
                                        label={alert.chipLabel}
                                        sx={{
                                            height: 26,
                                            px: 1,
                                            backgroundColor: alert.chipBg,
                                            color: alert.accent,
                                            borderRadius: 999,
                                            border: "none",
                                            "& .MuiChip-label": {
                                                px: 0.5,
                                                ...commonFontSx,
                                                fontSize: 11,
                                                fontWeight: 700,
                                            },
                                            "& .MuiChip-icon": {
                                                ml: 0,
                                                mr: 0.5,
                                            },
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}