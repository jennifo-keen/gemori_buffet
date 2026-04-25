import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
    Box, Button, Card, CardContent, Chip, Divider,
    Grid, Stack, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Typography, TextField, Tooltip, Zoom
} from "@mui/material";

// Thêm 21:00 và 22:00 vào mảng này
const chartHours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

const cardSx = {
    border: "rgba(177, 19, 53, 0.1)",
    borderColor: "rgba(177, 19, 53, 0.1)",
    borderRadius: 3,
    boxShadow: 2,
    bgcolor: "background.paper",
};

const OperationsOverviewSection = ({ data, onChangeDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-CA'));
    const BRAND_COLOR = "#A21A16"; // Màu đỏ mới bạn yêu cầu

    const maxRevenue = Math.max(...(data?.chart || []), 10);

    const handleDateChange = (event) => {
        const dateVal = event.target.value;
        setCurrentDate(dateVal);
        if (onChangeDate) onChangeDate(dateVal);
    };

    return (
        <Box component="section" sx={{ width: "100%" }}>
            <Grid container spacing={4}>

                {/* CỘT TRÁI */}
                <Grid item xs={12} lg={8.8}>
                    <Stack spacing={4}>
                        <Card sx={cardSx}>
                            <CardContent sx={{ p: 4 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={800} color="slate.900">Doanh thu theo khung giờ</Typography>
                                        <Typography variant="bodyBody3Regular" color="text.secondary">
                                            Dữ liệu biểu đồ ngày: <strong style={{ color: BRAND_COLOR }}>{currentDate}</strong>
                                        </Typography>
                                    </Box>

                                    <TextField
                                        type="date"
                                        size="small"
                                        value={currentDate}
                                        onChange={handleDateChange}
                                        InputProps={{
                                            startAdornment: <CalendarTodayIcon sx={{ fontSize: 18, mr: 1, color: BRAND_COLOR }} />,
                                        }}
                                        sx={{
                                            bgcolor: "#FFF7F3",
                                            borderRadius: 2,
                                            "& .MuiOutlinedInput-notchedOutline": { border: "rgba(177, 19, 53, 0.1)" }
                                        }}
                                    />
                                </Stack>

                                <Box sx={{ position: "relative", height: 250, mt: 2, px: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                    <Box sx={{ position: "absolute", inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: 4.5 }}>
                                        {[0, 1, 2, 3, 4].map((line) => (
                                            <Divider key={line} sx={{ borderColor: "rgba(177, 19, 53, 0.1)", borderStyle: 'dashed' }} />
                                        ))}
                                    </Box>

                                    <Stack direction="row" spacing={3} justifyContent="space-around" alignItems="flex-end" sx={{ position: "relative", height: '100%', zIndex: 1 }}>
                                        {chartHours.map((hour, index) => {
                                            const val = data?.chart?.[index] || 0;
                                            const barHeight = (val / maxRevenue) * 100;

                                            return (
                                                <Box key={hour} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: '100%' }}>
                                                    <Box sx={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                                        <Tooltip
                                                            title={
                                                                <Box sx={{ p: 0.5 }}>
                                                                    <Typography variant="caption" display="block">Giờ: {hour}</Typography>
                                                                    <Typography variant="body2" fontWeight={700}>{Number(val * 1000000).toLocaleString()}đ</Typography>
                                                                </Box>
                                                            }
                                                            arrow placement="top" TransitionComponent={Zoom}
                                                        >
                                                            <Box sx={{
                                                                width: "80%", maxWidth: 40,
                                                                height: `${Math.max(barHeight, 2)}%`,
                                                                bgcolor: val > 0 ? BRAND_COLOR : "slate.300",
                                                                borderRadius: "6px 6px 0 0",
                                                                transition: "all 0.5s ease",
                                                                cursor: "pointer",
                                                                '&:hover': { filter: "brightness(1.2)", transform: "translateY(-4px)" }
                                                            }} />
                                                        </Tooltip>
                                                    </Box>
                                                    <Typography sx={{ fontSize: 11, mt: 1.5, color: "text.secondary", fontWeight: 600 }}>{hour}</Typography>
                                                </Box>
                                            );
                                        })}
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* BẢNG ĐƠN HÀNG */}
                        <Card sx={cardSx}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "rgba(177, 19, 53, 0.1)" }}>
                                <Typography variant="h6" fontSize="18px" fontWeight={700}>Đơn hàng mới nhất hôm nay</Typography>
                                {/* Đã đổi màu text button */}
                                <Button size="small" sx={{ color: BRAND_COLOR, fontWeight: 700 }}>Xem tất cả</Button>
                            </Stack>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#FFE5DF" }}>
                                            {["MÃ ĐƠN", "KHÁCH HÀNG", "BÀN", "TỔNG TIỀN", "TRẠNG THÁI"].map((head) => (
                                                <TableCell key={head} sx={{ fontWeight: 700, color: "#B4463C" }}>{head}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.orders?.map((order, idx) => (
                                            <TableRow key={idx} hover>
                                                <TableCell sx={{ fontWeight: 700, color: BRAND_COLOR }}>{order.code}</TableCell>
                                                <TableCell>{order.customer}</TableCell>
                                                <TableCell><Chip label={order.table} size="small" /></TableCell>
                                                <TableCell sx={{ fontWeight: 800 }}>{order.total}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={order.status}
                                                        size="small"
                                                        sx={{
                                                            fontWeight: 700,
                                                            // Đã đổi màu xanh dương sang màu đỏ nhạt/đậm của mã A21A16
                                                            bgcolor: order.statusType === "paid" ? "rgba(162, 26, 22, 0.1)" : "rgba(244, 202, 102, 0.15)",
                                                            color: order.statusType === "paid" ? BRAND_COLOR : "#b47e00",
                                                            borderRadius: 1.5
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

                {/* CỘT PHẢI */}
                <Grid item xs={12} lg={3.2}>
                    <Stack spacing={4}>
                        <Card sx={cardSx}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontSize="18px" fontWeight={700} mb={3}>Top 3 món hôm nay</Typography>
                                <Stack spacing={2.5}>
                                    {data?.topDishes?.map((dish) => (
                                        <Stack key={dish.rank} direction="row" spacing={2} alignItems="center">
                                            <Box component="img" src={dish.image} sx={{ width: 56, height: 56, borderRadius: 2, objectFit: "cover" }} />
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="bodyBody2Medium" fontWeight={700} noWrap>{dish.name}</Typography>
                                                <Typography variant="captionCaption1Medium" color="text.secondary">{dish.count}</Typography>
                                            </Box>
                                            <Typography variant="h5" color={BRAND_COLOR} sx={{ opacity: 0.2 }}>{dish.rank}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={{ ...cardSx, border: "rgba(177, 19, 53, 0.1)", bgcolor: "#fffafb" }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="subtitle1" fontWeight={800} mb={3} color={BRAND_COLOR} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, bgcolor: BRAND_COLOR, borderRadius: '50%' }} />
                                    Cảnh báo kho hàng
                                </Typography>

                                <Stack spacing={3}>
                                    {data?.inventoryAlerts?.map((alert, index) => {
                                        const statusColor = alert.isCritical ? BRAND_COLOR : "#f4ca66";
                                        const textSlate700 = "#334155";

                                        return (
                                            <Stack key={index} direction="row" spacing={1.5} alignItems="center">
                                                {/* Vạch chỉ thị màu thay cho ảnh */}
                                                <Box sx={{
                                                    width: 6,
                                                    height: 38,
                                                    bgcolor: statusColor,
                                                    borderRadius: 1,
                                                    flexShrink: 0
                                                }} />

                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    {/* TÊN MÓN - Bây giờ chắc chắn sẽ hiện vì title = item.name */}
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={700}
                                                        noWrap
                                                        sx={{ color: alert.isCritical ? BRAND_COLOR : "text.primary" }}
                                                    >
                                                        {alert.title}
                                                    </Typography>

                                                    {/* THÔNG TIN KHO */}
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ color: textSlate700, opacity: 0.8, fontSize: "0.7rem" }}
                                                    >
                                                        {alert.time}
                                                    </Typography>
                                                </Box>

                                                {/* Tag nhỏ báo Hết hàng nếu cần */}
                                                {alert.isCritical && (
                                                    <Typography variant="caption" sx={{ fontWeight: 900, color: BRAND_COLOR, fontSize: 10 }}>
                                                        HẾT
                                                    </Typography>
                                                )}
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OperationsOverviewSection;