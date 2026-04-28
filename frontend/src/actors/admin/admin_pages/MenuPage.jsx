import React, { useState, useEffect } from "react";
import { MenuManagementHeaderSection } from "../admin_components/Menu/MenuManagementHeaderSection";
import { MenuStatsSummarySection } from "../admin_components/Menu/MenuStatsSummarySection";
import { MenuFilterPillsSection } from "../admin_components/Menu/MenuFilterPillsSection";
import { MenuItemsTableSection } from "../admin_components/Menu/MenuItemsTableSection";
import EditDishModal from "../admin_components/Menu/EditDishModal"; // Import đã sẵn sàng
import { Stack, CircularProgress } from "@mui/material";

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ total: 0, serving: 0, stopped: 0 });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    // Quản lý Modal Edit
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loadingToggleId, setLoadingToggleId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/menus`);
            const result = await res.json();
            if (result.success) {
                setItems(result.data.menus || []);
                setStats(result.data.stats || { total: 0, serving: 0, stopped: 0 });
            }
        } catch (err) {
            console.error("Lỗi fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Cậu có chắc chắn muốn xóa món này không?")) {
            try {
                const res = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/menus/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) fetchData();
            } catch (err) {
                console.error("Lỗi khi xóa:", err);
            }
        }
    };

    const handleToggle = async (id, currentStatus) => {
        setLoadingToggleId(id);
        try {
            await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/menus/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: !currentStatus }),
            });
            fetchData();
        } catch (err) {
            console.error("Lỗi toggle status:", err);
        } finally {
            setLoadingToggleId(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const categories = ["all", ...new Set(items.map((i) => i.category))];
    const filteredItems = items.filter((i) => activeTab === "all" || i.category === activeTab);

    return (
        <Stack direction="column" spacing={4} sx={{ p: 4, width: "100%" }}>
            <MenuManagementHeaderSection onRefresh={fetchData} />

            <MenuStatsSummarySection stats={stats} />

            <MenuFilterPillsSection
                categories={categories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {loading ? (
                <Stack alignItems="center" py={10}>
                    <CircularProgress color="error" />
                </Stack>
            ) : (
                <MenuItemsTableSection
                    onDelete={handleDelete}
                    onEdit={handleEditClick}
                    items={filteredItems}
                    onToggle={handleToggle}
                    loadingToggleId={loadingToggleId}
                />
            )}

            {/* Modal Edit - Giờ đã hết báo đỏ vì biến đã được sử dụng */}
            <EditDishModal
                open={isEditModalOpen}
                item={editingItem}
                categories={categories}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingItem(null);
                }}
                onSuccess={fetchData}
            />
        </Stack>
    );
};

export default MenuPage;