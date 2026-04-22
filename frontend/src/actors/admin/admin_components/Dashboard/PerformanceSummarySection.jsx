import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { Box, Card, Grid, Stack, Typography } from "@mui/material";

const formatMoney = (v) =>
    Number(v || 0).toLocaleString("vi-VN") + "đ";

const SummaryCard = ({
    title,
    value,
    change,
    icon: Icon,
    iconBg,
    iconColor
}) => {

    return (
        <Card
            elevation={0}
            sx={{
                height: 158,
                px: 4,
                py: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)"
            }}
        >
            <Stack direction="row" justifyContent="space-between">
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: iconBg }}>
                    {Icon && <Icon sx={{ color: iconColor }} />}
                </Box>

                <Stack direction="row" spacing={0.5}>
                    <Typography fontSize={12} color="green">
                        {change}
                    </Typography>
                    <TrendingUpIcon sx={{ fontSize: 14, color: "green" }} />
                </Stack>
            </Stack>

            <Box>
                <Typography fontSize={13} color="text.secondary">
                    {title}
                </Typography>
                <Typography fontSize={20} fontWeight={600}>
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
            change: "+0%",
            icon: AttachMoneyOutlinedIcon,
            iconBg: "rgba(162,26,22,0.1)",
            iconColor: "#A21A16"
        },
        {
            title: "Tổng đơn hàng",
            value: stats?.dailyOrders || 0,
            change: "+0%",
            icon: SaveOutlinedIcon,
            iconBg: "#FFF1B9",
            iconColor: "#9A7B00"
        },
        {
            title: "Bàn đang hoạt động",
            value: `${stats?.activeTables || 0}/${stats?.totalTables || 0}`,
            change: "+0%",
            icon: TableChartOutlinedIcon,
            iconBg: "#E3F2FD",
            iconColor: "#1976D2"
        },
        {
            title: "Khách hàng mới",
            value: stats?.newCustomers || 0,
            change: "+0%",
            icon: PeopleOutlineIcon,
            iconBg: "#E8F5E9",
            iconColor: "#2E7D32"
        }
    ];

    return (
        <Box mb={3}>
            <Grid container spacing={2}>
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