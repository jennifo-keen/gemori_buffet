import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import HistoryIcon from "@mui/icons-material/History";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
    CircularProgress,
} from "@mui/material";

const statusConfig = {
    running: { bg: "#dcfce7", dot: "#16a34a", text: "#166534", label: "Đang chạy" },
    upcoming: { bg: "#fef3c7", dot: "#d97706", text: "#92400e", label: "Sắp diễn ra" },
    ended: { bg: "#e7e5e4", dot: "#78716c", text: "#57534e", label: "Kết thúc" },
};

export const VoucherCampaignListSection = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- LOGIC FETCH DATA ---
    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/admin/vouchers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (result.success) {
                setVouchers(result.data);
            }
        } catch (error) {
            console.error("Lỗi khi dùng fetch lấy voucher:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const getVoucherStatus = (v) => {
        const now = dayjs();
        const start = dayjs(v.start_date);
        const end = dayjs(v.end_date);
        if (!v.is_active || now.isAfter(end) || v.quantity <= 0) return "ended";
        if (now.isBefore(start)) return "upcoming";
        return "running";
    };

    if (loading) return (
        <Stack alignItems="center" p={10}>
            <CircularProgress sx={{ color: "#8a0000" }} />
            <Typography sx={{ mt: 2, color: "#78716c" }}>Đang tải danh sách...</Typography>
        </Stack>
    );

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            {/* Header row */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontWeight: 800, color: "#230f0f", fontSize: "18px" }}>
                    Danh sách Voucher
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<FilterListIcon sx={{ fontSize: "14px !important" }} />} sx={filterBtnStyle}>
                        Lọc
                    </Button>
                    <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: "14px !important" }} />} sx={filterBtnStyle}>
                        Xuất dữ liệu
                    </Button>
                </Stack>
            </Stack>

            {/* Render List */}
            <Stack spacing={2}>
                {vouchers.map((v) => {
                    const statusKey = getVoucherStatus(v);
                    const cfg = statusConfig[statusKey];
                    const isEnded = statusKey === "ended";

                    return (
                        <Paper
                            key={v.id}
                            elevation={0}
                            sx={{
                                borderRadius: "12px",
                                border: "1px solid",
                                borderColor: isEnded ? "#e7e5e4" : "#8a00001a",
                                bgcolor: isEnded ? "#fafafa" : "white",
                                overflow: "hidden",
                                "&:hover": { boxShadow: "0px 2px 8px rgba(0,0,0,0.05)" }
                            }}
                        >
                            <Stack direction="row">
                                {/* Panel Trái */}
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        minWidth: 170,
                                        p: 3,
                                        bgcolor: isEnded ? "#f5f5f4" : "#8a00000d",
                                        borderRight: "1px dashed #8a000033",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 900, color: isEnded ? "#a8a29e" : "#8a0000", fontSize: "19px" }}>
                                        {v.code}
                                    </Typography>
                                    <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#a8a29e", mt: 0.5 }}>MÃ VOUCHER</Typography>
                                    <Box sx={{ mt: 2, px: 2, py: 0.5, bgcolor: "white", border: "1px solid #e7e5e4", borderRadius: "20px" }}>
                                        <Typography sx={{ fontWeight: 700, color: isEnded ? "#a8a29e" : "#8a0000", fontSize: "11px" }}>
                                            {isEnded ? "Hết hạn" : "Copy Code"}
                                        </Typography>
                                    </Box>
                                </Stack>

                                {/* Panel Phải */}
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3, flex: 1 }}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ fontWeight: 800, fontSize: "17px", color: isEnded ? "#78716c" : "#230f0f" }}>
                                            Giảm {v.discount_type === 'percentage' ? `${v.discount_value}%` : `${Number(v.discount_value).toLocaleString()}₫`} cho buffet
                                        </Typography>
                                        <Stack direction="row" spacing={3}>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <CalendarTodayOutlinedIcon sx={{ fontSize: "13px", color: "#78716c" }} />
                                                <Typography sx={{ fontSize: "12px", color: "#78716c" }}>
                                                    {dayjs(v.start_date).format("DD/MM/YYYY")} - {dayjs(v.end_date).format("DD/MM/YYYY")}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <ConfirmationNumberOutlinedIcon sx={{ fontSize: "14px", color: "#78716c" }} />
                                                <Typography sx={{ fontSize: "12px", color: "#78716c" }}>
                                                    Còn lại: <b>{v.quantity}</b>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px", px: 1.5, py: 0.5, bgcolor: cfg.bg, borderRadius: "20px" }}>
                                            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: cfg.dot }} />
                                            <Typography sx={{ fontWeight: 700, fontSize: "12px", color: cfg.text }}>{cfg.label}</Typography>
                                        </Box>
                                        <Stack direction="row">
                                            <IconButton size="small">{isEnded ? <HistoryIcon fontSize="small" /> : <EditOutlinedIcon fontSize="small" />}</IconButton>
                                            <IconButton size="small" sx={{ color: "#f44336" }}><DeleteOutlineIcon fontSize="small" /></IconButton>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Paper>
                    );
                })}
            </Stack>
        </Stack>
    );
};

const filterBtnStyle = {
    fontFamily: "'Be Vietnam Pro', sans-serif",
    fontWeight: 700,
    color: "#57534e",
    fontSize: "12px",
    textTransform: "none",
    borderRadius: "8px",
    borderColor: "#8a00001a",
};