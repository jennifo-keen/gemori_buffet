import React, { useState } from "react";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import {
    Box, Button, Stack, Typography, Modal, TextField,
    MenuItem, Select, FormControl, InputLabel
} from "@mui/material";

const styleModal = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 450, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4,
};

const UserManagementHeaderSection = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '',
        role: 'customer', username: '', dob: '', gender: 'Other'
    });

    const handleAddUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                alert("Thêm thành công!");
                setOpen(false);
                window.location.reload();
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (error) {
            console.error("Lỗi thêm user:", error);
        }
    };

    return (
        <Box component="section" sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 900 }}>QUẢN LÝ NGƯỜI DÙNG</Typography>
                <Button
                    variant="contained"
                    startIcon={<PersonAddAlt1OutlinedIcon />}
                    onClick={() => setOpen(true)}
                    sx={{ borderRadius: 2, px: 4, bgcolor: '#8A0000', '&:hover': { bgcolor: '#660000' } }}
                >
                    THÊM NGƯỜI DÙNG MỚI
                </Button>
            </Stack>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={styleModal}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: '#8A0000' }}>TẠO TÀI KHOẢN MỚI</Typography>
                    <Stack spacing={2}>
                        {/* Chọn Role trước để hiện Field tương ứng */}
                        <FormControl fullWidth>
                            <InputLabel>Vai trò</InputLabel>
                            <Select
                                value={formData.role}
                                label="Vai trò"
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <MenuItem value="customer">Khách hàng</MenuItem>
                                <MenuItem value="staff">Nhân viên</MenuItem>
                                <MenuItem value="kitchen">Bếp</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField label="Họ và tên" fullWidth onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                        {/* Nếu không phải khách hàng thì bắt nhập Username */}
                        {formData.role !== 'customer' && (
                            <TextField label="Tên đăng nhập (Username)" fullWidth required onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        )}

                        <TextField label="Email" fullWidth onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <TextField label="Số điện thoại" fullWidth onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        <TextField label="Mật khẩu" type="password" fullWidth onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                        {/* Nếu là khách hàng thì hiện thêm Ngày sinh & Giới tính */}
                        {formData.role === 'customer' && (
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Ngày sinh" type="date" fullWidth InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Giới tính</InputLabel>
                                    <Select
                                        value={formData.gender} label="Giới tính"
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <MenuItem value="Male">Nam</MenuItem>
                                        <MenuItem value="Female">Nữ</MenuItem>
                                        <MenuItem value="Other">Khác</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        )}

                        <Button variant="contained" fullWidth onClick={handleAddUser} sx={{ bgcolor: '#8A0000', py: 1.5, fontWeight: 700 }}>
                            XÁC NHẬN THÊM
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserManagementHeaderSection;