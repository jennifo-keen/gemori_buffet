import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    IconButton,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

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

export const OrdersListAndDetailSection = ({ filterStatus }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(1);
    const [showAllItems, setShowAllItems] = useState(false);

    const itemsPerPage = 8;
    const BASE_URL = "http://localhost:3000/api/admin";

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("vi-VN") + " • " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    };

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
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${BASE_URL}/orders`);
                const json = await res.json();
                const mapped = json.data.map((o) => ({
                    id: o.id,
                    code: `#ORD-${o.id.slice(0, 6)}`,
                    table: o.table_code,
                    time: formatDate(o.order_time),
                    total: Number(o.total_amount).toLocaleString() + "₫",
                    status: mapStatus(o.order_status, o.payment_status),
                }));
                setOrders(mapped);
                if (mapped.length > 0) handleSelect(mapped[0].id);
            } catch (error) { console.error(error); }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(o => !filterStatus || o.status === filterStatus);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
    const safePage = page > totalPages ? 1 : page;
    const startIndex = (safePage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Stack direction="row" spacing={1.5} alignItems="stretch"> {/* Căn stretch để 2 cột dài bằng nhau */}
            {/* DANH SÁCH BÊN TRÁI */}
            <Paper sx={{ flex: 1.8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", p: 1, bgcolor: HEADER_BG, borderBottom: "1px solid #f1f1f1" }}>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Mã đơn</Typography></Box>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Bàn</Typography></Box>
                    <Box sx={{ flex: 1.5 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Thời gian</Typography></Box>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Tổng tiền</Typography></Box>
                    <Box sx={{ flex: 1 }}><Typography fontSize="12px" fontWeight={700} color={HEADER_TEXT}>Trạng thái</Typography></Box>
                </Box>

                <Box sx={{ flex: 1 }}> {/* Box này chứa các dòng đơn hàng */}
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
                            "& .MuiPaginationItem-root": {
                                fontSize: "10px",      // Chỉnh cỡ chữ nhỏ lại
                                minWidth: "24px",     // Thu hẹp chiều rộng nút
                                height: "24px",       // Thu hẹp chiều cao nút
                                margin: "0 2px",      // Khoảng cách giữa các số sát nhau hơn
                                fontWeight: 500       // Độ đậm của chữ
                            },
                            "& .MuiSvgIcon-root": {
                                fontSize: "14px"      // Chỉnh icon mũi tên (trước/sau) nhỏ lại cho cân đối
                            }
                        }}
                    />
                </Stack>
            </Paper>

            {/* CHI TIẾT BÊN PHẢI */}
            <Paper sx={{
                flex: 1,
                p: 2,
                display: "flex",
                flexDirection: "column", // Chuyển sang cột để đẩy các phần tử
                minHeight: 400
            }}>
                {!selectedOrder ? (
                    <Typography fontSize="13px" color="gray">Chọn đơn để xem chi tiết</Typography>
                ) : (
                    <>
                        {/* Header chi tiết */}
                        <Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography fontSize="13px" fontWeight={700} color={ACTIVE_TEXT}>
                                    #{selectedOrder.id.slice(0, 6)} • Bàn {selectedOrder.table_code}
                                </Typography>
                                <IconButton size="small" onClick={() => setSelectedOrder(null)}><CloseIcon fontSize="inherit" /></IconButton>
                            </Stack>
                            <Typography fontSize="20px" fontWeight={700} mt={1}>
                                {Number(selectedOrder.total_amount).toLocaleString()}₫
                            </Typography>
                            {selectedOrder.customer_name && (
                                <Typography mt={0.5} fontSize="12px" fontWeight={500} color="gray">
                                    Khách hàng: {selectedOrder.customer_name}
                                </Typography>
                            )}
                        </Box>

                        {/* Danh sách món ăn - Dùng flex: 1 để tự chiếm khoảng không còn lại */}
                        <Box sx={{
                            flex: 1,
                            mt: 2,
                            borderTop: "1px dashed #eee",
                            pt: 1,
                            overflowY: "auto" // Nếu quá nhiều món sẽ có scroll tự thân
                        }}>
                            {(showAllItems ? items : items.slice(0, 8)).map((it, i) => (
                                <Stack key={i} direction="row" spacing={1.5} mt={1.5} alignItems="center">
                                    <Box component="img" src={it.image} sx={{ width: 40, height: 40, borderRadius: 1.5, objectFit: "cover" }} />
                                    <Box>
                                        <Typography fontSize="13px" fontWeight={500} lineHeight={1.2}>{it.name}</Typography>
                                        <Typography fontSize="11px" color="gray">Số lượng: x{it.qty}</Typography>
                                    </Box>
                                </Stack>
                            ))}
                            {items.length > 8 && (
                                <Button fullWidth size="small" startIcon={showAllItems ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    onClick={() => setShowAllItems(!showAllItems)} sx={{ mt: 1, fontSize: "11px", textTransform: "none", color: "#A21A16" }}>
                                    {showAllItems ? "Thu gọn" : `Xem thêm ${items.length - 8} món`}
                                </Button>
                            )}
                        </Box>

                        {/* Footer nút bấm - Luôn nằm ở Bottom nhờ flex: 1 ở trên */}
                        {selectedOrder.payment_status !== "paid" && (
                            <Stack direction="row" spacing={1} mt={2} pt={2} sx={{ borderTop: "1px solid #f5f5f5" }}>
                                <Button fullWidth variant="outlined" sx={{ fontSize: "12px", color: "#A21A16", borderColor: "#A21A16", py: 1, fontWeight: 600 }}>
                                    In hóa đơn
                                </Button>
                                <Button fullWidth variant="contained" sx={{ fontSize: "12px", bgcolor: "#A21A16", py: 1, fontWeight: 600, "&:hover": { bgcolor: "#801512" } }}>
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