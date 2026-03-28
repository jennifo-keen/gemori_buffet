const { pool } = require('../../../config/db');

// Lấy danh sách gói buffet — Web 3 Staff + Web 1
const getBuffetTickets = async () => {
  const result = await pool.query(
    `SELECT bt.*,
      COALESCE(
        json_agg(m.name ORDER BY m.name) FILTER (WHERE m.id IS NOT NULL),
        '[]'
      ) AS menu_items
     FROM buffet_tickets bt
     LEFT JOIN buffet_ticket_menus btm ON bt.id = btm.buffet_ticket_id
     LEFT JOIN menus m ON btm.menu_id = m.id
     WHERE bt.is_active = true
     GROUP BY bt.id
     ORDER BY bt.price ASC`
  );
  return result.rows;
};

// Lấy menu theo gói buffet của bàn — Web 1
const getMenuByTable = async (tableId) => {
  // Lấy buffet_ticket_id từ order đang chạy
  const orderResult = await pool.query(
    `SELECT o.buffet_ticket_id, bt.name AS ticket_name
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     WHERE o.table_id = $1 AND o.status = 'ordering'
     LIMIT 1`,
    [tableId]
  );
 

  const order = orderResult.rows[0];
  if (!order) throw { status: 400, message: 'Bàn chưa có đơn hàng' };

  // Lấy tất cả món thuộc gói buffet này
  const menuResult = await pool.query(
    `SELECT m.id, m.code, m.name, m.category, m.image_url
     FROM menus m
     INNER JOIN buffet_ticket_menus btm ON m.id = btm.menu_id
     WHERE btm.buffet_ticket_id = $1
       AND m.status = true
     ORDER BY m.category ASC, m.name ASC`,
    [order.buffet_ticket_id]
  );

  // Group theo category
const grouped = {};
  for (const item of menuResult.rows) {
    const cat = item.category || 'Khác';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }
 
  return {
    ticket_name: order.ticket_name,
    categories: Object.entries(grouped).map(([name, items]) => ({ name, items })),
  };
};
 
module.exports = { getBuffetTickets, getMenuByTable };