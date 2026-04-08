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
                alignItems: "center",
                gap: 1.5,
                p: "12px",
                borderRadius: "20px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                // FIX: Chiều rộng và chiều cao cố định
                width: "320px",
                height: "115px",
                boxSizing: "border-box",
                bgcolor: "#fff",
                flexShrink: 0, // Không cho phép card bị ép nhỏ lại
            }}
        >
            {/* Ảnh món ăn - Cố định size 75x75 */}
            <Box
                component="img"
                src={dish.image_url || "https://via.placeholder.com/150"}
                alt={dish.name}
                sx={{
                    width: 75,
                    height: 75,
                    borderRadius: "14px",
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />

            {/* Vùng nội dung bên phải */}
            <Stack
                flex={1}
                justifyContent="space-between"
                sx={{ minWidth: 0, height: "80px" }} // Cân bằng với chiều cao ảnh
            >
                <Box>
                    {/* Grid để ép % luôn nằm cố định bên phải */}
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        alignItems: "flex-start",
                        width: "100%"
                    }}>
                        <Typography
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#1a202c",
                                lineHeight: "1.2",
                                // Fix cứng chiều cao 2 dòng để layout luôn đều
                                minHeight: "34px",
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
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "#a21a16",
                                textAlign: "right",
                                minWidth: "42px", // Fix cứng độ rộng cột %
                            }}
                        >
                            {percent}%
                        </Typography>
                    </Box>

                    {/* Số lượng dự đoán */}
                    <Typography
                        sx={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#718096",
                            textTransform: "uppercase",
                            mt: 0.2
                        }}
                    >
                        SỐ LƯỢNG DỰ ĐOÁN: {dish.predicted_quantity}
                    </Typography>
                </Box>

                {/* Thanh Progress */}
                <Box
                    sx={{
                        width: "100%",
                        height: 6,
                        bgcolor: "#f0f2f5",
                        borderRadius: "10px",
                        overflow: "hidden",
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

    // Thêm state để quản lý số lượng hiển thị
    const [displayLimit, setDisplayLimit] = useState(10);

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

                // Sắp xếp giảm dần theo predicted_quantity để lấy Top
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
                console.error("Lỗi FE:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, []);

    // Reset limit về 10 mỗi khi đổi khung giờ
    useEffect(() => {
        setDisplayLimit(10);
    }, [timeSlot]);

    const filteredDishes = dishes.filter(d => d.timeLabel === timeSlot);

    // Cắt danh sách theo limit hiện tại
    const visibleDishes = filteredDishes.slice(0, displayLimit);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: "#a21a16" }} /></Box>;
    const handleToggleDisplay = () => {
        if (displayLimit >= filteredDishes.length) {
            // Nếu đang hiện hết rồi thì thu gọn về 10
            setDisplayLimit(10);
            // Tùy chọn: Cuộn nhẹ lên đầu danh sách món ăn để user dễ nhìn
            window.scrollTo({ top: 400, behavior: 'smooth' });
        } else if (displayLimit === 10) {
            // Đang 10 thì lên 20
            setDisplayLimit(20);
        } else {
            // Đang 20 thì show hết
            setDisplayLimit(filteredDishes.length);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(162, 26, 22, 0.08)", borderRadius: "12px" }}>
                        <DiamondOutlinedIcon sx={{ color: "#a21a16" }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "20px" }}>Dự báo Món ăn (Top {filteredDishes.length})</Typography>
                        <Typography variant="body2" color="text.secondary">Món ăn có nhu cầu cao nhất theo khung giờ</Typography>
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

            {/* Grid hiển thị Card */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-start' }}>
                {visibleDishes.length > 0 ? (
                    visibleDishes.map((dish, idx) => (
                        <DishCard key={dish.id || idx} dish={dish} />
                    ))
                ) : (
                    <Typography align="center" color="text.secondary" sx={{ py: 4, width: '100%' }}>
                        Không có dữ liệu dự báo cho khung giờ này.
                    </Typography>
                )}
            </Box>

            {/* Nút Xem thêm / Thu gọn */}
            {filteredDishes.length > 10 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <ToggleButton
                        value="check"
                        selected
                        onClick={handleToggleDisplay}
                        sx={{
                            borderRadius: '12px',
                            px: 4,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 700,
                            color: '#a21a16 !important',
                            bgcolor: 'rgba(162, 26, 22, 0.05) !important',
                            border: '1px solid rgba(162, 26, 22, 0.2) !important',
                            '&:hover': {
                                bgcolor: 'rgba(162, 26, 22, 0.1) !important',
                            }
                        }}
                    >
                        {displayLimit >= filteredDishes.length
                            ? "Thu gọn bớt"
                            : `Xem thêm (${filteredDishes.length - displayLimit} món)`
                        }
                    </ToggleButton>
                </Box>
            )}
        </Box>
    );
};