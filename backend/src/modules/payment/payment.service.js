const { pool } = require('../../lib/db');
const { validateVoucher, useVoucher } = require('../vouchers/vouchers.service');

const processPayment = async ({ orderId, paymentMethod, phone, voucherCode }) => {
  // 1. Lấy order
  const orderResult = await pool.query(
    `SELECT o.*, bt.price AS ticket_price
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     WHERE o.id = $1`,
    [orderId]
  );

  const order = orderResult.rows[0];
  if (!order) throw { status: 404, message: 'Hóa đơn không tồn tại' };
  if (order.status !== 'ordering') throw { status: 400, message: 'Hóa đơn không ở trạng thái ordering' };

  const baseAmount = order.ticket_price * order.ticket_quantity;
  let discountAmount = 0;
  let voucherId = null;
  let customerId = null;

  // 2. Tìm khách hàng thành viên theo SĐT
  if (phone) {
    const customerResult = await pool.query(
      'SELECT id FROM customers WHERE phone = $1',
      [phone]
    );
    if (customerResult.rows[0]) customerId = customerResult.rows[0].id;
  }

  // 3. Áp voucher nếu có
  if (voucherCode) {
    const { voucher, discountAmount: disc } = await validateVoucher(voucherCode, baseAmount);
    discountAmount = disc;
    voucherId = voucher.id;
  }

  const totalAmount = baseAmount - discountAmount;

  // 4. Cập nhật order
  await pool.query(
    `UPDATE orders
     SET status = 'paid',
         customer_id = $1,
         voucher_id = $2,
         total_amount = $3
     WHERE id = $4`,
    [customerId, voucherId, totalAmount, orderId]
  );

  // 5. Tạo payment
  const paymentResult = await pool.query(
    `INSERT INTO payments (order_id, payment_method, amount, paid_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [orderId, paymentMethod, totalAmount]
  );

  // 6. Đóng bàn
  await pool.query(
    `UPDATE tables SET status = 'empty' WHERE id = $1`,
    [order.table_id]
  );

  // 7. Trừ số lượng voucher nếu có
  if (voucherId) await useVoucher(voucherId);

  return {
    payment: paymentResult.rows[0],
    summary: {
      base_amount: baseAmount,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      payment_method: paymentMethod,
    },
  };
};

module.exports = { processPayment };