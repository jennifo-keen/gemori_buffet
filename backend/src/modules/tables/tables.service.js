const { pool } = require('../../lib/db');
const { getIO } = require('../../lib/socket');

// Lấy tất cả bàn
const getAllTables = async () => {
  const result = await pool.query(
    'SELECT * FROM tables ORDER BY table_code ASC'
  );
  return result.rows;
};

// Mở bàn — Web 3
const openTable = async (tableId) => {
  // Kiểm tra bàn tồn tại
  const check = await pool.query('SELECT * FROM tables WHERE id = $1', [tableId]);
  const table = check.rows[0];
  if (!table) throw { status: 404, message: 'Bàn không tồn tại' };
  if (table.status === 'ordering') throw { status: 400, message: 'Bàn đang có khách' };

  // QR code trỏ về Web 1
  const qrCode = `${process.env.CLIENT_URL || 'http://localhost:5173'}/table/${tableId}`;

  const result = await pool.query(
    `UPDATE tables SET status = 'ordering', qr_code = $1 WHERE id = $2 RETURNING *`,
    [qrCode, tableId]
  );
  try {
    const io = getIO();
    io.to('staff').emit('table_status_changed', {
      tableId,
      status: 'ordering',
    });
  } catch (e) { console.error('Socket error:', e.message); }

  return result.rows[0];
};


// Đóng bàn — Web 3 (sau thanh toán)
const closeTable = async (tableId) => {
  const result = await pool.query(
    `UPDATE tables SET status = 'empty' WHERE id = $1 RETURNING *`,
    [tableId]
  );
  if (!result.rows[0]) throw { status: 404, message: 'Bàn không tồn tại' };
   // ✅ Emit realtime
  try {
    const io = getIO();
    io.to('staff').emit('table_status_changed', {
      tableId,
      status: 'empty',
    });
  } catch (e) { console.error('Socket error:', e.message); }

  return result.rows[0];
};

// Xem order đang chạy của bàn — Web 3
const getTableCurrentOrder = async (tableId) => {
  // Lấy order đang ordering
  const orderResult = await pool.query(
    `SELECT o.*,
      bt.name AS ticket_name, bt.price AS ticket_price,
      c.full_name AS customer_name, c.phone AS customer_phone,
      v.code AS voucher_code, v.discount_type, v.discount_value
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     LEFT JOIN customers c ON o.customer_id = c.id
     LEFT JOIN vouchers v ON o.voucher_id = v.id
     WHERE o.table_id = $1 AND o.status = 'ordering'
     LIMIT 1`,
    [tableId]
  );

  const order = orderResult.rows[0];
  if (!order) return null;

  // Lấy danh sách món trong order
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

module.exports = { getAllTables, openTable, closeTable, getTableCurrentOrder };