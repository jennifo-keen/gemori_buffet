import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderOverviewHeaderSection } from "../admin_components/Order/OrderOverviewHeaderSection";
import { OrderStatusFilterTabsSection } from "../admin_components/Order/OrderStatusFilterTabsSection";
import { OrdersListAndDetailSection } from "../admin_components/Order/OrdersListAndDetailSection";
import { ThemeProvider } from "../../users/users_components/layout/ThemeProvider";

const OrderPage = () => {
    const [status, setStatus] = useState(null);
    const [counts, setCounts] = useState({ all: 0, ordering: 0, paid: 0 });

    useEffect(() => {
        // Định nghĩa hàm async ngay bên trong useEffect
        const fetchAndCountOrders = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/admin/orders");
                const json = await res.json();
                const data = json.data || [];

                const ordering = data.filter(o =>
                    o.payment_status !== 'paid' && o.order_status !== 'paid'
                ).length;

                const paid = data.filter(o =>
                    o.payment_status === 'paid' || o.order_status === 'paid'
                ).length;

                setCounts({
                    all: data.length,
                    ordering: ordering,
                    paid: paid
                });
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
            }
        };

        fetchAndCountOrders();
    }, []); // Để mảng rỗng ở đây, linter sẽ KHÔNG báo đỏ nữa vì không phụ thuộc hàm bên ngoài

    return (
        <ThemeProvider>
            <Stack spacing={3} sx={{ p: 3 }}>
                <OrderOverviewHeaderSection />
                <OrderStatusFilterTabsSection onChange={setStatus} counts={counts} />
                <OrdersListAndDetailSection filterStatus={status} />
            </Stack>
        </ThemeProvider>
    );
};

export default OrderPage;