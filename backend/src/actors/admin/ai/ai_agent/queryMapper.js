module.exports = {

    revenue_today: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) = CURRENT_DATE
    `,

    order_count: `
        SELECT COUNT(*) as total
        FROM orders
        WHERE DATE(order_time) = CURRENT_DATE
    `,

    top_dish: `
        SELECT m.name, SUM(oi.quantity) as total
        FROM order_items oi
        JOIN menus m ON oi.menu_id = m.id
        GROUP BY m.name
        ORDER BY total DESC
        LIMIT 5
    `,

    top_dish_limit: (limit) => `
        SELECT m.name, SUM(oi.quantity) as total
        FROM order_items oi
        JOIN menus m ON oi.menu_id = m.id
        GROUP BY m.name
        ORDER BY total DESC
        LIMIT ${limit}
    `,

    revenue_range: `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) BETWEEN $1 AND $2
    `,

    compare_week: `
        SELECT
        (SELECT COALESCE(SUM(amount),0)
         FROM payments
         WHERE DATE_TRUNC('week', paid_at) = DATE_TRUNC('week', CURRENT_DATE)
        ) as this_week,

        (SELECT COALESCE(SUM(amount),0)
         FROM payments
         WHERE DATE_TRUNC('week', paid_at) = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week')
        ) as last_week
    `
};