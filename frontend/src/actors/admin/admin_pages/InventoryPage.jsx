import { Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";
import IngredientsCatalogSection from "../admin_components/Inventory/IngredientsCatalogSection";
import InventoryAlertCardsSection from "../admin_components/Inventory/InventoryAlertCardsSection";
import InventoryIntroSection from "../admin_components/Inventory/InventoryIntroSection";
import InventoryQuickFiltersSection from "../admin_components/Inventory/InventoryQuickFiltersSection";
import React, { useState, useEffect, useCallback } from "react";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [stats, setStats] = useState({ out_of_stock: 0, low_stock: 0 });
    const [filter, setFilter] = useState("Tất cả");
    const [loading, setLoading] = useState(false);

    // State cho Modal chỉnh sửa định mức
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newMinQuantity, setNewMinQuantity] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchInventory = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_SOCKET_URL}/admin/inventory?filter=${encodeURIComponent(filter)}`
            );
            const result = await response.json();
            if (result.success) {
                setInventory(result.data); //
                setStats(result.stats); //
            }
        } catch (error) {
            console.error("Lỗi fetch:", error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    // Xử lý khi nhấn nút Edit ở bảng
    const handleOpenEdit = (item) => {
        setSelectedItem(item);
        setNewMinQuantity(item.min_quantity || 0);
        setEditModalOpen(true);
    };

    // Gọi API cập nhật min_quantity
    const handleUpdateMinQuantity = async () => {
        if (!selectedItem) return;
        setIsUpdating(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SOCKET_URL}/admin/inventory/update-min-quantity/${selectedItem.id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ min_quantity: Number(newMinQuantity) })
                }
            );
            const result = await response.json();
            if (result.success) {
                setEditModalOpen(false);
                fetchInventory(); // Reload lại toàn bộ dữ liệu
            }
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Stack spacing={2.5}>
            <InventoryIntroSection
                fetchInventoryData={fetchInventory}
                inventoryItems={inventory}
            />

            <InventoryAlertCardsSection stats={stats} />

            <InventoryQuickFiltersSection
                selectedFilter={filter}
                onFilterChange={setFilter}
            />

            <IngredientsCatalogSection
                data={inventory}
                isLoading={loading}
                onEditClick={handleOpenEdit} // Truyền hàm mở modal vào đây
            />

            {/* Modal chỉnh sửa định mức nhanh */}
            <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle sx={{
                    fontWeight: 800,
                    fontFamily: '"Be Vietnam Pro"',
                    color: "#A21A16" // Đổi tiêu đề sang màu đỏ
                }}>
                    Thiết lập định mức tồn kho
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{
                        mb: 2,
                        fontSize: '14px',
                        fontFamily: '"Be Vietnam Pro"',
                        color: "#3d2a28" // Màu nâu tối cho text phụ để dễ đọc
                    }}>
                        Nguyên liệu: <strong style={{ color: "#A21A16" }}>{selectedItem?.menu_name}</strong>
                    </Typography>
                    <TextField
                        fullWidth
                        label="Số lượng tối thiểu (Min)"
                        type="number"
                        value={newMinQuantity}
                        onChange={(e) => setNewMinQuantity(e.target.value)}
                        autoFocus
                        // Đổi màu viền và label khi focus thành đỏ
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#A21A16',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#A21A16',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setEditModalOpen(false)}
                        sx={{
                            color: "#A21A16", // Chữ "Hủy" màu đỏ
                            fontFamily: '"Be Vietnam Pro"',
                            fontWeight: 600
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateMinQuantity}
                        disabled={isUpdating}
                        sx={{
                            bgcolor: "#A21A16",
                            fontFamily: '"Be Vietnam Pro"',
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#821512" },
                            "&.Mui-disabled": { bgcolor: "#e0e0e0" }
                        }}
                    >
                        {isUpdating ? "Đang lưu..." : "Cập nhật"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default InventoryPage;