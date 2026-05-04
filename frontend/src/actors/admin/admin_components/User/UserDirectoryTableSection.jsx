import { useEffect, useState, useCallback } from "react";
import {
    Box, Card, Chip, IconButton, Stack,
    Switch, Tab, Tabs, Typography, Skeleton
} from "@mui/material";
import { styled } from '@mui/material/styles';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ROLE_CONFIG = {
    customer: { label: "KHÁCH HÀNG", bgColor: "#F1F5F9", textColor: "#475569" },
    staff: { label: "STAFF", bgColor: "#FFEED1", textColor: "#906800" },
    kitchen: { label: "KITCHEN", bgColor: "#FFE9E0", textColor: "#914F3B" },
    admin: { label: "ADMIN", bgColor: "#FFF7F3", textColor: "#A21A16" }
};

// Custom Switch theo style m gửi
const AntSwitch = styled(Switch)(() => ({
    width: 48,
    height: 24,
    padding: 0,
    display: 'flex',
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(24px)',
            color: '#fff',
            '& + .MuiSwitch-track': { opacity: 1, backgroundColor: '#8A0000' },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 20,
        height: 20,
        borderRadius: 10,
        boxShadow: 'none',
    },
    '& .MuiSwitch-track': {
        borderRadius: 12,
        opacity: 1,
        backgroundColor: '#cbd5e1',
    },
}));

const TABS = ["customer", "staff", "kitchen", "admin"];
const TAB_LABELS = ["Khách hàng (User)", "Nhân viên (Staff)", "Bếp (Kitchen)", "Admin"];

export const UserDirectoryTableSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fix căn chỉnh bằng cách dùng px thay vì fr cho các cột hành động/trạng thái
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

    useEffect(() => { fetchData(); }, [fetchData]);

    return (
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', m: 2 }}>
            <Box sx={{ px: 4, pt: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                    {TAB_LABELS.map((label, i) => (
                        <Tab key={i} label={label} sx={{ textTransform: 'none', fontWeight: 700 }} />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ minWidth: 1000 }}>
                {/* Header - Ép text-align center cho đồng bộ */}
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: gridTemplate,
                    bgcolor: "#FDF4F4",
                    py: 2, px: 3,
                    alignItems: "center"
                }}>
                    {["NGƯỜI DÙNG", "VAI TRÒ", "LIÊN HỆ", "NGÀY GIA NHẬP", "TRẠNG THÁI", "HÀNH ĐỘNG"].map((h, i) => (
                        <Typography
                            key={i}
                            variant="caption"
                            sx={{
                                fontWeight: 800,
                                color: "#8A0000",
                                textAlign: i === 0 ? "left" : "center"
                            }}
                        >
                            {h}
                        </Typography>
                    ))}
                </Box>

                <Stack sx={{ minHeight: 450 }}>
                    {loading ? (
                        <Box sx={{ p: 3 }}><Skeleton variant="rectangular" height={400} /></Box>
                    ) : (
                        rows.map((row) => (
                            <Box key={row.id} sx={{
                                display: "grid",
                                gridTemplateColumns: gridTemplate,
                                alignItems: "center",
                                px: 3, py: 2,
                                borderBottom: '1px solid #f1f5f9',
                                '&:hover': { bgcolor: '#fafafa' }
                            }}>
                                {/* 1. Người dùng */}
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{row.name}</Typography>
                                    <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>ID: {row.id.slice(0, 8)}</Typography>
                                </Box>

                                {/* 2. Vai trò - Căn giữa */}
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Chip
                                        label={ROLE_CONFIG[row.role]?.label || row.role?.toUpperCase()}
                                        sx={{
                                            bgcolor: ROLE_CONFIG[row.role]?.bgColor,
                                            color: ROLE_CONFIG[row.role]?.textColor,
                                            fontWeight: 800, fontSize: 11, borderRadius: "16px", height: 24
                                        }}
                                    />
                                </Box>

                                {/* 3. Liên hệ - Căn trái trong cột */}
                                <Box sx={{ textAlign: "left", px: 2 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{row.email}</Typography>
                                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{row.phone || "---"}</Typography>
                                </Box>

                                {/* 4. Ngày gia nhập - Căn giữa */}
                                <Typography sx={{ textAlign: 'center', fontSize: 13, fontWeight: 500 }}>
                                    {new Date(row.created_at).toLocaleDateString('vi-VN')}
                                </Typography>

                                {/* 5. Trạng thái - Căn giữa */}
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <AntSwitch checked={row.status === 'active'} />
                                </Box>

                                {/* 6. Hành động - Căn giữa */}
                                <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                                    <IconButton size="small" sx={{ color: 'text.secondary' }}><EditOutlinedIcon fontSize="small" /></IconButton>
                                    <IconButton size="small" sx={{ color: 'text.secondary' }}><DeleteOutlineOutlinedIcon fontSize="small" /></IconButton>
                                </Stack>
                            </Box>
                        ))
                    )}
                </Stack>
            </Box>
        </Card>
    );
};