import { useEffect, useState, useCallback } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import PerformanceSummarySection from "../admin_components/Dashboard/PerformanceSummarySection";
import OperationsOverviewSection from "../admin_components/Dashboard/OperationsOverviewSection";

const AdminHome = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dùng useCallback để hàm không bị tạo lại mỗi lần component re-render
    const fetchDashboardData = useCallback(async (date = "") => {
        try {
            setLoading(true);
            const url = date
                ? `http://localhost:3000/api/admin/dashboard?date=${date}`
                : "http://localhost:3000/api/admin/dashboard";

            const res = await fetch(url);
            if (!res.ok) throw new Error("Không thể lấy dữ liệu từ server");

            const json = await res.json();
            setData(json.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Dashboard Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Trạng thái đang tải
    if (loading && !data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    // Trạng thái lỗi
    if (error) {
        return (
            <Box p={3}>
                <Typography color="error">Lỗi: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            {/* Thêm điều kiện check data && để tránh lỗi crash component con */}
            {data && (
                <>
                    <PerformanceSummarySection stats={data} />

                    <Box mt={4}>
                        <OperationsOverviewSection
                            data={data}
                            onChangeDate={fetchDashboardData}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default AdminHome;