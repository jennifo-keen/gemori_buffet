import React, { useState, useEffect } from "react";
import { MenuManagementHeaderSection } from "../admin_components/Menu/MenuManagementHeaderSection";
import { MenuStatsSummarySection } from "../admin_components/Menu/MenuStatsSummarySection";
import { MenuFilterPillsSection } from "../admin_components/Menu/MenuFilterPillsSection";
import { MenuItemsTableSection } from "../admin_components/Menu/MenuItemsTableSection";
import {
    Stack,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ total: 0, serving: 0, stopped: 0 });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [openAdd, setOpenAdd] = useState(false);
    const [newDish, setNewDish] = useState({ name: "", category: "" });

    // 🔥 loading riêng cho từng item khi toggle
    const [loadingToggleId, setLoadingToggleId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/admin/menus");
            const result = await res.json();

            if (result.success) {
                setItems(result.data.menus);
                setStats(result.data.stats);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔥 TOGGLE XỊN (optimistic UI)
    const handleToggle = async (id, currentStatus) => {
        // update UI ngay lập tức
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: !currentStatus } : item
            )
        );

        setLoadingToggleId(id);

        try {
            await fetch(`http://localhost:3000/api/admin/menus/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: !currentStatus }),
            });
        } catch (err) {
            console.error(err);

            // rollback nếu lỗi
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status: currentStatus } : item
                )
            );
        } finally {
            setLoadingToggleId(null);
        }
    };

    // 🔥 ADD DISH
    const handleAddDish = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/menus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDish),
            });

            if (res.ok) {
                setOpenAdd(false);
                setNewDish({ name: "", category: "" });

                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 FILTER
    const categories = ["all", ...new Set(items.map((i) => i.category))];

    const filteredItems = items.filter(
        (i) => activeTab === "all" || i.category === activeTab
    );

    return (
        <Stack direction="column" spacing={4} sx={{ p: 4, width: "100%" }}>
            <MenuManagementHeaderSection onAddClick={() => setOpenAdd(true)} />

            <MenuStatsSummarySection stats={stats} />

            <MenuFilterPillsSection
                categories={categories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {loading ? (
                <Stack alignItems="center">
                    <CircularProgress color="error" />
                </Stack>
            ) : (
                <MenuItemsTableSection
                    items={filteredItems}
                    onToggle={handleToggle}
                    loadingToggleId={loadingToggleId} // 🔥 truyền xuống
                />
            )}

            {/* MODAL */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
                <DialogTitle>Thêm món ăn mới</DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Tên món"
                        sx={{ mt: 2 }}
                        value={newDish.name}
                        onChange={(e) =>
                            setNewDish({ ...newDish, name: e.target.value })
                        }
                    />

                    <TextField
                        fullWidth
                        label="Danh mục"
                        sx={{ mt: 2 }}
                        value={newDish.category}
                        onChange={(e) =>
                            setNewDish({ ...newDish, category: e.target.value })
                        }
                    />
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenAdd(false)}>Hủy</Button>

                    <Button
                        variant="contained"
                        onClick={handleAddDish}
                        sx={{ bgcolor: "#b14135" }}
                    >
                        Lưu món
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default MenuPage;