import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import {
    Box,
    CircularProgress,
    Card,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

// Helper để format khung giờ
const getHourSlot = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const hour = d.getHours();
    return `${hour}:00 - ${hour + 1}:00`;
};

// UI DishCard mới theo yêu cầu của bạn
const DishCard = ({ dish }) => {
    const percent = Math.min(dish.predicted_percent || 0, 100);

    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                borderRadius: "16px",
                border: "1px solid rgba(177, 65, 53, 0.05)",
                width: "100%", // Để fit với Grid
                height: "115px", // Chiều cao cố định để các card đều nhau
                boxSizing: "border-box",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-4px)" }
            }}
        >
            {/* Product image */}
            <Box
                component="img"
                src={dish.image_url || "https://via.placeholder.com/150"}
                alt={dish.name}
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "12px",
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />

            {/* Content area */}
            <Stack
                justifyContent="space-between"
                flex={1}
                alignSelf="stretch"
                sx={{ minWidth: 0 }}
            >
                {/* Top section: title row + subtitle */}
                <Stack spacing={0}>
                    {/* Title and percentage row */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Be Vietnam Pro", Helvetica',
                                fontSize: "16px",
                                fontWeight: 700,
                                letterSpacing: "0px",
                                lineHeight: "24px",
                                color: "#0f172a",
                                flex: 1,
                                pr: "4px",
                                // Cắt chữ nếu tên món quá dài
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {dish.name}
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: '"Be Vietnam Pro", Helvetica',
                                fontSize: "14px",
                                fontWeight: 700,
                                letterSpacing: "0px",
                                lineHeight: "16px",
                                color: "#a21a16",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {percent}%
                        </Typography>
                    </Stack>

                    {/* Subtitle */}
                    <Typography
                        sx={{
                            fontFamily: '"Epilogue", "Epilogue-Bold", Helvetica',
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#64748b",
                            letterSpacing: "-0.25px",
                            lineHeight: "15px",
                            textTransform: "uppercase"
                        }}
                    >
                        SỐ LƯỢNG DỰ ĐOÁN: {dish.predicted_quantity}
                    </Typography>
                </Stack>

                {/* Progress bar */}
                <Box
                    sx={{
                        width: "100%",
                        height: 8,
                        bgcolor: "rgba(177, 65, 53, 0.05)",
                        borderRadius: "999px",
                        overflow: "hidden",
                        mt: 1
                    }}
                >
                    <Box
                        sx={{
                            width: `${percent}%`,
                            height: "100%",
                            bgcolor: "#a21a16",
                            borderRadius: "999px",
                        }}
                    />
                </Box>
            </Stack>
        </Card>
    );
};

export const DishForecastSection = () => {
    const [timeSlot, setTimeSlot] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/admin/forecast");
                const rawData = response.data || [];

                const processedData = rawData.map(d => ({
                    ...d,
                    timeLabel: getHourSlot(d.forecast_date)
                })).filter(d => d.timeLabel !== null);

                setDishes(processedData);

                const uniqueSlots = [...new Set(processedData.map(d => d.timeLabel))].sort((a, b) => {
                    return parseInt(a) - parseInt(b);
                });

                setSlots(uniqueSlots);
                if (uniqueSlots.length > 0) {
                    setTimeSlot(prev => uniqueSlots.includes(prev) ? prev : uniqueSlots[0]);
                }
            } catch (error) {
                console.error("Lỗi FE:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, []);

    const filteredDishes = dishes.filter(d => d.timeLabel === timeSlot);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: "#a21a16" }} /></Box>;

    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(162, 26, 22, 0.08)", borderRadius: "12px" }}>
                        <DiamondOutlinedIcon sx={{ color: "#a21a16" }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "20px" }}>Dự báo Món ăn</Typography>
                        <Typography variant="body2" color="text.secondary">AI phân tích nhu cầu khách hàng</Typography>
                    </Box>
                </Stack>

                <ToggleButtonGroup
                    value={timeSlot}
                    exclusive
                    onChange={(e, v) => v && setTimeSlot(v)}
                    size="small"
                >
                    {slots.map(slot => (
                        <ToggleButton key={slot} value={slot} sx={{ textTransform: 'none', fontWeight: 600 }}>
                            {slot}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>

            <Grid container spacing={2} alignItems="stretch">
                {filteredDishes.length > 0 ? (
                    filteredDishes.map((dish, idx) => (
                        <Grid item xs={12} sm={6} lg={4} key={dish.id || idx}>
                            <DishCard dish={dish} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                            Không có dữ liệu dự báo cho khung giờ này.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};