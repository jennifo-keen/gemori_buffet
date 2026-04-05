const { pool } = require('../../../config/db');
const { getIO } = require('../../../config/socket');

// Lấy order + danh sách món realtime — Web 1
const getOrderByTable = async (tableCode) => {
  // tableCode từ route /tables/:tableCode/order
  const tableResult = await pool.query('SELECT * FROM tables WHERE table_code = $1', [tableCode]);
  const table = tableResult.rows[0];
  if (!table) return null;

  const orderResult = await pool.query(
    `SELECT o.id, o.ticket_quantity, o.status, o.order_time,
       bt.name AS ticket_name, bt.price AS ticket_price
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     WHERE o.table_id = $1 AND o.status = 'ordering'
     LIMIT 1`,
    [table.id]
  );
 
  const order = orderResult.rows[0];
  if (!order) return null;
 
  const itemsResult = await pool.query(
    `SELECT oi.id, oi.quantity, oi.status, oi.item_order_time,
       m.name AS menu_name, m.image_url, m.category
     FROM order_items oi
     LEFT JOIN menus m ON oi.menu_id = m.id
     WHERE oi.order_id = $1
     ORDER BY oi.item_order_time ASC`,
    [order.id]
  );
 
  return { ...order, items: itemsResult.rows };
};

// Gọi món — gửi bếp realtime
const addItems = async (tableCode, items) => {
  // items = [{ menuId, quantity }]
  if (!items || !items.length)
    throw { status: 400, message: 'Danh sách món không được rỗng' };

  const tableResult = await pool.query('SELECT * FROM tables WHERE table_code = $1', [tableCode]);
  const table = tableResult.rows[0];
  if (!table) throw { status: 404, message: 'Bàn không tồn tại' };

  // Lấy order đang chạy
  const orderResult = await pool.query(
    `SELECT id FROM orders WHERE table_id = $1 AND status = 'ordering' LIMIT 1`,
    [table.id]
  );

  const order = orderResult.rows[0];
  if (!order) throw { status: 400, message: 'Bàn chưa có đơn hàng' };

  // Kiểm tra tất cả menuId hợp lệ
  const menuIds = items.map(i => i.menuId);
  const menuCheck = await pool.query(
    `SELECT id FROM menus WHERE id = ANY($1) AND status = true`,
    [menuIds]
  );
  if (menuCheck.rows.length !== menuIds.length)
    throw { status: 400, message: 'Một số món không hợp lệ hoặc đã hết' };

  // Insert từng món
  const inserted = [];
  for (const item of items) {
    const result = await pool.query(
      `INSERT INTO order_items (order_id, menu_id, quantity, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING id, quantity, status, menu_id`,
      [order.id, item.menuId, item.quantity]
    );

    // Lấy tên món để emit socket
const menuResult = await pool.query(
      'SELECT name, image_url, category FROM menus WHERE id = $1',
      [item.menuId]
    );

 inserted.push({
      ...result.rows[0],
      menu_name: menuResult.rows[0]?.name,
      image_url: menuResult.rows[0]?.image_url,
      category:  menuResult.rows[0]?.category,
    });
  }

  // Emit realtime đến bếp và staff
try {
    const io = getIO();
    io.to('kitchen').emit('new_order_item', { tableId: table.id, tableCode, orderId: order.id, items: inserted });
    io.to('staff').emit('new_order_item', { tableId: table.id, tableCode, orderId: order.id, items: inserted });
  } catch (e) { console.error('Socket error:', e.message); }
 
  return inserted;
};

// Hủy món — chỉ khi còn pending
const cancelItem = async (itemId, tableId) => {
  // Kiểm tra item thuộc bàn này
const check = await pool.query(
    `SELECT oi.*, o.table_id FROM order_items oi
     LEFT JOIN orders o ON oi.order_id = o.id
     WHERE oi.id = $1`,
    [itemId]
  );

 const item = check.rows[0];
  if (!item) throw { status: 404, message: 'Món không tồn tại' };
  if (item.table_id !== tableId) throw { status: 403, message: 'Không có quyền hủy món này' };
  if (item.status !== 'pending') throw { status: 400, message: 'Chỉ có thể hủy món đang chờ xử lý' };
 
  await pool.query('DELETE FROM order_items WHERE id = $1', [itemId]);

  // Notify bếp và staff
   try {
    const io = getIO();
    io.to('kitchen').emit('order_item_cancelled', { itemId, tableId });
    io.to('staff').emit('order_item_cancelled', { itemId, tableId });
  } catch (e) { console.error('Socket error:', e.message); }
 
  return { message: 'Đã hủy món thành công' };
};

// Hóa đơn tạm tính — Web 1
const getBill = async (tableCode) => {
  const tableResult = await pool.query('SELECT * FROM tables WHERE table_code = $1', [tableCode]);
  const table = tableResult.rows[0];
  if (!table) throw { status: 404, message: 'Bàn không tồn tại' };

  const orderResult = await pool.query(
    `SELECT o.id, o.ticket_quantity, o.total_amount, o.order_time,
       bt.name AS ticket_name, bt.price AS ticket_price
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     WHERE o.table_id = $1 AND o.status = 'ordering'
     LIMIT 1`,
    [table.id]
  );
 
  const order = orderResult.rows[0];
  if (!order) throw { status: 400, message: 'Bàn chưa có đơn hàng' };
 
  const itemsResult = await pool.query(
    `SELECT oi.id, oi.quantity, oi.status, oi.item_order_time,
       m.name AS menu_name, m.image_url
     FROM order_items oi
     LEFT JOIN menus m ON oi.menu_id = m.id
     WHERE oi.order_id = $1
     ORDER BY oi.item_order_time ASC`,
    [order.id]
  );
 
  const ticketTotal = order.ticket_price * order.ticket_quantity;
  const vatAmount   = Math.round(ticketTotal * 0.08);
 
  return {
    ticket_name:     order.ticket_name,
    ticket_price:    order.ticket_price,
    ticket_quantity: order.ticket_quantity,
    ticket_total:    ticketTotal,
    vat_amount:      vatAmount,
    estimated_total: ticketTotal + vatAmount,
    items:           itemsResult.rows,
    note:            'Tổng tiền chưa bao gồm giảm giá, nhân viên sẽ xác nhận khi thanh toán',
  };
};
 
module.exports = {
  getOrderByTable, addItems, cancelItem, getBill,
};