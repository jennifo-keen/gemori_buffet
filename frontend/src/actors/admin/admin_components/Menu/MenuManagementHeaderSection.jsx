import React, { useState } from "react";
import {
    Stack, Typography, Button, Box,
    Modal, TextField, IconButton, Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const MenuManagementHeaderSection = ({ onRefresh }) => {
    // 1. Quản lý trạng thái đóng/mở Modal
    const [open, setOpen] = useState(false);

    // 2. Quản lý dữ liệu Form
    const [formData, setFormData] = useState({ name: "", category: "" });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPreview(null);
        setImage(null);
        setFormData({ name: "", category: "" });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.category || !image) {
            alert("Vui lòng điền đủ thông tin!");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("image", image); // Tên 'image' phải khớp với uploadMenus.single('image')

        try {
            // CHÚ Ý: Sửa port 3000 thành 5000 (hoặc port của BE cậu đang chạy)
            const response = await fetch("http://localhost:3000/api/admin/menus/add", {
                method: "POST",
                body: data, // Để body là data, KHÔNG thêm Headers Content-Type nhé!
            });

            const result = await response.json();
            console.log("Kết quả từ Server:", result); // Xem image_url trả về có null không

            if (result.success) {
                alert("Thêm thành công!");
                if (onRefresh) onRefresh();
                handleClose();
            }
        } catch (error) {
            console.error("Lỗi khi fetch:", error);
        }
    };

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%", mb: 3 }}>
            {/* PHẦN TEXT TIÊU ĐỀ */}
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", fontSize: "24px" }}>
                    Quản lý thực đơn
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Cập nhật thông tin và trạng thái phục vụ của các món ăn
                </Typography>
            </Box>

            {/* NÚT BẤM MỞ MODAL */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{
                    backgroundColor: "#b14135",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#8a332a" },
                }}
            >
                Thêm món mới
            </Button>

            {/* MODAL THÊM MÓN (VIẾT TRỰC TIẾP TẠI ĐÂY) */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 450 },
                    bgcolor: 'white', borderRadius: '16px', boxShadow: 24, p: 4
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={700}>Thêm món ăn mới</Typography>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={2}>
                        <TextField
                            label="Tên món"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            label="Danh mục"
                            fullWidth
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />

                        {/* Khu vực chọn ảnh */}
                        <Box sx={{ border: '2px dashed #eee', borderRadius: '8px', p: 2, textAlign: 'center', bgcolor: '#fafafa' }}>
                            {preview ? (
                                <Box component="img" src={preview} sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '8px', mb: 1 }} />
                            ) : (
                                <CloudUploadIcon sx={{ fontSize: 40, color: '#ccc', mb: 1 }} />
                            )}
                            <Button variant="text" component="label" fullWidth sx={{ textTransform: 'none' }}>
                                {preview ? "Chọn ảnh khác" : "Tải ảnh món ăn"}
                                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                            </Button>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                            sx={{ bgcolor: "#b14135", height: '48px', fontWeight: 600, mt: 2, "&:hover": { bgcolor: "#8a332a" } }}
                        >
                            Xác nhận thêm món
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Stack>
    );
};