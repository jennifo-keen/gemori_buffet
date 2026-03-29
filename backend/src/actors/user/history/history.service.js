    const { pool } = require("../../../config/db");

const getCustomerOrderHistory = async ({ customerId, limit = 10, page = 1 }) => {
  const offset = (page - 1) * limit;

  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM orders o
    WHERE o.customer_id = $1
  `;

  const historyQuery = `
    SELECT
      o.id,
      o.order_time,
      o.ticket_quantity,
      o.total_amount,
      o.status,
      bt.name AS buffet_name,
      bt.price AS buffet_price,
      p.payment_method,
      p.paid_at,
      p.status AS payment_status
    FROM orders o
    LEFT JOIN buffet_tickets bt ON bt.id = o.buffet_ticket_id
    LEFT JOIN LATERAL (
      SELECT payment_method, paid_at, status
      FROM payments
      WHERE order_id = o.id
      ORDER BY paid_at DESC NULLS LAST
      LIMIT 1
    ) p ON true
    WHERE o.customer_id = $1
    ORDER BY COALESCE(p.paid_at, o.order_time) DESC
    LIMIT $2 OFFSET $3
  `;

  const [countResult, historyResult] = await Promise.all([
    pool.query(countQuery, [customerId]),
    pool.query(historyQuery, [customerId, limit, offset]),
  ]);

  return {
    data: historyResult.rows,
    pagination: {
      page,
      limit,
      total: countResult.rows[0]?.total || 0,
      totalPages: Math.ceil((countResult.rows[0]?.total || 0) / limit),
    },
  };
};

const getOrderDetail = async ({ orderId, customerId }) => {
  const orderQuery = `
    SELECT
      o.id,
      o.order_time,
      o.ticket_quantity,
      o.total_amount,
      o.status,
      bt.name AS buffet_name,
      bt.price AS buffet_price,
      t.table_code,
      v.code AS voucher_code,
      p.payment_method,
      p.amount AS payment_amount,
      p.paid_at,
      p.status AS payment_status
    FROM orders o
    LEFT JOIN buffet_tickets bt ON bt.id = o.buffet_ticket_id
    LEFT JOIN tables t ON t.id = o.table_id
    LEFT JOIN vouchers v ON v.id = o.voucher_id
    LEFT JOIN LATERAL (
      SELECT payment_method, amount, paid_at, status
      FROM payments
      WHERE order_id = o.id
      ORDER BY paid_at DESC NULLS LAST
      LIMIT 1
    ) p ON true
    WHERE o.id = $1 AND o.customer_id = $2
    LIMIT 1
  `;

  const itemsQuery = `
    SELECT
      oi.id,
      oi.quantity,
      oi.status,
      oi.item_order_time,
      m.name AS menu_name,
      m.category
    FROM order_items oi
    LEFT JOIN menus m ON m.id = oi.menu_id
    WHERE oi.order_id = $1
    ORDER BY oi.item_order_time ASC
  `;

  const [orderResult, itemsResult] = await Promise.all([
    pool.query(orderQuery, [orderId, customerId]),
    pool.query(itemsQuery, [orderId]),
  ]);

  if (orderResult.rows.length === 0) {
    return null;
  }

  const order = orderResult.rows[0];

  const buffetLine =
    order.buffet_name && order.buffet_price && order.ticket_quantity
      ? {
          name: order.buffet_name,
          quantity: order.ticket_quantity,
          unit_price: Number(order.buffet_price),
          line_total: Number(order.buffet_price) * Number(order.ticket_quantity),
        }
      : null;

  return {
    order,
    buffetLine,
    extraItems: itemsResult.rows,
  };
};

module.exports = {
  getCustomerOrderHistory,
  getOrderDetail,
};