import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Thêm icon cho đẹp
import { Button, Stack, Typography, Modal, Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { useState } from "react";

// Style cho Modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
    outline: 'none'
};

export const BuffetManagementHeaderSection = ({ onTicketAdded }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // State cho form text
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });

    // State cho File ảnh
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý khi người dùng chọn file ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Tạo link tạm để hiển thị ảnh preview
        }
    };

    const handleSubmit = async () => {
        console.log("🚀 Nút Lưu đã bấm!");
        if (!formData.name || !formData.price) {
            alert("Vui lòng nhập tên và giá vé!");
            return;
        }

        try {
            setLoading(true);
            // QUAN TRỌNG: Dùng FormData để gửi file thay vì JSON
            const data = new FormData();
            if (selectedFile) {
                // Key "image" phải khớp với uploadTickets.single('image') ở Backend
                data.append("image", selectedFile);
            }
            data.append("name", formData.name);
            data.append("price", formData.price);
            data.append("description", formData.description);


            const response = await fetch("http://localhost:3000/api/admin/tickets/create_ticket", {
                method: "POST",
                body: data
            });
            console.log("📩 Phản hồi từ Server:", response.status);
            if (response.ok) {
                // Reset form và ảnh
                setFormData({ name: '', price: '', description: '' });
                setSelectedFile(null);
                setPreviewUrl(null);
                setOpenModal(false);

                if (onTicketAdded) onTicketAdded(); // Reload danh sách ở trang cha
                alert("Thêm vé mới và tải ảnh lên thành công!");
            } else {
                const errorData = await response.json();
                alert("Lỗi: " + (errorData.message || "Không thể thêm vé"));
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            alert("Không thể kết nối đến server m ơi!");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                <Stack spacing={0.5} maxWidth={404}>
                    <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 700, lineHeight: "32px", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                        Quản lý vé Buffet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                        Điều chỉnh danh mục gói buffet và quản lý giá bán hệ thống
                    </Typography>
                </Stack>

                <Button
                    variant="contained"
                    startIcon={<AddIcon sx={{ fontSize: "12px !important" }} />}
                    onClick={() => setOpenModal(true)}
                    sx={{
                        backgroundColor: "#6c0d0a",
                        borderRadius: "8px",
                        px: 3,
                        py: 1.25,
                        fontSize: "16px",
                        fontWeight: 700,
                        textTransform: "none",
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                        "&:hover": { backgroundColor: "#5a0a08" },
                    }}
                >
                    Thêm vé mới
                </Button>
            </Stack>

            <Modal open={openModal} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#6c0d0a", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                            Thêm Gói Vé Buffet Mới
                        </Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon sx={{ color: "text.secondary" }} />
                        </IconButton>
                    </Stack>

                    <Stack spacing={2.5}>
                        <TextField label="Tên gói Buffet" name="name" value={formData.name} onChange={handleInputChange} fullWidth size="small" required />
                        <TextField label="Giá bán (VND)" name="price" type="number" value={formData.price} onChange={handleInputChange} fullWidth size="small" required />
                        <TextField label="Mô tả ngắn" name="description" value={formData.description} onChange={handleInputChange} fullWidth size="small" multiline rows={2} />

                        {/* PHẦN CHỌN ẢNH */}
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, color: "#6c0d0a", fontFamily: '"Be Vietnam Pro"' }}>
                                Hình ảnh gói vé
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        color: "#6c0d0a",
                                        borderColor: "#6c0d0a",
                                        textTransform: "none",
                                        "&:hover": { borderColor: "#5a0a08", bgcolor: "rgba(108, 13, 10, 0.04)" }
                                    }}
                                >
                                    Chọn ảnh
                                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                                </Button>

                                {previewUrl && (
                                    <Box
                                        component="img"
                                        src={previewUrl}
                                        sx={{ width: 56, height: 56, borderRadius: "8px", objectFit: "cover", border: "1px solid #ddd" }}
                                    />
                                )}
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                        <Button variant="outlined" onClick={handleClose} sx={{ borderRadius: "8px", textTransform: "none", color: "text.secondary" }}>
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                bgcolor: "#6c0d0a",
                                minWidth: 120,
                                "&:hover": { bgcolor: "#5a0a08" }
                            }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Lưu vé mới"}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};