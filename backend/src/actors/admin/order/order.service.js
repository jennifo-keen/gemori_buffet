const { pool } = require("../../../config/db");

// 🔥 Lấy danh sách đơn
const getOrders = async (status) => {
    let query = `
        SELECT 
            o.id,
            o.table_id,
            t.table_code,
            o.order_time,
            o.total_amount,
            o.status AS order_status,
            o.customer_id,

            -- ✅ CUSTOMER
            COALESCE(c.full_name, 'Khách lẻ') AS customer_name,

            -- ✅ PAYMENT (lấy record mới nhất)
            p.status AS payment_status,
            p.payment_method,

            COUNT(oi.id) as dish_count

        FROM public.orders o
        JOIN public.tables t ON o.table_id = t.id

        LEFT JOIN public.order_items oi ON oi.order_id = o.id

        -- 🔥 FIX QUAN TRỌNG: lấy payment mới nhất
        LEFT JOIN LATERAL (
            SELECT *
            FROM public.payments
            WHERE order_id = o.id
            ORDER BY paid_at DESC NULLS LAST
            LIMIT 1
        ) p ON true

        LEFT JOIN public.customers c ON o.customer_id = c.id
    `;

    const params = [];

    if (status) {
        query += ` WHERE o.status = $1`;
        params.push(status);
    }

    query += `
        GROUP BY 
            o.id,
            t.table_code,
            c.full_name,
            p.status,
            p.payment_method

        ORDER BY o.order_time DESC
    `;

    const { rows } = await pool.query(query, params);
    return rows;
};
// 🔥 Chi tiết đơn
const getOrderDetail = async (orderId) => {
    const orderQuery = `
        SELECT 
            o.*, 
            t.table_code,

            -- ✅ CUSTOMER
            COALESCE(c.full_name, 'Khách lẻ') AS customer_name,
            c.phone AS customer_phone,

            -- ✅ PAYMENT (mới nhất)
            p.status AS payment_status,
            p.payment_method

        FROM public.orders o
        JOIN public.tables t ON o.table_id = t.id

        LEFT JOIN LATERAL (
            SELECT *
            FROM public.payments
            WHERE order_id = o.id
            ORDER BY paid_at DESC NULLS LAST
            LIMIT 1
        ) p ON true

        LEFT JOIN public.customers c ON o.customer_id = c.id

        WHERE o.id = $1
    `;

    const itemsQuery = `
        SELECT 
            oi.*, 
            m.name as menu_name,
            m.image_url as image
        FROM public.order_items oi
        LEFT JOIN public.menus m ON oi.menu_id = m.id
        WHERE oi.order_id = $1
    `;

    const { rows: orderRows } = await pool.query(orderQuery, [orderId]);
    const { rows: items } = await pool.query(itemsQuery, [orderId]);

    return {
        ...orderRows[0],
        items,
    };
};
// 🔥 Update status
const updateOrderStatus = async (orderId, status) => {
    const query = `
        UPDATE public.orders
        SET status = $1
        WHERE id = $2
        RETURNING *
    `;

    const { rows } = await pool.query(query, [status, orderId]);
    return rows[0];
};

module.exports = {
    getOrders,
    getOrderDetail,
    updateOrderStatus,
};