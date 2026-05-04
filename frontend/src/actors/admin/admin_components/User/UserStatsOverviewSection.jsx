import GroupsIcon from "@mui/icons-material/Groups";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
// Thay vì dùng Unstable_Grid2, hãy dùng Grid chuẩn từ gói material
import { Grid } from "@mui/material";// Sử dụng Grid2 để layout chuẩn hơn

const StatCard = ({ label, value, borderColor, icon }) => (
    <Card
        component="section"
        elevation={0} // Bỏ bóng đổ nặng nề
        sx={{
            height: "100%",
            minHeight: 120,
            borderRadius: 3, // Bo góc mềm mại hơn
            border: "1px solid", // Dùng border nhẹ thay vì đổ bóng
            borderColor: "divider",
            borderLeft: `6px solid`, // Điểm nhấn ở mép trái
            borderLeftColor: borderColor,
            position: "relative",
            overflow: "hidden",
            bgcolor: "background.paper",
            transition: "transform 0.2s",
            "&:hover": { transform: "translateY(-4px)" } // Hiệu ứng hover nhẹ cho sang
        }}
    >
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
            <Stack spacing={0.5}>
                <Typography
                    variant="caption"
                    component="h2"
                    sx={{
                        color: "text.disabled",
                        fontWeight: 700,
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        textTransform: "uppercase"
                    }}
                >
                    {label}
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        color: "text.primary",
                        fontSize: "32px",
                        lineHeight: "40px",
                        fontWeight: 900,
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                    }}
                >
                    {value}
                </Typography>
            </Stack>
            <Box
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    top: 15,
                    right: 15,
                    opacity: 0.8
                }}
            >
                {icon}
            </Box>
        </CardContent>
    </Card>
);

const UserStatsOverviewSection = ({ statsData = { total: 0, active: 0, locked: 0 } }) => {
    // Cấu hình màu sắc và icon cho từng loại stats
    const statsConfig = [
        {
            label: "TỔNG CỘNG",
            value: (statsData?.total || 0).toLocaleString(),
            borderColor: "#6366f1", // Màu Indigo hiện đại
            icon: <GroupsIcon sx={{ fontSize: 32, color: "#6366f1" }} />,
        },
        {
            label: "ĐANG HOẠT ĐỘNG",
            value: (statsData?.active || 0).toLocaleString(),
            borderColor: "#10b981", // Màu Emerald xanh mướt
            icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32, color: "#10b981" }} />,
        },
        {
            label: "TÀI KHOẢN KHÓA",
            value: (statsData?.locked || 0).toLocaleString(),
            borderColor: "#f43f5e", // Màu Rose đỏ tinh tế
            icon: <PersonOffOutlinedIcon sx={{ fontSize: 32, color: "#f43f5e" }} />,
        },
    ];

    return (
        <Box component="section" sx={{ width: "100%", mb: 2 }}>
            <Grid container spacing={3}>
                {statsConfig.map((stat) => (
                    <Grid key={stat.label} xs={12} sm={4}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserStatsOverviewSection;