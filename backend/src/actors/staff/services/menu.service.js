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
 
// Lấy tất cả món
const getAllMenus = async () => {
  const result = await pool.query(
    `SELECT id, code, name, category, image_url, status
     FROM menus
     WHERE status = true
     ORDER BY category ASC, name ASC`
  );
  return result.rows;
};
 
module.exports = { getBuffetTickets, getAllMenus };