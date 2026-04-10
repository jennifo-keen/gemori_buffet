module.exports = {

    // ================= DOANH THU =================

    revenue_today: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) = CURRENT_DATE
    `,

    revenue_yesterday: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) = CURRENT_DATE - INTERVAL '1 day'
    `,

    revenue_month: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE_TRUNC('month', paid_at) = DATE_TRUNC('month', CURRENT_DATE)
    `,

    revenue_last_month: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE_TRUNC('month', paid_at) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    `,

    revenue_by_date: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) = $1
    `,

    // ================= ĐƠN HÀNG =================

    order_count: `
        SELECT COUNT(*) as total
        FROM orders
        WHERE DATE(order_time) = CURRENT_DATE
    `,

    // ================= TOP / LOW MÓN =================

    top_dish: `
        SELECT m.name, SUM(oi.quantity) as total
        FROM order_items oi
        JOIN menus m ON oi.menu_id = m.id
        WHERE DATE(oi.item_order_time) = CURRENT_DATE
        GROUP BY m.name
        ORDER BY total DESC
        LIMIT 5
    `,

    low_dish: `
        SELECT m.name, SUM(oi.quantity) as total
        FROM order_items oi
        JOIN menus m ON oi.menu_id = m.id
        WHERE DATE(oi.item_order_time) = CURRENT_DATE
        GROUP BY m.name
        ORDER BY total ASC
        LIMIT 5
    `,

    // ================= DỰ BÁO =================

    forecast: `
        SELECT m.name, f.predicted_quantity as total
        FROM forecast_results f
        JOIN menus m ON f.menu_id = m.id
        WHERE f.forecast_date = CURRENT_DATE
        ORDER BY total DESC
        LIMIT 5
    `,

    // ================= TỒN KHO =================

    inventory_low: `
        SELECT m.name, i.stock_quantity as total
        FROM inventory i
        JOIN menus m ON i.menu_id = m.id
        WHERE i.stock_quantity <= i.min_quantity
    `,

    // ================= SUMMARY =================

    business_summary: `
        SELECT 
            (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE(paid_at) = CURRENT_DATE) as revenue,
            (SELECT COUNT(*) FROM orders WHERE DATE(order_time) = CURRENT_DATE) as orders
    `
};