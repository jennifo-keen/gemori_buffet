import {
    Box, IconButton, Paper, Stack, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const BuffetPackageListSection = ({ tickets, setTickets, loading }) => {

    // 1. Hàm Thay đổi trạng thái (is_active)
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
                newTickets[index] = updatedTicket;
                setTickets(newTickets);
            }
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            alert("Không thể cập nhật trạng thái vé!");
        }
    };

    // 2. Hàm Xóa vé (Logic Xóa)
    const handleDelete = async (id, name) => {
        const confirmDelete = window.confirm(`M có chắc muốn xóa gói vé "${name}" này không?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/admin/tickets/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTickets(prev => prev.filter(ticket => ticket.id !== id));
                alert("Đã xóa vé thành công!");
            } else {
                const errorData = await response.json();
                alert("Lỗi: " + (errorData.message || "Không thể xóa"));
            }
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            alert("Lỗi kết nối server m ơi!");
        }
    };

    if (loading) return (
        <Stack alignItems="center" py={5}>
            <CircularProgress sx={{ color: "#a21a16" }} />
        </Stack>
    );

    return (
        <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid rgba(138, 0, 0, 0.1)", width: "100%", overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2, backgroundColor: "rgba(138, 0, 0, 0.05)" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#230f0f", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                    Danh sách gói buffet
                </Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#fff7f3" }}>
                            {["MÃ VÉ", "TÊN GÓI", "GIÁ (VND)", "MÔ TẢ", "TRẠNG THÁI", "HÀNH ĐỘNG"].map((label) => (
                                <TableCell key={label} align="center" sx={{ fontWeight: 700, fontSize: "12px", color: "#6c0d0a", opacity: 0.6, fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3, color: "text.secondary" }}>
                                    Chưa có gói vé nào.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tickets.map((pkg, index) => (
                                <TableRow key={pkg.id} sx={{ borderBottom: "1px solid rgba(177, 65, 53, 0.1)", "&:hover": { bgcolor: "rgba(0,0,0,0.01)" } }}>
                                    <TableCell align="center" sx={{ fontWeight: 700 }}>{pkg.code}</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 700 }}>{pkg.name}</TableCell>
                                    <TableCell align="center" sx={{ color: "#6c0d0a", fontWeight: 700 }}>
                                        {new Intl.NumberFormat("vi-VN").format(pkg.price)}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontSize: "12px", color: "#5a403c", maxWidth: 200 }}>
                                        {pkg.description || "Không có mô tả"}
                                    </TableCell>

                                    {/* TRẠNG THÁI TOGGLE */}
                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            onClick={() => handleToggleStatus(pkg.id, pkg.is_active, index)}
                                            sx={{
                                                userSelect: "none",
                                                width: "fit-content",
                                                cursor: "pointer",
                                                margin: "0 auto",
                                                "&:hover": { opacity: 0.8 }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: 36,
                                                    height: 20,
                                                    backgroundColor: pkg.is_active ? "#a21a16" : "#ccc",
                                                    borderRadius: "10px",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: 2,
                                                        left: pkg.is_active ? "18px" : "2px",
                                                        width: 16,
                                                        height: 16,
                                                        backgroundColor: "#ffffff",
                                                        borderRadius: "50%",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="caption" sx={{ color: pkg.is_active ? "#a21a16" : "#666", fontWeight: 700, fontSize: "10px" }}>
                                                {pkg.is_active ? "Đang bán" : "Tạm ngưng"}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    {/* HÀNH ĐỘNG: ĐÃ THAY BẰNG COMPONENT ACTION CỦA ÔNG */}
                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                            spacing={1}
                                            width={76}
                                            sx={{ margin: "0 auto", userSelect: "none", }}
                                        >
                                            <IconButton
                                                size="small"
                                                sx={{ color: "rgba(180, 140, 30, 1)", padding: 0 }}
                                                onClick={() => console.log("Sửa vé:", pkg.id)}
                                            >
                                                <EditOutlinedIcon sx={{ width: 18, height: 18 }} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                sx={{ color: "rgba(69, 85, 101, 1)", padding: 0 }}
                                                onClick={() => handleDelete(pkg.id, pkg.name)}
                                            >
                                                <DeleteOutlinedIcon sx={{ width: 18, height: 18 }} />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};