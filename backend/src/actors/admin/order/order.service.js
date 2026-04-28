const { pool } = require("../../../config/db");

// 🔥 Lấy danh sách đơn
const getOrders = async (status, date) => { // ✅ Nhớ thêm tham số date vào hàm
    let query = `
        SELECT 
            o.id,
            o.table_id,
            t.table_code,
            o.order_time,
            o.total_amount,
            o.status AS order_status,
            o.customer_id,
            COALESCE(c.full_name, 'Khách lẻ') AS customer_name,
            p.status AS payment_status,
            p.payment_method,
            COUNT(oi.id) as dish_count
        FROM public.orders o
        JOIN public.tables t ON o.table_id = t.id
        LEFT JOIN public.order_items oi ON oi.order_id = o.id
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
    const whereClauses = []; // ✅ Phải khai báo mảng này trước

    // 1. Xử lý status
    if (status) {
        params.push(status);
        whereClauses.push(`o.status = $${params.length}`);
    }

    // 2. Xử lý date (Chỉ thêm nếu date có giá trị và không phải chuỗi rỗng)
    if (date && date.trim() !== "") {
        params.push(date);
        whereClauses.push(`DATE(o.order_time) = $${params.length}`);
    }

    // ✅ Nối các điều kiện WHERE lại với nhau
    if (whereClauses.length > 0) {
        query += ` WHERE ` + whereClauses.join(" AND ");
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
// 🔥 Xóa đơn hàng
const deleteOrder = async (orderId) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // 1. Tìm table_id của đơn hàng này trước khi xóa đơn
        const findTableQuery = `SELECT table_id FROM public.orders WHERE id = $1`;
        const tableRes = await client.query(findTableQuery, [orderId]);

        if (tableRes.rows.length === 0) {
            throw new Error("ORDER_NOT_FOUND");
        }

        const tableId = tableRes.rows[0].table_id;

        // 2. Xóa các món ăn trong đơn
        await client.query(`DELETE FROM public.order_items WHERE order_id = $1`, [orderId]);

        // 3. Xóa các payment liên quan
        await client.query(`DELETE FROM public.payments WHERE order_id = $1`, [orderId]);

        // 4. Xóa đơn hàng
        const deleteRes = await client.query(`DELETE FROM public.orders WHERE id = $1`, [orderId]);

        // 5. 🔥 QUAN TRỌNG: Cập nhật trạng thái bàn về 'available' (hoặc 'free')
        // Tùy vào giá trị ông quy định trong DB nhé (thường là available)
        await client.query(`UPDATE public.tables SET status = 'empty' WHERE id = $1`, [tableId]);

        await client.query("COMMIT");
        return deleteRes.rowCount > 0;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};
module.exports = {
    getOrders,
    getOrderDetail,
    updateOrderStatus,
    deleteOrder,
};
