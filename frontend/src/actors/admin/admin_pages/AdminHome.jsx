import React from "react";
import { Grid, Paper, Typography, Box, Stack } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const StatCard = ({ title, value, icon, color }) => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #eee" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {title}
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                    {value}
                </Typography>
            </Box>
            <Box sx={{
                bgcolor: `${color}15`,
                p: 1.5,
                borderRadius: 2,
                display: "flex",
                color: color
            }}>
                {icon}
            </Box>
        </Stack>
    </Paper>
);

const AdminHome = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Tổng quan hệ thống
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Doanh thu hôm nay"
                        value="12.500.000đ"
                        icon={<TrendingUpIcon />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Khách hàng mới"
                        value="42"
                        icon={<PeopleIcon />}
                        color="#0288d1"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Đơn hàng"
                        value="156"
                        icon={<ReceiptLongIcon />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Món ăn đang bán"
                        value="85"
                        icon={<RestaurantIcon />}
                        color="#8a0000"
                    />
                </Grid>

                {/* Chỗ này sau này bạn có thể thêm Biểu đồ (Chart) hoặc Danh sách đơn hàng mới nhất */}
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, mt: 2, borderRadius: 3, border: "1px solid #eee", minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">
                            (Khu vực hiển thị biểu đồ tăng trưởng hoặc thông báo hệ thống)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminHome;