import React, { useState, useMemo } from "react";
import {
    Box, IconButton, Paper, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField, Grid, Checkbox, FormControlLabel, Avatar
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const BuffetPackageListSection = ({ tickets = [], setTickets, loading, allMenus = [] }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedMenuIds, setSelectedMenuIds] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // 1. Nhóm món ăn theo Category (Dùng để hiển thị trong Modal)
    const menusByCategory = useMemo(() => {
        if (!Array.isArray(allMenus) || allMenus.length === 0) return {};

        return allMenus.reduce((acc, menu) => {
            const cat = menu.category || "Khác";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(menu);
            return acc;
        }, {});
    }, [allMenus]);

    // 2. Mở Modal Chỉnh sửa & Xử lý bóc tách menu
    const handleOpenEdit = (ticket) => {
        setSelectedTicket({ ...ticket });

        // Chuyển mảng object [{id, name}, ...] từ BE thành mảng ID [id1, id2, ...]
        const currentIds = Array.isArray(ticket.menus)
            ? ticket.menus.map(m => m.id)
            : [];

        setSelectedMenuIds(currentIds);
        setPreviewImg(ticket.image_url);
        setImageFile(null); // Reset file upload
        setOpenEdit(true);
    };

    const handleToggleMenu = (menuId) => {
        setSelectedMenuIds(prev =>
            prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
        );
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("name", selectedTicket.name);
            formData.append("price", selectedTicket.price);
            formData.append("description", selectedTicket.description);

            // Gửi mảng ID món ăn lên BE
            selectedMenuIds.forEach(id => formData.append("menu_ids[]", id));

            if (imageFile) formData.append("image", imageFile);

            const response = await fetch(`http://localhost:3000/api/admin/tickets/${selectedTicket.id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                alert("Cập nhật gói vé thành công!");
                setOpenEdit(false);
                // Reload hoặc fetch lại data để cập nhật bảng
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert("Lỗi: " + errorData.message);
            }
        } catch (error) {
            console.error("🔥 Lỗi cập nhật:", error);
        }
    };

    const handleToggleStatus = async (id, currentStatus, index) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/tickets/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_active: !currentStatus }),
            });
            if (response.ok) {
                const updatedTicket = await response.json();
                const newTickets = [...tickets];
                newTickets[index] = { ...newTickets[index], is_active: updatedTicket.is_active };
                setTickets(newTickets);
            }
        } catch (error) {
            console.error("🔥 Lỗi trạng thái:", error);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Xóa vĩnh viễn gói vé "${name}"?`)) return;
        try {
            const response = await fetch(`http://localhost:3000/api/admin/tickets/${id}`, { method: "DELETE" });
            if (response.ok) {
                setTickets(prev => prev.filter(t => t.id !== id));
            } else {
                const err = await response.json();
                alert(err.message || "Không thể xóa vé này!");
            }
        } catch (error) {
            console.error("🔥 Lỗi xóa:", error);
        }
    };

    if (loading) {
        return (
            <Stack alignItems="center" py={5}>
                <CircularProgress sx={{ color: "#a21a16" }} />
            </Stack>
        );
    }

    return (
        <>
            <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid rgba(138, 0, 0, 0.1)", overflow: "hidden" }}>
                <Box sx={{ px: 3, py: 2, backgroundColor: "rgba(162, 26, 22, 0.05)" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#230f0f" }}>Danh sách gói buffet</Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#fff7f3" }}>
                                {["MÃ", "ẢNH", "TÊN GÓI", "GIÁ (VND)", "TRẠNG THÁI", "HÀNH ĐỘNG"].map((label) => (
                                    <TableCell key={label} align="center" sx={{ fontWeight: 700, fontSize: "12px", color: "#6c0d0a", opacity: 0.7 }}>{label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets?.map((pkg, index) => (
                                <TableRow key={pkg.id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.01)" } }}>
                                    <TableCell align="center" sx={{ fontWeight: 700 }}>{pkg.id.slice(0, 5)}...</TableCell>
                                    <TableCell align="center">
                                        <Avatar src={pkg.image_url} variant="rounded" sx={{ width: 50, height: 40, margin: "0 auto", border: "1px solid #eee" }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 700 }}>{pkg.name}</TableCell>
                                    <TableCell align="center" sx={{ color: "#a21a16", fontWeight: 700 }}>
                                        {new Intl.NumberFormat("vi-VN").format(pkg.price)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ cursor: "pointer" }} onClick={() => handleToggleStatus(pkg.id, pkg.is_active, index)}>
                                            <Box sx={{ width: 32, height: 16, bgcolor: pkg.is_active ? "#a21a16" : "#ccc", borderRadius: 10, position: "relative" }}>
                                                <Box sx={{ width: 12, height: 12, bgcolor: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: pkg.is_active ? 18 : 2, transition: "0.2s" }} />
                                            </Box>
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{pkg.is_active ? "Đang bán" : "Tạm ngưng"}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" sx={{ color: "#b48c1e" }} onClick={() => handleOpenEdit(pkg)}><EditOutlinedIcon /></IconButton>
                                        <IconButton size="small" sx={{ color: "#455565" }} onClick={() => handleDelete(pkg.id, pkg.name)}><DeleteOutlinedIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="md">
                <DialogTitle sx={{ fontWeight: 800, color: "#a21a16" }}>Cập nhật Gói vé & Menu</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={5}>
                            <Stack spacing={2.5}>
                                <Box sx={{ textAlign: "center" }}>
                                    <img src={previewImg || "https://via.placeholder.com/150"} alt="preview" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }} />
                                    <Button variant="outlined" component="label" size="small" fullWidth sx={{ mt: 1, color: "#a21a16", borderColor: "#a21a16" }}>
                                        Thay đổi ảnh vé
                                        <input type="file" hidden accept="image/*" onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) { setImageFile(file); setPreviewImg(URL.createObjectURL(file)); }
                                        }} />
                                    </Button>
                                </Box>
                                <TextField label="Tên gói vé" fullWidth variant="standard" value={selectedTicket?.name || ""} onChange={(e) => setSelectedTicket({ ...selectedTicket, name: e.target.value })} />
                                <TextField label="Giá (VND)" type="number" fullWidth variant="standard" value={selectedTicket?.price || ""} onChange={(e) => setSelectedTicket({ ...selectedTicket, price: e.target.value })} />
                                <TextField label="Mô tả" multiline rows={3} fullWidth variant="outlined" value={selectedTicket?.description || ""} onChange={(e) => setSelectedTicket({ ...selectedTicket, description: e.target.value })} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Typography sx={{ fontWeight: 700, mb: 2, color: "#555" }}>Thực đơn áp dụng (Tick để chọn)</Typography>
                            <Box sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
                                {Object.keys(menusByCategory).length > 0 ? (
                                    Object.keys(menusByCategory).map((cat) => (
                                        <Box key={cat} sx={{ mb: 3 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: "#a21a16", textTransform: "uppercase", bgcolor: "rgba(162, 26, 22, 0.05)", px: 1, py: 0.5, borderRadius: 1 }}>
                                                {cat}
                                            </Typography>
                                            <Grid container spacing={1} sx={{ mt: 0.5 }}>
                                                {menusByCategory[cat].map((menu) => (
                                                    <Grid item xs={6} key={menu.id}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    size="small"
                                                                    checked={selectedMenuIds.includes(menu.id)}
                                                                    onChange={() => handleToggleMenu(menu.id)}
                                                                    sx={{ color: "#a21a16", '&.Mui-checked': { color: "#a21a16" } }}
                                                                />
                                                            }
                                                            label={<Typography sx={{ fontSize: "13px" }}>{menu.name}</Typography>}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>Không tìm thấy danh sách món ăn.</Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpenEdit(false)} color="inherit">Hủy bỏ</Button>
                    <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: "#a21a16", "&:hover": { bgcolor: "#8a1612" }, px: 4 }}>Lưu thay đổi</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};