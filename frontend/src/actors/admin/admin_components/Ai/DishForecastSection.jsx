import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import {
    Box,
    CircularProgress,
    Card,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Helper để format khung giờ
const getHourSlot = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const hour = d.getHours();
    return `${hour}:00 - ${hour + 1}:00`;
};

// UI DishCard đã thu nhỏ và tối ưu cho Grid
const DishCard = ({ dish }) => {
    const percent = Math.min(dish.predicted_percent || 0, 100);

    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                p: "10px",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                width: "100%", // Để card tự dãn theo ô của Grid
                height: "90px",
                boxSizing: "border-box",
                bgcolor: "#fff",
            }}
        >
            {/* Ảnh món ăn - Size 60x60 */}
            <Box
                component="img"
                src={dish.image_url || "https://via.placeholder.com/150"}
                alt={dish.name}
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "10px",
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />

            {/* Vùng nội dung bên phải */}
            <Stack
                flex={1}
                justifyContent="space-between"
                sx={{ minWidth: 0, height: "65px" }}
            >
                <Box>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        alignItems: "flex-start",
                        width: "100%"
                    }}>
                        <Typography
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                fontSize: "11.5px", // Giảm chữ
                                fontWeight: 700,
                                color: "#1a202c",
                                lineHeight: "1.2",
                                minHeight: "28px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                pr: 0.5
                            }}
                        >
                            {dish.name}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "13px",
                                fontWeight: 800,
                                color: "#a21a16",
                                textAlign: "right",
                                minWidth: "35px",
                            }}
                        >
                            {percent}%
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: "9px",
                            fontWeight: 700,
                            color: "#718096",
                            textTransform: "uppercase",
                            mt: 0.2
                        }}
                    >
                        DỰ ĐOÁN: {dish.predicted_quantity}
                    </Typography>
                </Box>

                {/* Thanh Progress mỏng */}
                <Box
                    sx={{
                        width: "100%",
                        height: 4,
                        bgcolor: "#f0f2f5",
                        borderRadius: "10px",
                        overflow: "hidden",
                        mt: 0.5
                    }}
                >
                    <Box
                        sx={{
                            width: `${percent}%`,
                            height: "100%",
                            bgcolor: "#a21a16",
                            borderRadius: "10px",
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
    const [displayLimit, setDisplayLimit] = useState(12); // Tăng lên 12 để chia hết cho 3

    // Dùng useCallback để tránh lỗi render vòng lặp (ESLint)
    const fetchForecast = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/admin/forecast");
            const rawData = response.data || [];

            const processedData = rawData.map(d => ({
                ...d,
                timeLabel: getHourSlot(d.forecast_date)
            })).filter(d => d.timeLabel !== null);

            const sortedData = processedData.sort((a, b) =>
                (b.predicted_quantity || 0) - (a.predicted_quantity || 0)
            );

            setDishes(sortedData);

            const uniqueSlots = [...new Set(sortedData.map(d => d.timeLabel))].sort((a, b) => {
                return parseInt(a) - parseInt(b);
            });

            setSlots(uniqueSlots);
            if (uniqueSlots.length > 0) {
                setTimeSlot(prev => uniqueSlots.includes(prev) ? prev : uniqueSlots[0]);
            }
        } catch (error) {
            console.error("Lỗi fetch dự báo:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchForecast();
    }, [fetchForecast]);

    // Reset limit khi đổi khung giờ
    const handleTimeSlotChange = (event, newSlot) => {
        if (newSlot) {
            setTimeSlot(newSlot);
            setDisplayLimit(12);
        }
    };

    const filteredDishes = dishes.filter(d => d.timeLabel === timeSlot);
    const visibleDishes = filteredDishes.slice(0, displayLimit);

    const handleToggleDisplay = () => {
        if (displayLimit >= filteredDishes.length) {
            setDisplayLimit(12);
            window.scrollTo({ top: 200, behavior: 'smooth' });
        } else {
            setDisplayLimit(prev => prev + 12);
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress sx={{ color: "#a21a16" }} />
        </Box>
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{
                        width: 40, height: 40,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        bgcolor: "rgba(162, 26, 22, 0.08)", borderRadius: "10px"
                    }}>
                        <DiamondOutlinedIcon sx={{ color: "#a21a16", fontSize: 20 }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "18px" }}>
                            Dự báo Món ăn (Top {filteredDishes.length})
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} color="text.secondary">
                            Món ăn có nhu cầu cao nhất theo khung giờ
                        </Typography>
                    </Box>
                </Stack>

                <ToggleButtonGroup
                    value={timeSlot}
                    exclusive
                    onChange={handleTimeSlotChange}
                    size="small"
                >
                    {slots.map(slot => (
                        <ToggleButton key={slot} value={slot} sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}>
                            {slot}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>

            {/* GRID 3 CỘT ÉP CỨNG */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',           // 1 cột trên mobile
                    sm: 'repeat(2, 1fr)', // 2 cột trên tablet
                    md: 'repeat(3, 1fr)'  // 3 cột trên laptop/PC
                },
                gap: 2,
                width: '100%'
            }}>
                {visibleDishes.length > 0 ? (
                    visibleDishes.map((dish, idx) => (
                        <DishCard key={dish.id || idx} dish={dish} />
                    ))
                ) : (
                    <Typography align="center" color="text.secondary" sx={{ py: 4, gridColumn: 'span 3' }}>
                        Không có dữ liệu dự báo.
                    </Typography>
                )}
            </Box>

            {/* Nút Xem thêm */}
            {filteredDishes.length > 12 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <ToggleButton
                        value="check"
                        selected
                        onClick={handleToggleDisplay}
                        sx={{
                            borderRadius: '12px', px: 4, py: 1,
                            textTransform: 'none', fontWeight: 700,
                            color: '#a21a16 !important',
                            bgcolor: 'rgba(162, 26, 22, 0.05) !important',
                            border: '1px solid rgba(162, 26, 22, 0.2) !important',
                        }}
                    >
                        {displayLimit >= filteredDishes.length ? "Thu gọn" : "Xem thêm món"}
                    </ToggleButton>
                </Box>
            )}
        </Box>
    );
};