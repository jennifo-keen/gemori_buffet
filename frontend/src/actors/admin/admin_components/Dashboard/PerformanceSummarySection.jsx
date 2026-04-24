import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

import { Box, Card, Grid, Stack, Typography } from "@mui/material";

const formatMoney = (v) =>
    Number(v || 0).toLocaleString("vi-VN") + "đ";

const SummaryCard = ({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor
}) => {

    return (
        <Card
            elevation={0}
            sx={{
                height: 150, // Giảm chiều cao xuống để card trông gọn hơn
                px: 3,
                py: 2.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "16px", // Bo góc nhiều hơn một chút cho hiện đại
                border: "1px solid",
                borderColor: "rgba(177, 19, 53, 0.08)",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.02)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                    transform: "translateY(-2px)"
                }
            }}
        >
            {/* Khung chứa icon đã được thu nhỏ lại */}
            <Box sx={{
                width: 40, // Cố định chiều rộng
                height: 40, // Cố định chiều cao
                borderRadius: "10px",
                bgcolor: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {Icon && <Icon sx={{ color: iconColor, fontSize: 20 }} />}
            </Box>

            <Box sx={{ mt: 1 }}>
                <Typography fontSize={13} fontWeight={500} color="text.secondary" sx={{ mb: 0.5 }}>
                    {title}
                </Typography>
                <Typography fontSize={22} fontWeight={700} color="slate.900">
                    {value}
                </Typography>
            </Box>
        </Card>
    );
};

const PerformanceSummarySection = ({ stats }) => {

    const items = [
        {
            title: "Doanh thu hôm nay",
            value: formatMoney(stats?.totalRevenue),
            icon: AttachMoneyOutlinedIcon,
            iconBg: "rgba(162,26,22,0.1)",
            iconColor: "#A21A16"
        },
        {
            title: "Tổng đơn hàng hôm nay",
            value: stats?.dailyOrders || 0,
            icon: SaveOutlinedIcon,
            iconBg: "rgba(244, 202, 102, 0.15)",
            iconColor: "#9A7B00"
        },
        {
            title: "Bàn đang hoạt động",
            value: `${stats?.activeTables || 0}/${stats?.totalTables || 0}`,
            icon: TableChartOutlinedIcon,
            iconBg: "rgba(37, 99, 235, 0.1)",
            iconColor: "#1976D2"
        },
        {
            title: "Khách hàng mới",
            value: stats?.newCustomers || 0,
            icon: PeopleOutlineIcon,
            iconBg: "rgba(46, 125, 50, 0.1)",
            iconColor: "#2E7D32"
        }
    ];

    return (
        <Box mb={4}>
            <Grid container spacing={2.5}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <SummaryCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PerformanceSummarySection;