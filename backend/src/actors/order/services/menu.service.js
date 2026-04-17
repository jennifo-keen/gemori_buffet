const { pool } = require('../../../config/db');

// Lấy danh sách gói buffet 
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

// Lấy menu theo gói buffet của bàn 
const getMenuByTable = async (tableCode) => {
  const tableResult = await pool.query('SELECT * FROM tables WHERE table_code = $1', [tableCode]);
  const table = tableResult.rows[0];
  if (!table) throw { status: 404, message: 'Bàn không tồn tại' };

  // Lấy buffet_ticket_id từ order đang chạy (nếu có)
  const orderResult = await pool.query(
    `SELECT o.buffet_ticket_id, bt.name AS ticket_name
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     WHERE o.table_id = $1 AND o.status = 'ordering'
     LIMIT 1`,
    [table.id]
  );

  let buffetTicketId;
  let ticketName;

  if (orderResult.rows[0]) {
    buffetTicketId = orderResult.rows[0].buffet_ticket_id;
    ticketName = orderResult.rows[0].ticket_name;
  } else {
    // nếu chưa có order, dùng gói buffet mặc định first active
    const ticketResult = await pool.query(
      `SELECT id, name FROM buffet_tickets WHERE is_active = true ORDER BY price ASC LIMIT 1`
    );
    const ticket = ticketResult.rows[0];
    if (!ticket) throw { status: 404, message: 'Chưa có gói buffet nào' };
    buffetTicketId = ticket.id;
    ticketName = ticket.name;
  }

  // Lấy tất cả món thuộc gói buffet này
  const menuResult = await pool.query(
    `SELECT m.id, m.code, m.name, m.category, m.image_url, i.stock_quantity
     FROM menus m
     INNER JOIN buffet_ticket_menus btm ON m.id = btm.menu_id
     LEFT JOIN inventory i ON m.id = i.menu_id
     WHERE btm.buffet_ticket_id = $1
       AND m.status = true
     ORDER BY m.category ASC, m.name ASC`,
    [buffetTicketId]
  );

  // Group theo category
const grouped = {};
  for (const item of menuResult.rows) {
    const cat = item.category || 'Khác';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }
 
  return {
    ticket_name: ticketName,
    categories: Object.entries(grouped).map(([name, items]) => ({ name, items })),
  };
};
 
module.exports = { getBuffetTickets, getMenuByTable };