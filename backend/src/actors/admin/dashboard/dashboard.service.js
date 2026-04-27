const { pool } = require("../../../config/db");

// ===== FORMATTERS =====
const formatOrders = (rows) => rows.map(o => ({
    code: `#OD-${o.id.slice(0, 6)}`,
    customer: o.customer_name || "Khách lẻ",
    table: o.table_code,
    total: Number(o.total_amount || 0).toLocaleString("vi-VN") + "đ",
    status: o.status_type === "paid" ? "ĐÃ THANH TOÁN" : "ĐANG PHỤC VỤ",
    statusType: o.status_type
}));

const formatTopDishes = (rows) => rows.map((d, index) => ({
    image: d.image_url,
    name: d.name,
    count: `${d.total_ordered} lượt gọi`,
    rank: `#${index + 1}`
}));

const formatChartByHour = (rows) => {
    const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const map = {};
    rows.forEach(r => {
        const hourStr = `${r.hour.toString().padStart(2, '0')}:00`;
        map[hourStr] = Number(r.revenue || 0) / 1000000;
    });
    return hours.map(h => map[h] || 0);
};

const formatInventoryAlerts = (rows) => rows.map(item => ({
    // Đổi title thành tên món ăn
    title: item.name,

    // Đổi time thành dòng thông báo chi tiết
    time: `${Number(item.stock_quantity) === 0 ? 'Hết hàng' : 'Sắp hết'} | Kho: ${item.stock_quantity} / Định mức: ${item.min_quantity}`,

    isCritical: Number(item.stock_quantity) === 0
}));

// ===== MAIN SERVICE =====
const getDashboard = async (selectedDate) => {
    try {
        // Lấy ngày hiện tại hệ thống (YYYY-MM-DD)
        const today = new Date().toLocaleDateString('en-CA');

        // Ngày cho biểu đồ (mặc định là hôm nay nếu FE không gửi)
        const chartDate = selectedDate || today;

        // 1. Stats: Lọc theo hôm nay (Sử dụng ::date để rõ ràng kiểu dữ liệu)
        const statsQuery = `
            SELECT 
                COALESCE(SUM(amount), 0) AS total_revenue,
                (SELECT COUNT(*) FROM orders WHERE order_time::date = $1::date) AS total_orders
            FROM payments 
            WHERE status = 'paid' AND paid_at::date = $1::date;
        `;

        // 2. Bàn hoạt động
        const tableQuery = `SELECT COUNT(*) FILTER (WHERE status != 'closed') AS active_tables, COUNT(*) AS total_tables FROM tables;`;

        // 3. Đơn hàng mới nhất hôm nay
        const orderQuery = `
            SELECT o.id, o.total_amount, c.full_name AS customer_name, t.table_code,
                   CASE WHEN p.status = 'paid' THEN 'paid' ELSE 'serving' END AS status_type
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            LEFT JOIN tables t ON o.table_id = t.id
            LEFT JOIN payments p ON p.order_id = o.id
            WHERE o.order_time::date = $1::date
            ORDER BY o.order_time DESC LIMIT 10;
        `;

        // 4. BIỂU ĐỒ: Lọc theo NGÀY CHỌN (chartDate)
        const chartQuery = `
            SELECT 
                EXTRACT(HOUR FROM paid_at) AS hour,
                SUM(amount) AS revenue
            FROM payments
            WHERE status = 'paid' AND paid_at::date = $1::date
            GROUP BY hour
            ORDER BY hour;
        `;

        // 5. Cảnh báo kho
        const inventoryQuery = `
    SELECT m.name, m.image_url, i.stock_quantity, i.min_quantity
    FROM inventory i JOIN menus m ON i.menu_id = m.id
    WHERE i.stock_quantity <= i.min_quantity
    ORDER BY i.stock_quantity ASC LIMIT 5;
`;

        // 6. Top món hôm nay
        const topDishQuery = `
            SELECT m.name, m.image_url, SUM(oi.quantity) as total_ordered
            FROM order_items oi
            JOIN menus m ON oi.menu_id = m.id
            JOIN orders o ON oi.order_id = o.id
            WHERE o.order_time::date = $1::date
            GROUP BY m.id, m.name, m.image_url
            ORDER BY total_ordered DESC LIMIT 3;
        `;

        // Chạy song song, lưu ý truyền đúng biến cho từng query
        const [statsRes, tableRes, ordersRes, chartRes, inventoryRes, dishesRes] = await Promise.all([
            pool.query(statsQuery, [today]),
            pool.query(tableQuery),
            pool.query(orderQuery, [today]),
            pool.query(chartQuery, [chartDate]), // Chỉ truyền chartDate cho biểu đồ
            pool.query(inventoryQuery),
            pool.query(topDishQuery, [today])
        ]);

        return {
            selectedChartDate: chartDate,
            todayDate: today,
            totalRevenue: Number(statsRes.rows[0].total_revenue),
            dailyOrders: Number(statsRes.rows[0].total_orders),
            activeTables: Number(tableRes.rows[0].active_tables),
            totalTables: Number(tableRes.rows[0].total_tables),
            orders: formatOrders(ordersRes.rows),
            topDishes: formatTopDishes(dishesRes.rows),
            chart: formatChartByHour(chartRes.rows),
            inventoryAlerts: formatInventoryAlerts(inventoryRes.rows)
        };
    } catch (err) {
        console.error("Dashboard Service Error:", err);
        throw err;
    }
};

module.exports = { getDashboard };