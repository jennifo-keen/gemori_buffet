import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Stack, Divider } from "@mui/material";

export const AccuracyChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Đảm bảo API này trả về tối đa 15 ngày gần nhất
        fetch("http://localhost:3000/api/admin/ai/charts")
            .then(res => res.json())
            .then(json => {
                if (Array.isArray(json)) {
                    // Lọc bỏ những ngày không có dữ liệu (accuracy = null)
                    // và giới hạn chỉ lấy 15 ngày cuối cùng
                    const filteredData = json
                        .filter(item => item.accuracy !== null)
                        .slice(-15);
                    setData(filteredData);
                }
            })
            .catch(err => console.error("Lỗi fetch dữ liệu AI:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
            <CircularProgress sx={{ color: "#a21a16" }} />
        </Box>
    );

    if (data.length === 0) return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">Không có dữ liệu 15 ngày qua</Typography>
        </Paper>
    );

    // Tính trung bình thực tế (chỉ tính những ngày có hoạt động > 0%)
    const activeDays = data.filter(item => item.accuracy > 0);
    const avgAccuracy = activeDays.length > 0
        ? Math.round(activeDays.reduce((a, b) => a + b.accuracy, 0) / activeDays.length)
        : 0;

    // Cấu hình kích thước biểu đồ
    const height = 320;
    const paddingX = 60;
    // Tự động dãn khoảng cách điểm dựa trên số lượng ngày (tối đa 15)
    const pointDistance = 80;
    const chartWidth = Math.max(900, data.length * pointDistance + paddingX);

    const points = data.map((item, idx) => ({
        x: idx * pointDistance + paddingX,
        y: height - (item.accuracy / 100 * (height - 120)) - 70,
        ...item
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - 70} L ${points[0].x} ${height - 70} Z`;

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #f0f0f0", bgcolor: "#fff" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a202c", fontSize: '1.25rem' }}>
                        Hiệu suất dự báo 15 ngày
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Độ chính xác dựa trên sai số giữa dự báo AI và đơn hàng thực tế
                    </Typography>
                </Box>
                <Box sx={{
                    px: 2, py: 1,
                    bgcolor: avgAccuracy > 80 ? "rgba(40, 167, 69, 0.1)" : "rgba(162, 26, 22, 0.1)",
                    borderRadius: "12px",
                    textAlign: 'center'
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: avgAccuracy > 80 ? "#28a745" : "#a21a16" }}>
                        {avgAccuracy}%
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>
                        Trung bình
                    </Typography>
                </Box>
            </Stack>

            <Box sx={{ width: '100%', overflowX: 'auto', pb: 2 }}>
                <svg width={chartWidth} height={height}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a21a16" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#a21a16" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 25, 50, 75, 100].map(v => {
                        const y = height - (v / 100 * (height - 120)) - 70;
                        return (
                            <g key={v}>
                                <line x1={paddingX} y1={y} x2={chartWidth} y2={y} stroke="#f7fafc" strokeWidth="2" />
                                <text x={paddingX - 45} y={y + 5} fontSize="12" fontWeight="600" fill="#a0aec0">{v}%</text>
                            </g>
                        );
                    })}

                    {/* Area & Line */}
                    <path d={areaD} fill="url(#lineGradient)" />
                    <path d={pathD} fill="none" stroke="#a21a16" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Points */}
                    {points.map((p, i) => (
                        <g key={i}>
                            <circle cx={p.x} cy={p.y} r="6" fill="#fff" stroke="#a21a16" strokeWidth="3" />

                            {/* Value Label */}
                            <text x={p.x} y={p.y - 20} textAnchor="middle" fontSize="12" fontWeight="800" fill="#2d3748">
                                {p.accuracy}%
                            </text>

                            {/* Date Label */}
                            <text x={p.x} y={height - 30} textAnchor="middle" fontSize="12" fontWeight="700" fill="#718096">
                                {p.time}
                            </text>
                        </g>
                    ))}
                </svg>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" sx={{ color: "#a0aec0", fontStyle: 'italic' }}>
                * Dữ liệu được làm mới dựa trên kết quả train model hàng ngày.
            </Typography>
        </Paper>
    );
};

export default AccuracyChart;