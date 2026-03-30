import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import RevenueBarChart from './RevenueBarChart';
import MonthPicker from './MonthPicker'; // Import file vừa tạo ở trên

export const DailyRevenueChartSection = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [loading, setLoading] = useState(true);

    const fetchRevenue = async (month) => {
        try {
            setLoading(true);
            const url = `http://localhost:3000/api/admin/report/revenue?month=${month}&year=2026`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setRevenueData(result.data || []);
            }
        } catch (err) {
            console.error("Lỗi:", err.message);
            setRevenueData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenue(selectedMonth);
    }, [selectedMonth]);

    return (
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Doanh thu theo ngày</Typography>
                    <Typography variant="caption" color="text.secondary">Đơn vị: Triệu VNĐ</Typography>
                </Box>

                {/* Dùng Component tách rời ở đây */}
                <MonthPicker
                    selectedMonth={selectedMonth}
                    onChange={setSelectedMonth}
                />
            </Box>

            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <CircularProgress sx={{ color: '#6C0D0A' }} />
                ) : revenueData.length > 0 ? (
                    <RevenueBarChart data={revenueData} />
                ) : (
                    <Typography color="text.secondary">Không có dữ liệu tháng này.</Typography>
                )}
            </Box>
        </Box>
    );
};