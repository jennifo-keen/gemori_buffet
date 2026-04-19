// zalopay.controller.js
const zalopayService = require('../services/zalopay.service');
const { pool } = require('../../../config/db');

// Tạo đơn ZaloPay
const createOrder = async (req, res, next) => {
  try {
    const { orderId, tableCode } = req.body;
    if (!orderId || !tableCode)
      return res.status(400).json({ message: 'Thiếu orderId hoặc tableCode' });

    const orderRes = await pool.query(
      `SELECT o.ticket_quantity, bt.price AS ticket_price
       FROM orders o
       LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
       WHERE o.id = $1 AND o.status = 'ordering'`,
      [orderId]
    );
    const order = orderRes.rows[0];
    if (!order) return res.status(404).json({ message: 'Order không tồn tại' });

    const amount = order.ticket_price * order.ticket_quantity;
    const result = await zalopayService.createZaloPayOrder({ orderId, amount, tableCode });
    res.json(result);
  } catch (err) { next(err); }
};

// ZaloPay callback — KHÔNG cần auth, ZaloPay server gọi trực tiếp
const callback = async (req, res) => {
  try {
    const { data, mac } = req.body;
    const result = await zalopayService.handleCallback(data, mac);
    res.json(result);
  } catch (err) {
    res.json({ return_code: -1, return_message: err.message });
  }
};

// Verify redirect — staff gọi sau khi ZaloPay redirect về
const verifyRedirect = (req, res) => {
  try {
    const { query } = req.body; // toàn bộ query params từ URL redirect
    const valid = zalopayService.verifyRedirect(query);
    res.json({ valid });
  } catch (err) {
    res.status(500).json({ valid: false, message: err.message });
  }
};

module.exports = { createOrder, callback, verifyRedirect };