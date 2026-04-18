import { Stack } from "@mui/material";
import { useState } from "react";
import { OrderOverviewHeaderSection } from "../admin_components/Order/OrderOverviewHeaderSection";
import { OrderStatusFilterTabsSection } from "../admin_components/Order/OrderStatusFilterTabsSection";
import { OrdersListAndDetailSection } from "../admin_components/Order/OrdersListAndDetailSection";
import { ThemeProvider } from "../../users/users_components/layout/ThemeProvider";

const OrderPage = () => {
    const [status, setStatus] = useState(null);

    return (
        <ThemeProvider>
            <Stack spacing={3} sx={{ p: 3 }}>
                <OrderOverviewHeaderSection />
                <OrderStatusFilterTabsSection onChange={setStatus} />
                <OrdersListAndDetailSection status={status} />
            </Stack>
        </ThemeProvider>
    );
};

export default OrderPage;