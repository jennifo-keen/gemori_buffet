import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Grid
} from "@mui/material";

const statusConfig = {
    running: { bg: "#dcfce7", dot: "#16a34a", text: "#166534", label: "Đang chạy" },
    upcoming: { bg: "#fef3c7", dot: "#d97706", text: "#92400e", label: "Sắp diễn ra" },
    ended: { bg: "#e7e5e4", dot: "#78716c", text: "#57534e", label: "Kết thúc" },
};

export const VoucherCampaignListSection = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State cho việc chỉnh sửa
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/vouchers`);
            const result = await response.json();
            if (result.success) setVouchers(result.data);
        } catch (error) {
            console.error("Lỗi fetch voucher:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    // Mở modal sửa
    const handleEditClick = (voucher) => {
        setSelectedVoucher({
            ...voucher,
            start_date: dayjs(voucher.start_date).format("YYYY-MM-DD"),
            end_date: dayjs(voucher.end_date).format("YYYY-MM-DD")
        });
        setOpenEdit(true);
    };

    // Xử lý thay đổi input trong modal
    const handleInputChange = (e) => {
        setSelectedVoucher({ ...selectedVoucher, [e.target.name]: e.target.value });
    };

    // Gửi yêu cầu cập nhật lên Server
    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/vouchers/${selectedVoucher.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedVoucher)
            });
            const result = await response.json();
            if (result.success) {
                setOpenEdit(false);
                fetchVouchers(); // Reload danh sách
            }
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
        } finally {
            setIsUpdating(false);
        }
    };

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
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontWeight: 800, color: "#230f0f", fontSize: "18px" }}>
                    Danh sách Voucher
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<FilterListIcon sx={{ fontSize: "14px !important" }} />} sx={filterBtnStyle}>Lọc</Button>
                    <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: "14px !important" }} />} sx={filterBtnStyle}>Xuất dữ liệu</Button>
                </Stack>
            </Stack>

            <Stack spacing={2}>
                {vouchers.map((v) => {
                    const statusKey = getVoucherStatus(v);
                    const cfg = statusConfig[statusKey];
                    const isEnded = statusKey === "ended";

                    return (
                        <Paper key={v.id} elevation={0} sx={{ 
                            borderRadius: "12px", border: "1px solid", 
                            borderColor: isEnded ? "#e7e5e4" : "#8a00001a",
                            bgcolor: isEnded ? "#fafafa" : "white", overflow: "hidden",
                            "&:hover": { boxShadow: "0px 2px 8px rgba(0,0,0,0.05)" }
                        }}>
                            <Stack direction="row">
                                <Stack alignItems="center" justifyContent="center" sx={{ 
                                    minWidth: 170, p: 3, bgcolor: isEnded ? "#f5f5f4" : "#8a00000d", 
                                    borderRight: "1px dashed #8a000033" 
                                }}>
                                    <Typography sx={{ fontWeight: 900, color: isEnded ? "#a8a29e" : "#8a0000", fontSize: "19px" }}>{v.code}</Typography>
                                    <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#a8a29e", mt: 0.5 }}>MÃ VOUCHER</Typography>
                                </Stack>

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
                                                <Typography sx={{ fontSize: "12px", color: "#78716c" }}>Còn lại: <b>{v.quantity}</b></Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px", px: 1.5, py: 0.5, bgcolor: cfg.bg, borderRadius: "20px" }}>
                                            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: cfg.dot }} />
                                            <Typography sx={{ fontWeight: 700, fontSize: "12px", color: cfg.text }}>{cfg.label}</Typography>
                                        </Box>
                                        {/* Nút sửa */}
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleEditClick(v)}
                                            sx={{ color: "#8a0000", bgcolor: "#8a00000a", "&:hover": { bgcolor: "#8a00001a" } }}
                                        >
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Paper>
                    );
                })}
            </Stack>

            {/* MODAL CHỈNH SỬA VOUCHER */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 800, color: "#8a0000" }}>Cập nhật thông tin Voucher</DialogTitle>
                <DialogContent dividers>
                    {selectedVoucher && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Mã Voucher" name="code" value={selectedVoucher.code} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField select fullWidth label="Loại giảm giá" name="discount_type" value={selectedVoucher.discount_type} onChange={handleInputChange}>
                                    <MenuItem value="percentage">Phần trăm (%)</MenuItem>
                                    <MenuItem value="fixed">Số tiền cố định (VNĐ)</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Giá trị giảm" name="discount_value" type="number" value={selectedVoucher.discount_value} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Số lượng còn lại" name="quantity" type="number" value={selectedVoucher.quantity} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Ngày bắt đầu" name="start_date" type="date" InputLabelProps={{ shrink: true }} value={selectedVoucher.start_date} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Ngày kết thúc" name="end_date" type="date" InputLabelProps={{ shrink: true }} value={selectedVoucher.end_date} onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenEdit(false)} sx={{ color: "#78716c" }}>Đóng</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        sx={{ bgcolor: "#8a0000", "&:hover": { bgcolor: "#6a0000" } }}
                    >
                        {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogActions>
            </Dialog>
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