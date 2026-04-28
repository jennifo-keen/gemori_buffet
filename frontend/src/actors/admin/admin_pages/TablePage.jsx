import { Stack, CircularProgress } from "@mui/material"; // Thêm CircularProgress nếu muốn show loading
import { useEffect, useState } from "react";
import { FloorMapHeaderSection } from "../admin_components/Table/FloorMapHeaderSection";
import { FloorStatusGridSection } from "../admin_components/Table/FloorStatusGridSection";

const TablePage = () => {
    const [tables, setTables] = useState([]);
    const [isAdding, setIsAdding] = useState(false); // State để chống spam click nút thêm bàn

    const fetchTables = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/tables`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (data && data.success && Array.isArray(data.data)) {
                setTables(data.data);
            } else {
                setTables([]);
            }
        } catch (err) {
            console.error("Error fetching tables:", err);
            setTables([]);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    // Đổi trạng thái bàn
    const handleChangeStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/tables/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) fetchTables();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Hàm thêm bàn đã gắn sự kiện hoàn chỉnh
    const handleAddTable = async () => {
        if (isAdding) return; // Nếu đang thêm thì không cho bấm tiếp

        try {
            setIsAdding(true);
            const res = await fetch(`${import.meta.env.VITE_SOCKET_URL}/admin/tables`, {
                method: "POST", // Khớp với Route router.post("/") của cậu
                headers: { "Content-Type": "application/json" },
            });

            const result = await res.json();

            if (result.success) {
                // Cách 1: Fetch lại toàn bộ (An toàn nhất)
                await fetchTables();

                // Cách 2: Update trực tiếp vào state (Mượt mà hơn, không cần đợi fetch)
                // setTables(prev => [...prev, result.data]);

                console.log("Thêm bàn thành công!");
            } else {
                alert("Không thể thêm bàn mới!");
            }
        } catch (err) {
            console.error("Error adding table:", err);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Stack direction="column" spacing={4} sx={{ p: 4, width: "100%" }}>
            {/* Truyền hàm xử lý vào prop onAdd */}
            <FloorMapHeaderSection onAdd={handleAddTable} />

            <FloorStatusGridSection
                tables={tables}
                onChangeStatus={handleChangeStatus}
            />
        </Stack>
    );
};

export default TablePage;