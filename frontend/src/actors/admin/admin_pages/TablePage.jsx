import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { FloorMapHeaderSection } from "../admin_components/Table/FloorMapHeaderSection";
import { FloorStatusGridSection } from "../admin_components/Table/FloorStatusGridSection";

const TablePage = () => {
    const [tables, setTables] = useState([]);

    // ✅ lấy danh sách bàn
    const fetchTables = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/tables", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error(`Fetch failed: ${res.status}`);
            }

            const data = await res.json();

            // kiểm tra dữ liệu trả về
            if (data && data.success && Array.isArray(data.data)) {
                setTables(data.data);
            } else {
                setTables([]); // fallback nếu không có data
            }
        } catch (err) {
            console.error("Error fetching tables:", err);
            setTables([]); // tránh crash UI
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    // ✅ đổi trạng thái bàn
    const handleChangeStatus = async (id, newStatus) => {
        try {
            await fetch(`http://localhost:3000/api/admin/tables/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            fetchTables(); // reload lại
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ thêm bàn
    const handleAddTable = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/tables", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error(`Add table failed: ${res.status}`);
            }

            await fetchTables();
        } catch (err) {
            console.error("Error adding table:", err);
        }
    };

    return (
        <Stack direction="column" spacing={4} sx={{ p: 4, width: "100%" }}>
            <FloorMapHeaderSection onAdd={handleAddTable} />

            <FloorStatusGridSection
                tables={tables}
                onChangeStatus={handleChangeStatus}
            />
        </Stack>
    );
};

export default TablePage;
