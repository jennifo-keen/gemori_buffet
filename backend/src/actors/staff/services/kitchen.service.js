const { pool } = require('../../../config/db');
const { getIO } = require('../../../config/socket');

// Lấy tất cả món đang pending/cooking — Web 3 (Staff theo dõi)
const getPendingItems = async () => {
  const result = await pool.query(
    `SELECT oi.*, m.name AS menu_name, m.image_url, m.category, t.table_code
     FROM order_items oi
     LEFT JOIN menus m ON oi.menu_id = m.id
     LEFT JOIN orders o ON oi.order_id = o.id
     LEFT JOIN tables t ON o.table_id = t.id
     WHERE oi.status IN ('pending', 'cooking')
     ORDER BY oi.item_order_time ASC`
  );
  return result.rows;
};

// Cập nhật trạng thái món — Web 3 hoặc Web 5 Bếp
const updateItemStatus = async (itemId, status) => {
  const validStatuses = ['pending', 'cooking', 'done'];
  if (!validStatuses.includes(status))
    throw { status: 400, message: 'Trạng thái không hợp lệ (pending/cooking/done)' };

  // Lấy item + tableId để emit socket
  const check = await pool.query(
    `SELECT oi.*, o.table_id, t.table_code, m.name AS menu_name
     FROM order_items oi
     LEFT JOIN orders o ON oi.order_id = o.id
     LEFT JOIN tables t ON o.table_id = t.id
     LEFT JOIN menus m ON oi.menu_id = m.id
     WHERE oi.id = $1`,
    [itemId]
  );

 const item = check.rows[0];
  if (!item) throw { status: 404, message: 'Món không tồn tại' };
 
  await pool.query('UPDATE order_items SET status = $1 WHERE id = $2', [status, itemId]);

  // Emit realtime đến khách, bếp và staff
  try {
    const io = getIO();
    io.to(`table_${item.table_id}`).emit('item_status_updated', {
      itemId,
      status,
      menu_name: item.menu_name,
    });
    io.to('kitchen').emit('item_status_updated', {
      itemId,
      status,
      tableId:   item.table_id,
      tableCode: item.table_code,
      menu_name: item.menu_name,
    });
    io.to('staff').emit('item_status_updated', {
      itemId,
      status,
      tableId:   item.table_id,
      tableCode: item.table_code,
      menu_name: item.menu_name,
    });
  } catch (e) { console.error('Socket error:', e.message); }
 
  return { itemId, status, menu_name: item.menu_name };
};
 
module.exports = { getPendingItems, updateItemStatus };