import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { BuffetManagementHeaderSection } from "../admin_components/Ticket/BuffetManagementHeaderSection";
import { BuffetPackageListSection } from "../admin_components/Ticket/BuffetPackageListSection";

const BuffetTicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    // Key để trigger reload bảng dữ liệu
    const [reloadKey, setReloadKey] = useState(0);

    // Hàm lấy danh sách vé từ Backend
    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/admin/tickets");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error("Lỗi fetch tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load data khi vào trang và khi reloadKey thay đổi
    useEffect(() => {
        fetchTickets();
    }, [reloadKey]);

    // Hàm để component con gọi khi cần reload bảng
    const handleReload = () => {
        setReloadKey(prev => prev + 1);
    };

    return (
        <Stack
            component="main"
            direction="column"
            spacing={4}
            padding={4}
            width="100%"
        >
            {/* Truyền hàm reload xuống Header */}
            <BuffetManagementHeaderSection onTicketAdded={handleReload} />

            <BuffetPackageListSection
                tickets={tickets}
                setTickets={setTickets}
                loading={loading}
            />
        </Stack>
    );
};

export default BuffetTicketPage;