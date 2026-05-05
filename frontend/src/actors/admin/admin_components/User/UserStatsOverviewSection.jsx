import { useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    useTheme,
    Skeleton,
} from "@mui/material";

// 1. Đổi tên prop từ 'icon' thành 'Icon' để ESLint nhận diện là một Component
// Component con StatCard - Fix dứt điểm lỗi gạch đỏ "Icon is defined but never used"
const StatCard = (props) => {
    // 1. Phân tách props ra, đặt tên tạm là iconComponent
    const { title, value, borderColor, Icon: iconComponent, iconColor, loading } = props;
    const theme = useTheme();

    // 2. Gán lại cho một biến viết hoa để JSX nhận diện, đồng thời đánh dấu cho ESLint
    const SelectedIcon = iconComponent;

    return (
        <Card
            variant="outlined"
            sx={{
                width: 254,
                position: "relative",
                height: "100%",
                minHeight: 100,
                borderRadius: 3,
                borderColor,
                boxShadow: theme.shadows[1],
                overflow: "hidden",
            }}
        >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                <Stack spacing={0.5}>
                    <Typography
                        component="h2"
                        sx={{
                            color: "text.secondary",
                            fontFamily: '"Be Vietnam Pro", Helvetica, Arial, sans-serif',
                            fontSize: 10,
                            fontWeight: 700,
                            lineHeight: "16px",
                            letterSpacing: "1.2px",
                            textTransform: "uppercase",
                        }}
                    >
                        {title}
                    </Typography>

                    {loading ? (
                        <Skeleton width="60%" height={42} sx={{ mt: 0.5 }} />
                    ) : (
                        <Typography
                            component="p"
                            sx={{
                                color: "text.primary",
                                fontFamily: '"Be Vietnam Pro", Helvetica, Arial, sans-serif',
                                fontSize: 35,
                                fontWeight: 900,
                                lineHeight: "1",
                                letterSpacing: 0,
                            }}
                        >
                            {value}
                        </Typography>
                    )}
                </Stack>

                <Box
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* 3. Dùng biến SelectedIcon đã gán lại, chắc chắn hết lỗi */}
                    {SelectedIcon && <SelectedIcon sx={{ fontSize: 38, color: iconColor }} />}
                </Box>
            </CardContent>
        </Card>
    );
};

const UserStatsOverviewSection = () => {
    const [stats, setStats] = useState({ total: 0, active: 0, locked: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/users/stats`);
                const result = await response.json();
                if (result.success) {
                    setStats(result.data);
                }
            } catch (error) {
                console.error("Lỗi fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // 2. Cập nhật key từ 'icon' thành 'Icon' để khớp với StatCard
    const dashboardCards = [
        {
            title: "TỔNG CỘNG",
            value: Number(stats.total || 0).toLocaleString(),
            borderColor: "primary.light",
            Icon: GroupsIcon,
            iconColor: "primary.main",
        },
        {
            title: "ĐANG HOẠT ĐỘNG",
            value: Number(stats.active || 0).toLocaleString(),
            borderColor: "secondary.light",
            Icon: VerifiedUserOutlinedIcon,
            iconColor: "secondary.main",
        },
        {
            title: "TÀI KHOẢN KHÓA",
            value: Number(stats.locked || 0).toLocaleString(),
            borderColor: "warning.light",
            Icon: PersonOffOutlinedIcon,
            iconColor: "warning.main",
        },
    ];

    return (
        <Box component="section" aria-label="Dashboard summary" sx={{ mb: 3 }}>
            <Grid container spacing={3}>
                {dashboardCards.map((card) => (
                    <Grid key={card.title} item xs={12} sm={6} md={4}>
                        <StatCard {...card} loading={loading} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserStatsOverviewSection;