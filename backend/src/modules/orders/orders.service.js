const { pool } = require('../../lib/db');

// Xem chi tiết 1 order — Web 3
const getOrderById = async (orderId) => {
  const orderResult = await pool.query(
    `SELECT o.*,
      t.table_code,
      bt.name AS ticket_name, bt.price AS ticket_price,
      c.full_name AS customer_name, c.phone AS customer_phone,
      v.code AS voucher_code
     FROM orders o
     LEFT JOIN tables t ON o.table_id = t.id
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     LEFT JOIN customers c ON o.customer_id = c.id
     LEFT JOIN vouchers v ON o.voucher_id = v.id
     WHERE o.id = $1`,
    [orderId]
  );

  const order = orderResult.rows[0];
  if (!order) throw { status: 404, message: 'Hóa đơn không tồn tại' };

  const itemsResult = await pool.query(
    `SELECT oi.*, m.name AS menu_name, m.image_url, m.category
     FROM order_items oi
     LEFT JOIN menus m ON oi.menu_id = m.id
     WHERE oi.order_id = $1
     ORDER BY oi.id ASC`,
    [order.id]
  );

  return { ...order, items: itemsResult.rows };
};

// Lấy tất cả order — Web 4
const getAllOrders = async ({ status }) => {
  let query = `
    SELECT o.*,
      t.table_code,
      bt.name AS ticket_name,
      c.full_name AS customer_name, c.phone AS customer_phone
    FROM orders o
    LEFT JOIN tables t ON o.table_id = t.id
    LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
    LEFT JOIN customers c ON o.customer_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (status) {
    query += ` AND o.status = $1`;
    params.push(status);
  }

  query += ' ORDER BY o.id DESC';

  const result = await pool.query(query, params);
  return result.rows;
};

module.exports = { getOrderById, getAllOrders };