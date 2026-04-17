const { pool } = require('../../../config/db');
const { getIO } = require('../../../config/socket');

// Lấy danh sách món cần làm (pending + cooking) 
// Group theo bàn để bếp dễ theo dõi
const getPendingItems = async () => {
  const result = await pool.query(
    `SELECT
       oi.id,
       oi.order_id,
       oi.quantity,
       oi.status,
       oi.item_order_time,
       m.name        AS menu_name,
       m.image_url,
       m.category,
       t.table_code,
       t.id          AS table_id
     FROM order_items oi
     LEFT JOIN menus  m ON oi.menu_id  = m.id
     LEFT JOIN orders o ON oi.order_id = o.id
     LEFT JOIN tables t ON o.table_id  = t.id
     WHERE oi.status IN ('pending', 'cooking')
       AND o.status = 'ordering'
     ORDER BY oi.item_order_time ASC`
  );

  // Group theo bàn
  const grouped = {};
  for (const row of result.rows) {
    const key = row.table_code;
    if (!grouped[key]) {
      grouped[key] = {
        table_code: row.table_code,
        table_id:   row.table_id,
        items:      [],
      };
    }
    grouped[key].items.push({
      id:              row.id,
      order_id:        row.order_id,
      menu_name:       row.menu_name,
      image_url:       row.image_url,
      category:        row.category,
      quantity:        row.quantity,
      status:          row.status,
      item_order_time: row.item_order_time,
    });
  }

  // Sắp xếp bàn theo table_code
  return Object.values(grouped).sort((a, b) =>
    a.table_code.localeCompare(b.table_code)
  );
};

// Cập nhật trạng thái món
const updateItemStatus = async (itemId, status) => {
  const validStatuses = ['pending', 'cooking', 'done'];
  if (!validStatuses.includes(status))
    throw { status: 400, message: 'Trạng thái không hợp lệ (pending/cooking/done)' };

  // Lấy thông tin món + bàn
  const check = await pool.query(
    `SELECT oi.*, o.table_id, t.table_code, m.name AS menu_name
     FROM order_items oi
     LEFT JOIN orders o ON oi.order_id = o.id
     LEFT JOIN tables t ON o.table_id  = t.id
     LEFT JOIN menus  m ON oi.menu_id  = m.id
     WHERE oi.id = $1`,
    [itemId]
  );

  const item = check.rows[0];
  if (!item) throw { status: 404, message: 'Món không tồn tại' };

  // Nếu chuyển sang 'done', kiểm tra và trừ tồn kho
  if (status === 'done') {
    const inventoryCheck = await pool.query(
      'SELECT stock_quantity FROM inventory WHERE menu_id = $1',
      [item.menu_id]
    );
    const inventory = inventoryCheck.rows[0];
    if (!inventory) {
      throw { status: 400, message: 'Món này chưa có thông tin tồn kho' };
    }
    if (inventory.stock_quantity < item.quantity) {
      throw { status: 400, message: `Không đủ tồn kho. Còn ${inventory.stock_quantity}, cần ${item.quantity}` };
    }
    // Trừ tồn kho
    await pool.query(
      'UPDATE inventory SET stock_quantity = stock_quantity - $1, updated_at = NOW() WHERE menu_id = $2',
      [item.quantity, item.menu_id]
    );
  }

  await pool.query(
    'UPDATE order_items SET status = $1 WHERE id = $2',
    [status, itemId]
  );

  // Emit realtime
  try {
    const io = getIO();

    // Khách tại bàn
    io.to(`table_${item.table_id}`).emit('item_status_updated', {
      itemId,
      status,
      menu_name: item.menu_name,
    });

    // Bếp
    io.to('kitchen').emit('item_status_updated', {
      itemId,
      status,
      tableId:   item.table_id,
      tableCode: item.table_code,
      menu_name: item.menu_name,
    });

    // Staff
    io.to('staff').emit('item_status_updated', {
      itemId,
      status,
      tableId:   item.table_id,
      tableCode: item.table_code,
      menu_name: item.menu_name,
    });
  } catch (e) {
    console.error('Socket error:', e.message);
  }

  return {
    itemId,
    status,
    menu_name:  item.menu_name,
    table_code: item.table_code,
  };
};

