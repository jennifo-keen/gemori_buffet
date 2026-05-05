import { useEffect, useState, useCallback } from "react";
import {
    Box, Card, Chip, IconButton, Stack,
    Switch, Tab, Tabs, Typography, Skeleton,
    Modal, TextField, Button, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { styled } from '@mui/material/styles';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const styleModal = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 450, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 24, p: 4,
};

const ROLE_CONFIG = {
    customer: { label: "KHÁCH HÀNG", bgColor: "#F1F5F9", textColor: "#475569" },
    staff: { label: "STAFF", bgColor: "#FFEED1", textColor: "#906800" },
    kitchen: { label: "KITCHEN", bgColor: "#FFE9E0", textColor: "#914F3B" },
    admin: { label: "ADMIN", bgColor: "#FFF7F3", textColor: "#A21A16" }
};

const AntSwitch = styled(Switch)(() => ({
    width: 48, height: 24, padding: 0, display: 'flex',
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(24px)', color: '#fff',
            '& + .MuiSwitch-track': { opacity: 1, backgroundColor: '#8A0000' },
        },
    },
    '& .MuiSwitch-thumb': { width: 20, height: 20, borderRadius: 10, boxShadow: 'none' },
    '& .MuiSwitch-track': { borderRadius: 12, opacity: 1, backgroundColor: '#cbd5e1' },
}));

const TABS = ["customer", "staff", "kitchen", "admin"];
const TAB_LABELS = ["Khách hàng (User)", "Nhân viên (Staff)", "Bếp (Kitchen)", "Admin"];

export const UserDirectoryTableSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: '', name: '', email: '', phone: '', role: '',
        password: '', username: '', dob: '', gender: '', address: ''
    });

    const gridTemplate = "minmax(250px, 2fr) 150px 250px 150px 120px 120px";

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/users?tab=${TABS[activeTab]}`);
            const result = await response.json();
            if (result.success) setRows(result.data);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    const handleOpenEdit = (user) => {
        setEditFormData({
            id: user.id,
            name: user.full_name || user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            password: '',
            username: user.username || '',
            dob: user.birthday ? user.birthday.split('T')[0] : '',
            gender: user.gender || 'Other',
            address: user.address || ''
        });
        setOpenEdit(true);
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/users/${editFormData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFormData)
            });
            const result = await response.json();
            if (result.success) {
                alert("Cập nhật thành công!");
                setOpenEdit(false);
                fetchData();
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (error) {
            console.error("Lỗi update:", error);
        }
    };

    const handleToggleStatus = async (userId, userRole, currentStatus) => {
        const nextActiveState = String(currentStatus).toLowerCase() !== 'active';
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: userRole, active: nextActiveState })
            });
            const result = await response.json();
            if (result.success) {
                setRows(prev => prev.map(r => r.id === userId ? { ...r, status: nextActiveState ? 'active' : 'inactive' } : r));
            }
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    const handleDelete = async (userId, userRole) => {
        if (!window.confirm("M có chắc chắn muốn xóa không?")) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/users/${userId}?role=${userRole}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.success) {
                alert("Xóa thành công!");
                fetchData();
            }
        } catch (error) {
            console.error("Lỗi xóa:", error);
        }
    };

    useEffect(() => { fetchData(); }, [fetchData]);

    return (
        <Card sx={{ borderRadius: 4, m: 2, overflow: 'hidden' }}>
            <Box sx={{ px: 4, pt: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                    {TAB_LABELS.map((label, i) => (
                        <Tab key={i} label={label} sx={{ textTransform: 'none', fontWeight: 700 }} />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ minWidth: 1000 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: gridTemplate, bgcolor: "#FDF4F4", py: 2, px: 3 }}>
                    {["NGƯỜI DÙNG", "VAI TRÒ", "LIÊN HỆ", "NGÀY GIA NHẬP", "TRẠNG THÁI", "HÀNH ĐỘNG"].map((h, i) => (
                        <Typography key={i} variant="caption" sx={{ fontWeight: 800, color: "#8A0000", textAlign: i === 0 ? "left" : "center" }}>{h}</Typography>
                    ))}
                </Box>

                <Stack sx={{ minHeight: 450 }}>
                    {loading ? <Skeleton variant="rectangular" height={400} sx={{ m: 2 }} /> : rows.map((row) => (
                        <Box key={row.id} sx={{ display: "grid", gridTemplateColumns: gridTemplate, alignItems: "center", px: 3, py: 2, borderBottom: '1px solid #f1f5f9' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{row.full_name || row.name}</Typography>
                                <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>ID: {row.id.slice(0, 8)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Chip label={ROLE_CONFIG[row.role]?.label} sx={{ bgcolor: ROLE_CONFIG[row.role]?.bgColor, color: ROLE_CONFIG[row.role]?.textColor, fontWeight: 800, fontSize: 11 }} />
                            </Box>
                            <Box sx={{ px: 2 }}>
                                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{row.email}</Typography>
                                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{row.phone || "---"}</Typography>
                            </Box>
                            <Typography sx={{ textAlign: 'center', fontSize: 13 }}>{new Date(row.created_at).toLocaleDateString('vi-VN')}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <AntSwitch checked={row.status === 'active'} onChange={() => handleToggleStatus(row.id, row.role, row.status)} />
                            </Box>
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <IconButton size="small" onClick={() => handleOpenEdit(row)}><EditOutlinedIcon fontSize="small" /></IconButton>
                                <IconButton size="small" sx={{ color: '#8A0000' }} onClick={() => handleDelete(row.id, row.role)}><DeleteOutlineOutlinedIcon fontSize="small" /></IconButton>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <Box sx={styleModal}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 800, color: '#8A0000', textAlign: 'center' }}>SỬA THÔNG TIN</Typography>
                    <Stack spacing={2}>
                        <TextField label="Họ và tên" fullWidth value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} />
                        {editFormData.role !== 'customer' && (
                            <TextField label="Username" fullWidth value={editFormData.username} onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })} />
                        )}
                        <TextField label="Email" fullWidth value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} />
                        <TextField label="Số điện thoại" fullWidth value={editFormData.phone} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} />

                        {editFormData.role === 'customer' && (
                            <>
                                <Stack direction="row" spacing={2}>
                                    <TextField label="Ngày sinh" type="date" fullWidth InputLabelProps={{ shrink: true }} value={editFormData.dob} onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })} />
                                    <FormControl fullWidth>
                                        <InputLabel>Giới tính</InputLabel>
                                        <Select value={editFormData.gender} label="Giới tính" onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}>
                                            <MenuItem value="Male">Nam</MenuItem>
                                            <MenuItem value="Female">Nữ</MenuItem>
                                            <MenuItem value="Other">Khác</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <TextField label="Địa chỉ" fullWidth multiline rows={2} value={editFormData.address} onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })} />
                            </>
                        )}

                        <TextField label="Mật khẩu mới (Để trống nếu không đổi)" type="password" fullWidth onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })} />
                        <Button variant="contained" fullWidth onClick={handleUpdateUser} sx={{ bgcolor: '#8A0000', py: 1.5 }}>LƯU THAY ĐỔI</Button>
                    </Stack>
                </Box>
            </Modal>
        </Card>
    );
};