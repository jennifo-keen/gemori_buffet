import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { BuffetManagementHeaderSection } from "../admin_components/Ticket/BuffetManagementHeaderSection";
import { BuffetPackageListSection } from "../admin_components/Ticket/BuffetPackageListSection";

const BuffetTicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [allMenus, setAllMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadKey, setReloadKey] = useState(0);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/admin/tickets");
            const result = await response.json();

            // Gia cố: Ép kiểu về mảng dù Backend trả về kiểu gì
            if (Array.isArray(result)) {
                setTickets(result);
            } else if (result?.tickets && Array.isArray(result.tickets)) {
                setTickets(result.tickets);
            } else if (result?.data && Array.isArray(result.data)) {
                setTickets(result.data);
            } else {
                setTickets([]);
            }
        } catch (error) {
            console.error("Lỗi fetch tickets:", error);
            setTickets([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllMenus = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/menus");
            const result = await response.json();

            console.log("MENU API:", result);

            // ✅ FIX CHÍNH Ở ĐÂY
            if (Array.isArray(result?.data?.menus)) {
                setAllMenus(result.data.menus);
            } else {
                setAllMenus([]);
            }

        } catch (error) {
            console.error("Lỗi fetch menus:", error);
            setAllMenus([]);
        }
    };

    useEffect(() => {
        fetchTickets();
        fetchAllMenus();
    }, [reloadKey]);

    const handleReload = () => {
        setReloadKey(prev => prev + 1);
    };

    return (
        <Stack component="main" direction="column" spacing={4} padding={4} width="100%">
            <BuffetManagementHeaderSection onTicketAdded={handleReload} />
            <BuffetPackageListSection
                tickets={tickets}
                setTickets={setTickets}
                loading={loading}
                allMenus={allMenus}
            />
        </Stack>
    );
};

export default BuffetTicketPage;