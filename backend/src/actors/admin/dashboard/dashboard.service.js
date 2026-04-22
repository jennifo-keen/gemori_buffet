const { pool } = require("../../../config/db");

// ===== FORMAT =====
const formatOrders = (rows) => {
    return rows.map(o => ({
        code: `#OD-${o.id.slice(0, 6)}`,
        customer: o.customer_name || "Khách lẻ",
        table: o.table_code,
        total: Number(o.total_amount || 0).toLocaleString("vi-VN") + "đ",
        status: o.status_type === "paid" ? "ĐÃ THANH TOÁN" : "ĐANG PHỤC VỤ",
        statusType: o.status_type
    }));
};

const formatTopDishes = (rows) => {
    return rows.map((d, index) => ({
        image: d.image_url,
        name: d.name,
        count: `${d.total_ordered} lượt gọi`,
        rank: `#${index + 1}`
    }));
};

const formatChart = (rows) => {
    const hours = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

    const map = {};
    rows.forEach(r => {
        map[`${r.hour}:00`] = Number(r.revenue);
    });

    return hours.map(h => map[h] || 0);
};

// ===== SERVICE =====
const getDashboard = async (date) => {
    try {
        const selectedDate = date || new Date().toISOString().slice(0, 10);

        // 🔥 stats = hôm nay
        const statsQuery = `
            SELECT 
                COALESCE(SUM(o.total_amount),0) AS total_revenue,
                COUNT(o.id) AS total_orders
            FROM orders o
            WHERE o.order_time::date = CURRENT_DATE;
        `;

        // 🔥 bàn hoạt động = tất cả bàn KHÔNG closed
        const tableQuery = `
            SELECT 
                COUNT(*) FILTER (WHERE status != 'closed') AS active_tables,
                COUNT(*) AS total_tables
            FROM tables;
        `;

        // 🔥 đơn hôm nay
        const orderQuery = `
            SELECT 
                o.id,
                o.total_amount,
                c.full_name AS customer_name,
                t.table_code,
                CASE 
                    WHEN p.status = 'paid' THEN 'paid'
                    WHEN o.status = 'ordering' THEN 'serving'
                    ELSE 'pending'
                END AS status_type
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            LEFT JOIN tables t ON o.table_id = t.id
            LEFT JOIN payments p ON p.order_id = o.id
            WHERE o.order_time::date = CURRENT_DATE
            ORDER BY o.order_time DESC
            LIMIT 10;
        `;

        // 🔥 chart theo date (CHỈ cái này dùng date picker)
        const chartQuery = `
            SELECT 
                EXTRACT(HOUR FROM o.order_time) AS hour,
                SUM(o.total_amount) AS revenue
            FROM orders o
            JOIN payments p ON p.order_id = o.id
            WHERE p.status = 'paid'
            AND o.order_time::date = $1
            GROUP BY hour
            ORDER BY hour;
        `;

        // 🔥 top món
        const topDishQuery = `
            SELECT 
                m.name,
                m.image_url,
                SUM(oi.quantity) as total_ordered
            FROM order_items oi
            JOIN menus m ON oi.menu_id = m.id
            GROUP BY m.id
            ORDER BY total_ordered DESC
            LIMIT 3;
        `;

        // 🔥 khách mới hôm nay
        const customerQuery = `
            SELECT COUNT(*) as new_customers
            FROM customers
            WHERE created_at::date = CURRENT_DATE;
        `;

        const [
            statsRes,
            tableRes,
            ordersRes,
            chartRes,
            dishesRes,
            customerRes
        ] = await Promise.all([
            pool.query(statsQuery),
            pool.query(tableQuery),
            pool.query(orderQuery),
            pool.query(chartQuery, [selectedDate]),
            pool.query(topDishQuery),
            pool.query(customerQuery)
        ]);

        return {
            totalRevenue: Number(statsRes.rows[0].total_revenue),
            dailyOrders: Number(statsRes.rows[0].total_orders),

            activeTables: Number(tableRes.rows[0].active_tables),
            totalTables: Number(tableRes.rows[0].total_tables),

            newCustomers: Number(customerRes.rows[0].new_customers),

            orders: formatOrders(ordersRes.rows),
            topDishes: formatTopDishes(dishesRes.rows),
            chart: formatChart(chartRes.rows)
        };

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { getDashboard };