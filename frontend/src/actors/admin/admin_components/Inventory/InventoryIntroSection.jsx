import React, { useState } from "react";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
    Box,
    Button,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Autocomplete,
    CircularProgress,
} from "@mui/material";

// Màu sắc thương hiệu Gemori Buffet
const BRAND_RED = "#A21A16";
const BRAND_RED_LIGHT = "#A21A161a";
const BRAND_RED_HOVER = "#821512";

const commonFontSx = {
    fontFamily: '"Be Vietnam Pro", "Epilogue", sans-serif',
};

const InventoryIntroSection = ({ fetchInventoryData, inventoryItems = [] }) => {
    // State quản lý đóng mở Modal
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(""); // "import" hoặc "export"

    // State quản lý dữ liệu Form
    const [selectedItem, setSelectedItem] = useState(null); // Lưu object nguyên liệu đã chọn
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(false);

    // Mở Modal
    const handleOpen = (type) => {
        setActionType(type);
        setOpen(true);
    };

    // Đóng Modal và reset form
    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
        setQuantity("");
        setLoading(false);
    };

    // Xử lý gửi dữ liệu lên Backend
    const handleSubmit = async () => {
        if (!selectedItem?.id || !quantity) return;

        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_SOCKET_URL}/admin/inventory/update-stock/${selectedItem.id}`;

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    changeAmount: Number(quantity),
                    type: actionType, // Backend nhận 'import' để cộng, 'export' để trừ
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Load lại dữ liệu bảng và các thẻ thống kê sau khi cập nhật thành công
                if (fetchInventoryData) {
                    await fetchInventoryData();
                }
                handleClose();
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            alert("Không thể kết nối đến máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="section" width="100%" sx={{ py: 1 }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={3}
                width="100%"
            >
                {/* Phần tiêu đề */}
                <Stack spacing={0.5} minWidth={0}>
                    <Typography
                        component="h2"
                        sx={{
                            ...commonFontSx,
                            fontWeight: 800,
                            fontSize: "28px",
                            lineHeight: "36px",
                            letterSpacing: "-1px",
                            color: "#3d2a28",
                        }}
                    >
                        Quản lý kho nguyên liệu
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            ...commonFontSx,
                            fontWeight: 500,
                            fontSize: "15px",
                            lineHeight: "22px",
                            color: "text.secondary",
                        }}
                    >
                        Theo dõi, nhập xuất và kiểm kê thực phẩm Gemori Buffet
                    </Typography>
                </Stack>

                {/* Nút hành động */}
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<LogoutOutlinedIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleOpen("export")}
                        sx={{
                            ...commonFontSx,
                            px: 3,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 700,
                            color: BRAND_RED,
                            borderColor: `${BRAND_RED}4d`,
                            "&:hover": { bgcolor: BRAND_RED_LIGHT, borderColor: BRAND_RED },
                        }}
                    >
                        Xuất kho
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<InputOutlinedIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleOpen("import")}
                        sx={{
                            ...commonFontSx,
                            px: 3,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 700,
                            bgcolor: BRAND_RED,
                            color: "#fff",
                            "&:hover": { bgcolor: BRAND_RED_HOVER },
                        }}
                    >
                        Nhập kho
                    </Button>
                </Stack>
            </Stack>

            {/* Dialog Form Nhập/Xuất */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle sx={{ ...commonFontSx, fontWeight: 700 }}>
                    {actionType === "import" ? "Nhập kho nguyên liệu" : "Xuất kho (Hủy hàng)"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        {/* Ô chọn có gợi ý tìm kiếm */}
                        <Autocomplete
                            options={inventoryItems}
                            getOptionLabel={(option) =>
                                `${option.menu_name} (Tồn: ${option.stock_quantity})`
                            }
                            value={selectedItem}
                            onChange={(event, newValue) => setSelectedItem(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tìm tên nguyên liệu..."
                                    placeholder="Gõ để tìm kiếm..."
                                />
                            )}
                            noOptionsText="Không tìm thấy nguyên liệu nào"
                        />

                        <TextField
                            label="Số lượng"
                            type="number"
                            fullWidth
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={handleClose}
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                        disabled={loading}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!selectedItem || !quantity || loading}
                        startIcon={loading && <CircularProgress size={16} color="inherit" />}
                        sx={{
                            bgcolor: BRAND_RED,
                            fontWeight: 700,
                            "&:hover": { bgcolor: BRAND_RED_HOVER },
                        }}
                    >
                        {loading ? "Đang xử lý..." : "Xác nhận"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InventoryIntroSection;