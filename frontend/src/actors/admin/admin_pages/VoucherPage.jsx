import React, { useState } from "react";
import {
    Box, Stack, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button, MenuItem, Grid
} from "@mui/material";
import { CampaignManagementHeaderSection } from "../admin_components/Voucher/CampaignManagementHeaderSection";
import { VoucherCampaignListSection } from "../admin_components/Voucher/VoucherCampaignListSection";

const VoucherPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0); // Dùng để load lại danh sách sau khi tạo

    // Form State
    const [formData, setFormData] = useState({
        code: "",
        discount_type: "percentage",
        discount_value: "",
        quantity: "",
        start_date: "",
        end_date: "",
        is_active: true
    });

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
        setFormData({ code: "", discount_type: "percentage", discount_value: "", quantity: "", start_date: "", end_date: "", is_active: true });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/vouchers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                setRefreshKey(prev => prev + 1); // Cập nhật danh sách
                handleClose();
            }
        } catch (error) {
            console.error("Lỗi tạo voucher:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: "xl", width: "100%" }} mx="auto">
            <Stack direction="column" spacing={4} p={4}>
                <CampaignManagementHeaderSection onAddClick={handleOpen} />

                {/* Truyền refreshKey vào để list tự cập nhật khi key thay đổi */}
                <VoucherCampaignListSection key={refreshKey} />
            </Stack>

            {/* MODAL TẠO VOUCHER MỚI */}
            <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 800, color: "#8a0000" }}>Tạo chiến dịch ưu đãi mới</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Mã Voucher" name="code" value={formData.code} onChange={handleChange} placeholder="Ví dụ: GEMORI2026" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Loại giảm giá" name="discount_type" value={formData.discount_type} onChange={handleChange}>
                                <MenuItem value="percentage">Phần trăm (%)</MenuItem>
                                <MenuItem value="fixed">Số tiền cố định (VNĐ)</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Giá trị giảm" name="discount_value" type="number" value={formData.discount_value} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Số lượng" name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Ngày bắt đầu" name="start_date" type="date" InputLabelProps={{ shrink: true }} value={formData.start_date} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Ngày kết thúc" name="end_date" type="date" InputLabelProps={{ shrink: true }} value={formData.end_date} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose} sx={{ color: "#78716c" }}>Hủy bỏ</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ bgcolor: "#8a0000", "&:hover": { bgcolor: "#6a0000" } }}
                    >
                        {loading ? "Đang xử lý..." : "Xác nhận tạo"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VoucherPage;