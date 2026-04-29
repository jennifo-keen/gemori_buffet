import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, Stack, MenuItem, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 450 },
    bgcolor: '#FFF7F3', // Màu nền yêu cầu
    boxShadow: '0px 20px 40px rgba(0,0,0,0.1)',
    p: 4,
    borderRadius: '24px', // Bo góc lớn cho hiện đại
    border: '1px solid #F1E4DE',
    outline: 'none'
};

const EditDishModal = ({ open, item, onClose, onSuccess, categories }) => {
    const [formData, setFormData] = useState({ name: "", category: "" });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Màu chủ đạo của cậu
    const MAIN_RED = "#A21A16";
    const SECONDARY_YELLOW = "#EAB308";

    useEffect(() => {
        if (item) {
            setFormData({ name: item.name, category: item.category });
            setFile(null); // Reset file khi đổi món
        }
    }, [item, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("category", formData.category);
            if (file) data.append("image", file);

            const res = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/menus/${item.id}`, {
                method: "PUT",
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                onSuccess();
                onClose();
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (err) {
            console.error("Lỗi update:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Box sx={style}>
                {/* Nút đóng góc phải */}
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 16, top: 16, color: '#999' }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" sx={{ fontWeight: 800, color: MAIN_RED, mb: 1, textAlign: 'center' }}>
                    Chỉnh Sửa Món Ăn
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 4, textAlign: 'center' }}>
                    Cập nhật thông tin để món ăn luôn hấp dẫn thực khách
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Tên món ăn"
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: 'white' } }}
                        />

                        <TextField
                            select
                            label="Danh mục"
                            fullWidth
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: 'white' } }}
                        >
                            {categories.filter(c => c !== 'all').map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </TextField>

                        {/* Khu vực Upload ảnh */}
                        <Button
                            variant="dashed"
                            component="label"
                            fullWidth
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                py: 2,
                                border: `2px dashed ${SECONDARY_YELLOW}`,
                                borderRadius: '12px',
                                color: '#854d0e',
                                bgcolor: 'rgba(234, 179, 8, 0.05)',
                                '&:hover': { bgcolor: 'rgba(234, 179, 8, 0.1)', border: `2px dashed ${SECONDARY_YELLOW}` }
                            }}
                        >
                            {file ? "Đã chọn ảnh mới" : "Thay đổi hình ảnh món ăn"}
                            <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                        </Button>

                        {file && (
                            <Typography variant="caption" sx={{ mt: -2, display: 'block', color: SECONDARY_YELLOW, fontWeight: 600 }}>
                                📁 {file.name}
                            </Typography>
                        )}

                        <Stack direction="row" spacing={2} pt={2}>
                            <Button
                                onClick={onClose}
                                fullWidth
                                sx={{
                                    borderRadius: '12px',
                                    color: '#666',
                                    fontWeight: 600,
                                    textTransform: 'none'
                                }}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    borderRadius: '12px',
                                    bgcolor: MAIN_RED,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    boxShadow: `0 4px 14px rgba(162, 26, 22, 0.4)`,
                                    '&:hover': { bgcolor: '#8b1612' }
                                }}
                            >
                                {loading ? "Đang xử lý..." : "Lưu thay đổi"}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default EditDishModal;