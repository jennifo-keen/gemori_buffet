import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    IconButton,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";

const HEADER_BG = "#FFF7F4";
const HEADER_TEXT = "#A21A16";
const ROW_ACTIVE = "#FFE5DF";
const ACTIVE_TEXT = "#A21A16";

const STATUS_CONFIG = {
    ordering: { label: "Đang phục vụ", bg: "#dbeafe", text: "#1d4ed8" },
    paid: { label: "Đã thanh toán", bg: "#d1fae5", text: "#047857" },
};

const mapStatus = (orderStatus, paymentStatus) => {
    if (paymentStatus === "paid") return "paid";
    return orderStatus === "paid" ? "paid" : "ordering";
};

const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.ordering;
    return (
        <Box sx={{ px: 1, py: 0.2, borderRadius: "999px", bgcolor: cfg.bg, width: "fit-content" }}>
            <Typography fontSize="10px" fontWeight={600} color={cfg.text}>{cfg.label}</Typography>
        </Box>
    );
};

export const OrdersListAndDetailSection = ({ filterStatus, filterDate }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(1);
    const [showAllItems, setShowAllItems] = useState(false);

    const itemsPerPage = 8;
    const BASE_URL = `${import.meta.env.VITE_SOCKET_URL}/admin`;

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("vi-VN") + " • " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    };

    const fetchOrders = useCallback(async () => {
        try {
            let url = `${BASE_URL}/orders`;
            if (filterDate && filterDate.trim() !== "") {
                url += `?date=${filterDate}`;
            }

            const res = await fetch(url);
            const json = await res.json();

            // ✅ KIỂM TRA: Nếu json.data không tồn tại thì trả về mảng rỗng
            if (!json || !json.data) {
                setOrders([]);
                return [];
            }

            const mapped = json.data.map((o) => ({
                id: o.id,
                code: `#ORD-${o.id.slice(0, 6)}`,
                table_id: o.table_id,
                table: o.table_code,
                time: formatDate(o.order_time),
                total: Number(o.total_amount).toLocaleString() + "₫",
                status: mapStatus(o.order_status, o.payment_status),
                raw_date: o.order_time
            }));

            setOrders(mapped);
            return mapped;
        } catch (error) {
            console.error("Lỗi fetch:", error);
            setOrders([]); // Reset về mảng rỗng khi lỗi
            return [];    // ✅ QUAN TRỌNG: Phải return mảng rỗng thay vì undefined
        }
    }, [BASE_URL, filterDate]);

    const handleSelect = async (id) => {
        setSelectedId(id);
        setShowAllItems(false);
        try {
            const res = await fetch(`${BASE_URL}/orders/${id}`);
            const json = await res.json();
            const data = json.data;
            setSelectedOrder(data);
            const grouped = {};
            data.items.forEach((item) => {
                const key = item.menu_id;
                if (!grouped[key]) grouped[key] = { name: item.menu_name, image: item.image, qty: 0 };
                grouped[key].qty += item.quantity;
            });
            setItems(Object.values(grouped));
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            const mapped = await fetchOrders();

            // ✅ KIỂM TRA: Đảm bảo mapped có tồn tại và là mảng trước khi dùng .length
            if (isMounted && Array.isArray(mapped) && mapped.length > 0) {
                setPage(prev => (prev !== 1 ? 1 : prev));
                setTimeout(() => {
                    if (isMounted) handleSelect(mapped[0].id);
                }, 0);
            } else if (isMounted) {
                setSelectedOrder(null);
                setSelectedId(null);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, [fetchOrders]);

    const filteredOrders = orders.filter(o => !filterStatus || o.status === filterStatus);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
    const safePage = page > totalPages ? 1 : page;
    const startIndex = (safePage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    // ✅ Hàm xóa giờ đã có thể gọi fetchOrders thoải mái
    const handleDeleteOrder = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không? Hành động này không thể hoàn tác.")) return;

        try {
            const res = await fetch(`${BASE_URL}/orders/${id}`, {
                method: "DELETE",
            });
            const result = await res.json();

            if (result.success) {
                setSelectedOrder(null);
                setSelectedId(null);
                await fetchOrders(); // Hết lỗi undefined rồi nhé!
                alert("Đã xóa đơn hàng thành công!");
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    const navigate = useNavigate();

    // Giả sử 'order' là object chứa thông tin đơn hàng đang xem
    const handlePaymentRedirect = () => {
        // console.log("Dữ liệu đơn hiện tại:", selectedOrder); // Ông log dòng này ra để kiểm tra xem có table_id chưa

        if (selectedOrder && selectedOrder.table_id) {
            const url = `/staff/checkout?tableId=${selectedOrder.table_id}&tableCode=${selectedOrder.table_code}`;
            navigate(url);
        } else {
            alert("Không tìm thấy thông tin bàn! Hãy kiểm tra xem API đã trả về table_id chưa.");
        }
    };

    return (
        <Stack direction="row" spacing={1.5} alignItems="stretch">
            {/* DANH SÁCH BÊN TRÁI */}
            <Paper sx={{ flex: 1.8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", p: 1, bgcolor: HEADER_BG, borderBottom: "1px solid #f1f1f1" }}>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Mã đơn</Typography></Box>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Bàn</Typography></Box>
                    <Box sx={{ flex: 1.5 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Thời gian</Typography></Box>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Tổng tiền</Typography></Box>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Trạng thái</Typography></Box>
                </Box>

                <Box sx={{ flex: 1 }}>
                    {paginatedOrders.map((o) => {
                        const isActive = selectedId === o.id;
                        return (
                            <Box key={o.id} onClick={() => handleSelect(o.id)} sx={{
                                display: "flex", p: 1, alignItems: "center", borderTop: "1px solid #f5f5f5", cursor: "pointer",
                                bgcolor: isActive ? ROW_ACTIVE : "transparent", "&:hover": { bgcolor: "#fafafa" },
                            }}>
                                <Box sx={{ flex: 1 }}><Typography fontSize="11px" fontWeight={600} color={isActive ? ACTIVE_TEXT : "inherit"}>{o.code}</Typography></Box>
                                <Box sx={{ flex: 1 }}><Typography fontSize="11px" color={isActive ? ACTIVE_TEXT : "inherit"}>Bàn {o.table}</Typography></Box>
                                <Box sx={{ flex: 1.5 }}><Typography fontSize="10px" color="gray">{o.time}</Typography></Box>
                                <Box sx={{ flex: 1 }}><Typography fontSize="11px" fontWeight={600}>{o.total}</Typography></Box>
                                <Box sx={{ flex: 1 }}><StatusBadge status={o.status} /></Box>
                                <ChevronRightIcon sx={{ fontSize: 16, color: isActive ? ACTIVE_TEXT : "#ccc" }} />
                            </Box>
                        );
                    })}
                </Box>

                <Stack p={1} alignItems="center" sx={{ borderTop: "1px solid #f5f5f5" }}>
                    <Pagination
                        count={totalPages}
                        size="small"
                        page={safePage}
                        onChange={(_, v) => setPage(v)}
                        sx={{
                            "& .MuiPaginationItem-root": { fontSize: "10px", minWidth: "24px", height: "24px", margin: "0 2px" },
                            "& .MuiSvgIcon-root": { fontSize: "14px" }
                        }}
                    />
                </Stack>
            </Paper>

            {/* CHI TIẾT BÊN PHẢI */}
            <Paper sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", minHeight: 400 }}>
                {!selectedOrder ? (
                    <Typography fontSize="13px" color="gray">Chọn đơn để xem chi tiết</Typography>
                ) : (
                    <>
                        <Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography fontSize="13px" fontWeight={700} color={ACTIVE_TEXT}>
                                    #{selectedOrder.id.slice(0, 6)} • Bàn {selectedOrder.table_code}
                                </Typography>
                                <IconButton size="small" onClick={() => { setSelectedOrder(null); setSelectedId(null); }}><CloseIcon fontSize="inherit" /></IconButton>
                            </Stack>
                            <Typography fontSize="20px" fontWeight={700} mt={1}>
                                {Number(selectedOrder.total_amount).toLocaleString()}₫
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, mt: 2, borderTop: "1px dashed #eee", pt: 1, overflowY: "auto" }}>
                            {(showAllItems ? items : items.slice(0, 8)).map((it, i) => (
                                <Stack key={i} direction="row" spacing={1.5} mt={1.5} alignItems="center">
                                    <Box component="img" src={it.image} sx={{ width: 40, height: 40, borderRadius: 1.5, objectFit: "cover" }} />
                                    <Box>
                                        <Typography fontSize="13px" fontWeight={500}>{it.name}</Typography>
                                        <Typography fontSize="11px" color="gray">Số lượng: x{it.qty}</Typography>
                                    </Box>
                                </Stack>
                            ))}
                            {items.length > 8 && (
                                <Button fullWidth size="small" onClick={() => setShowAllItems(!showAllItems)} sx={{ mt: 1, fontSize: "11px", textTransform: "none", color: "#A21A16" }}>
                                    {showAllItems ? "Thu gọn" : `Xem thêm món`}
                                </Button>
                            )}
                        </Box>

                        {selectedOrder.payment_status !== "paid" && (
                            <Stack direction="row" spacing={1} mt={2} pt={2} sx={{ borderTop: "1px solid #f5f5f5" }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<DeleteOutlineIcon />}
                                    onClick={() => handleDeleteOrder(selectedOrder.id)}
                                    sx={{
                                        fontSize: "12px", color: "#666", borderColor: "#ccc", fontWeight: 600, textTransform: "none",
                                        "&:hover": { borderColor: "#A21A16", color: "#A21A16" }
                                    }}
                                >
                                    Xóa đơn
                                </Button>
                                <Button fullWidth variant="contained"
                                    onClick={handlePaymentRedirect}
                                    sx={{ fontSize: "12px", bgcolor: "#A21A16", fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "#801512" } }}>
                                    Thanh toán
                                </Button>
                            </Stack>
                        )}
                    </>
                )}
            </Paper>
        </Stack>
    );
};

export default OrdersListAndDetailSection;