//Cập nhật tất cả món của 1 bàn cùng lúc
const updateAllItemsByTable = async (tableCode, status) => {
  const validStatuses = ['cooking', 'done'];
  if (!validStatuses.includes(status))
    throw { status: 400, message: 'Chỉ được đổi sang cooking hoặc done' };

  // Lấy tableId
  const tableResult = await pool.query(
    'SELECT id FROM tables WHERE table_code = $1', [tableCode]
  );
  const table = tableResult.rows[0];
  if (!table) throw { status: 404, message: 'Bàn không tồn tại' };

  // Lấy tất cả món pending/cooking của bàn
  const itemsResult = await pool.query(
    `SELECT oi.id, oi.menu_id, oi.quantity FROM order_items oi
     LEFT JOIN orders o ON oi.order_id = o.id
     WHERE o.table_id = $1
       AND o.status = 'ordering'
       AND oi.status IN ('pending', 'cooking')`,
    [table.id]
  );

  if (!itemsResult.rows.length)
    throw { status: 400, message: 'Không có món nào cần cập nhật' };

  const itemIds = itemsResult.rows.map(r => r.id);

  // Nếu chuyển sang 'done', kiểm tra và trừ tồn kho cho từng món
  if (status === 'done') {
    for (const item of itemsResult.rows) {
      const inventoryCheck = await pool.query(
        'SELECT stock_quantity FROM inventory WHERE menu_id = $1',
        [item.menu_id]
      );
      const inventory = inventoryCheck.rows[0];
      if (!inventory) {
        throw { status: 400, message: `Món ${item.menu_id} chưa có thông tin tồn kho` };
      }
      if (inventory.stock_quantity < item.quantity) {
        throw { status: 400, message: `Không đủ tồn kho cho món ${item.menu_id}. Còn ${inventory.stock_quantity}, cần ${item.quantity}` };
      }
      // Trừ tồn kho
      await pool.query(
        'UPDATE inventory SET stock_quantity = stock_quantity - $1, updated_at = NOW() WHERE menu_id = $2',
        [item.quantity, item.menu_id]
      );
    }
  }

  await pool.query(
    'UPDATE order_items SET status = $1 WHERE id = ANY($2)',
    [status, itemIds]
  );

  // Emit realtime
  try {
    const io = getIO();
    io.to(`table_${table.id}`).emit('table_items_updated', {
      tableCode,
      status,
      itemIds,
    });
    io.to('kitchen').emit('table_items_updated', {
      tableCode,
      tableId: table.id,
      status,
      itemIds,
    });
    io.to('staff').emit('table_items_updated', {
      tableCode,
      tableId: table.id,
      status,
      itemIds,
    });
  } catch (e) {
    console.error('Socket error:', e.message);
  }

  return { updated: itemIds.length, status, tableCode };
};

// Thống kê nhanh cho bếp
const getKitchenStats = async () => {
  const result = await pool.query(
    `SELECT
       COUNT(*) FILTER (WHERE oi.status = 'pending') AS pending_count,
       COUNT(*) FILTER (WHERE oi.status = 'cooking') AS cooking_count,
       COUNT(DISTINCT o.table_id) FILTER (WHERE oi.status IN ('pending','cooking')) AS active_tables
     FROM order_items oi
     LEFT JOIN orders o ON oi.order_id = o.id
     WHERE o.status = 'ordering'`
  );
  return result.rows[0];
};

module.exports = {
  getPendingItems,
  updateItemStatus,
  updateAllItemsByTable,
  getKitchenStats,
};