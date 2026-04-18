import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// ===== STYLE CONFIG =====
const HEADER_BG = "#FFF7F4";
const HEADER_TEXT = "#A21A16";
const ROW_ACTIVE = "#FFE5DF";

// ===== STATUS =====
const STATUS_CONFIG = {
    ordering: {
        label: "Đang phục vụ",
        bg: "#dbeafe",
        text: "#1d4ed8",
    },
    paid: {
        label: "Đã thanh toán",
        bg: "#d1fae5",
        text: "#047857",
    },
};

// 🔥 FIX: ưu tiên payment_status
const mapStatus = (orderStatus, paymentStatus) => {
    if (paymentStatus === "paid") return "paid";
    return orderStatus === "paid" ? "paid" : "ordering";
};

const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status];

    return (
        <Box
            sx={{
                px: 1.2,
                py: 0.4,
                borderRadius: "999px",
                bgcolor: cfg.bg,
                width: "fit-content",
            }}
        >
            <Typography fontSize="11px" fontWeight={600} color={cfg.text}>
                {cfg.label}
            </Typography>
        </Box>
    );
};

// ===== MAIN =====
export const OrdersListAndDetailSection = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const BASE_URL = "http://localhost:3000/api/admin";

    // ===== FORMAT DATE =====
    const formatDate = (date) => {
        const d = new Date(date);
        return (
            d.toLocaleDateString("vi-VN") +
            " • " +
            d.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    };

    // ===== LOAD DETAIL =====
    const handleSelect = async (id) => {
        setSelectedId(id);

        const res = await fetch(`${BASE_URL}/orders/${id}`);
        const json = await res.json();
        const data = json.data;

        setSelectedOrder(data);

        // 🔥 GROUP ITEM
        const grouped = {};
        data.items.forEach((item) => {
            const key = item.menu_id;

            if (!grouped[key]) {
                grouped[key] = {
                    name: item.menu_name,
                    image: item.image,
                    qty: 0,
                };
            }

            grouped[key].qty += item.quantity;
        });

        setItems(Object.values(grouped));
    };

    // ===== LOAD LIST =====
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`${BASE_URL}/orders`);
            const json = await res.json();

            const mapped = json.data.map((o) => ({
                id: o.id,
                code: `#ORD-${o.id.slice(0, 6)}`,
                table: o.table_code,
                time: formatDate(o.order_time),
                total: Number(o.total_amount).toLocaleString() + "₫",

                // 🔥 FIX CHÍNH
                status: mapStatus(o.order_status, o.payment_status),
            }));

            setOrders(mapped);

            if (mapped.length) handleSelect(mapped[0].id);
        };

        fetchOrders();
    }, []);

    return (
        <Stack direction="row" spacing={2}>
            {/* ===== LEFT TABLE ===== */}
            <Paper sx={{ flex: 2, overflow: "hidden" }}>
                {/* HEADER */}
                <Box
                    sx={{
                        display: "flex",
                        p: 1.5,
                        bgcolor: HEADER_BG,
                        borderBottom: "1px solid #f1f1f1",
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={700} color={HEADER_TEXT}>
                            Mã đơn
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={700} color={HEADER_TEXT}>
                            Bàn
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        <Typography fontWeight={700} color={HEADER_TEXT}>
                            Thời gian
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={700} color={HEADER_TEXT}>
                            Tổng tiền
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={700} color={HEADER_TEXT}>
                            Trạng thái
                        </Typography>
                    </Box>
                </Box>

                {/* ROW */}
                {orders.map((o) => (
                    <Box
                        key={o.id}
                        onClick={() => handleSelect(o.id)}
                        sx={{
                            display: "flex",
                            p: 1.5,
                            borderTop: "1px solid #f5f5f5",
                            cursor: "pointer",
                            bgcolor:
                                selectedId === o.id
                                    ? ROW_ACTIVE
                                    : "transparent",
                            "&:hover": { bgcolor: "#fafafa" },
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={600}>
                                {o.code}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography>Bàn {o.table}</Typography>
                        </Box>

                        <Box sx={{ flex: 2 }}>
                            <Typography fontSize="13px">
                                {o.time}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={600}>
                                {o.total}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <StatusBadge status={o.status} />
                        </Box>

                        <ChevronRightIcon fontSize="small" />
                    </Box>
                ))}
            </Paper>

            {/* ===== RIGHT DETAIL ===== */}
            <Paper sx={{ flex: 1, p: 2 }}>
                {!selectedOrder ? (
                    <Typography>Chọn đơn</Typography>
                ) : (
                    <>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography fontWeight={700}>
                                #{selectedOrder.id.slice(0, 6)} • Bàn{" "}
                                {selectedOrder.table_code}
                            </Typography>

                            <IconButton size="small">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Stack>

                        <Typography mt={1} fontSize="13px" color="gray">
                            {formatDate(selectedOrder.order_time)}
                        </Typography>

                        <Typography mt={1} fontWeight={700} fontSize="18px">
                            {Number(
                                selectedOrder.total_amount
                            ).toLocaleString()}
                            ₫
                        </Typography>

                        {/* 🔥 CUSTOMER */}
                        {selectedOrder.customer_name && (
                            <Typography mt={1} fontSize="13px">
                                Khách: {selectedOrder.customer_name}
                            </Typography>
                        )}

                        {/* 🔥 PAYMENT */}
                        {selectedOrder.payment_status === "paid" && (
                            <Typography mt={1} fontSize="13px" color="green">
                                Đã thanh toán •{" "}
                                {selectedOrder.payment_method}
                            </Typography>
                        )}

                        {/* ITEMS */}
                        {items.slice(0, 10).map((it, i) => (
                            <Stack key={i} direction="row" spacing={1} mt={2}>
                                <Box
                                    component="img"
                                    src={it.image}
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: 1,
                                    }}
                                />
                                <Box>
                                    <Typography fontSize="13px">
                                        {it.name}
                                    </Typography>
                                    <Typography fontSize="11px" color="gray">
                                        x{it.qty}
                                    </Typography>
                                </Box>
                            </Stack>
                        ))}

                        {/* MORE */}
                        {items.length > 10 && (
                            <Stack direction="row" spacing={1} mt={2}>
                                <MoreHorizIcon />
                                <Typography fontSize="12px">
                                    Và {items.length - 10} món khác...
                                </Typography>
                            </Stack>
                        )}

                        {/* 🔥 ACTION FIX */}
                        {selectedOrder.payment_status !== "paid" && (
                            <Stack direction="row" spacing={1} mt={3}>
                                <Button fullWidth variant="outlined">
                                    In hóa đơn
                                </Button>
                                <Button fullWidth variant="contained">
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