import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    Box, Button, Card, CardContent, Chip, Divider,
    Grid, MenuItem, Select, Stack, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";

// Các giờ hiển thị trên biểu đồ
const chartHours = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const cardSx = {
    border: "1px solid",
    borderColor: "divider", // Sử dụng giá trị mặc định nếu theme.border chưa định nghĩa
    borderRadius: 3,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    bgcolor: "background.paper",
};

const OperationsOverviewSection = ({ data, onChangeDate }) => {
    const [selectedDate, setSelectedDate] = useState("Hôm nay");

    // Xử lý thay đổi filter ngày
    const handleDateChange = (event) => {
        const val = event.target.value;
        setSelectedDate(val);
        // Ở đây bạn có thể convert "Hôm nay" thành YYYY-MM-DD để gửi lên API qua onChangeDate
        if (onChangeDate) onChangeDate(new Date().toISOString().slice(0, 10));
    };

    return (
        <Box component="section" sx={{ width: "100%" }}>
            <Grid container spacing={4} alignItems="stretch">

                {/* CỘT TRÁI: BIỂU ĐỒ & BẢNG ĐƠN HÀNG */}
                <Grid item xs={12} lg={8.8}>
                    <Stack spacing={4}>

                        {/* 1. BIỂU ĐỒ DOANH THU */}
                        <Card sx={cardSx}>
                            <CardContent sx={{ p: 4 }}>
                                <Stack spacing={4}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>
                                                Thống kê doanh thu theo giờ
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Hoạt động thời gian thực của nhà hàng
                                            </Typography>
                                        </Box>
                                        <Select
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            size="small"
                                            IconComponent={KeyboardArrowDownIcon}
                                            sx={{
                                                minWidth: 120,
                                                height: 32,
                                                borderRadius: 2,
                                                fontSize: "0.875rem",
                                                bgcolor: "grey.50"
                                            }}
                                        >
                                            <MenuItem value="Hôm nay">Hôm nay</MenuItem>
                                            <MenuItem value="Hôm qua">Hôm qua</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Box sx={{ position: "relative", height: 200, mt: 2 }}>
                                        {/* Đường kẻ ngang (Grid lines) */}
                                        <Stack justifyContent="space-between" sx={{ position: "absolute", inset: 0, py: 1 }}>
                                            {[0, 1, 2, 3].map((line) => (
                                                <Divider key={line} sx={{ borderColor: "grey.100" }} />
                                            ))}
                                        </Stack>

                                        {/* Các cột dữ liệu (Bars) */}
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ position: "absolute", inset: 0, px: 2 }}>
                                            {chartHours.map((hour, index) => {
                                                // Lấy dữ liệu thực tế từ data.chart hoặc dùng số ngẫu nhiên để demo nếu null
                                                const value = data?.chart?.[index] || 0;
                                                const barHeight = Math.max((value / 1000000) * 100, 10); // Giả sử đơn vị triệu đồng

                                                return (
                                                    <Box key={hour} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <Box sx={{
                                                            width: 12,
                                                            height: `${barHeight}px`,
                                                            bgcolor: "primary.main",
                                                            borderRadius: "4px 4px 0 0",
                                                            transition: "height 0.3s ease"
                                                        }} />
                                                        <Typography sx={{ fontSize: 10, mt: 1, color: "text.secondary" }}>{hour}</Typography>
                                                    </Box>
                                                );
                                            })}
                                        </Stack>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* 2. BẢNG ĐƠN HÀNG MỚI NHẤT */}
                        <Card sx={cardSx}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 3, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                                <Typography variant="subtitle1" fontWeight={700}>Đơn hàng mới nhất</Typography>
                                <Button size="small" sx={{ textTransform: "none", fontWeight: 600 }}>Xem tất cả</Button>
                            </Stack>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: "grey.50" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem" }}>MÃ ĐƠN</TableCell>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem" }}>KHÁCH HÀNG</TableCell>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem" }}>SỐ BÀN</TableCell>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem" }}>TỔNG TIỀN</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem" }}>TRẠNG THÁI</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(data?.orders || []).map((order, idx) => (
                                            <TableRow key={idx} hover>
                                                <TableCell sx={{ fontWeight: 500 }}>{order.code}</TableCell>
                                                <TableCell>{order.customer}</TableCell>
                                                <TableCell>{order.table}</TableCell>
                                                <TableCell>{order.total}</TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={order.status}
                                                        size="small"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: "0.7rem",
                                                            bgcolor: order.statusType === "paid" ? "#E8F5E9" : "#FFF3E0",
                                                            color: order.statusType === "paid" ? "#2E7D32" : "#EF6C00"
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Stack>
                </Grid>

                {/* CỘT PHẢI: MÓN ĂN & HOẠT ĐỘNG */}
                <Grid item xs={12} lg={3.2}>
                    <Stack spacing={4}>

                        {/* 3. MÓN BÁN CHẠY */}
                        <Card sx={cardSx}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="subtitle1" fontWeight={700} mb={3}>Món ăn bán chạy nhất</Typography>
                                <Stack spacing={3}>
                                    {(data?.topDishes || []).map((dish) => (
                                        <Stack key={dish.rank} direction="row" spacing={2} alignItems="center">
                                            <Box component="img" src={dish.image} sx={{ width: 48, height: 48, borderRadius: 2, objectFit: "cover" }} />
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="body2" fontWeight={600} noWrap>{dish.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{dish.count}</Typography>
                                            </Box>
                                            <Typography variant="body2" fontWeight={700} color="primary.main">{dish.rank}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* 4. HOẠT ĐỘNG GẦN ĐÂY */}
                        <Card sx={cardSx}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="subtitle1" fontWeight={700} mb={3}>Hoạt động gần đây</Typography>
                                <Box sx={{ position: "relative" }}>
                                    {/* Đường kẻ dọc Timeline */}
                                    <Box sx={{ position: "absolute", top: 8, bottom: 8, left: 11, width: 2, bgcolor: "grey.100" }} />

                                    <Stack spacing={3}>
                                        {(data?.activities || []).map((act, index) => (
                                            <Stack key={index} direction="row" spacing={2} sx={{ position: "relative", zIndex: 1 }}>
                                                <Box sx={{
                                                    width: 24, height: 24, borderRadius: "50%", bgcolor: "background.paper",
                                                    border: "2px solid", borderColor: act.active ? "primary.main" : "grey.300",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}>
                                                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: act.active ? "primary.main" : "grey.300" }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" fontWeight={act.active ? 700 : 500}>{act.title}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{act.time}</Typography>
                                                </Box>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>

                    </Stack>
                </Grid>

            </Grid>
        </Box>
    );
};

export default OperationsOverviewSection;