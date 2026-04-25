const { pool } = require("../../../config/db");

const getAllBuffetTickets = async () => {
  const query = `
    SELECT 
      b.id,
      b.code,
      b.name,
      b.description,
      b.price,
      b.image_url,
      b.is_active,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', m.id,
            'code', m.code,
            'name', m.name,
            'category', m.category,
            'image_url', m.image_url
          )
          ORDER BY m.category ASC, m.name ASC
        ) FILTER (WHERE m.id IS NOT NULL),
        '[]'
      ) AS menus
    FROM buffet_tickets b
    LEFT JOIN buffet_ticket_menus btm 
      ON btm.buffet_ticket_id = b.id
    LEFT JOIN menus m 
      ON m.id = btm.menu_id
      AND m.status = true
    WHERE b.is_active = true
    GROUP BY b.id, b.code, b.name, b.description, b.price, b.image_url, b.is_active
    ORDER BY b.code ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
};

const getBuffetTicketByCode = async (code) => {
  const query = `
    SELECT 
      b.id,
      b.code,
      b.name,
      b.description,
      b.price,
      b.image_url,
      b.is_active,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', m.id,
            'code', m.code,
            'name', m.name,
            'category', m.category,
            'image_url', m.image_url
          )
          ORDER BY m.category ASC, m.name ASC
        ) FILTER (WHERE m.id IS NOT NULL),
        '[]'
      ) AS menus
    FROM buffet_tickets b
    LEFT JOIN buffet_ticket_menus btm 
      ON btm.buffet_ticket_id = b.id
    LEFT JOIN menus m 
      ON m.id = btm.menu_id
      AND m.status = true
    WHERE b.code = $1
      AND b.is_active = true
    GROUP BY b.id, b.code, b.name, b.description, b.price, b.image_url, b.is_active
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [code]);
  return rows[0];
};

const getBuffetTicketById = async (id) => {
  const query = `
    SELECT 
      b.id,
      b.code,
      b.name,
      b.description,
      b.price,
      b.image_url,
      b.is_active,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', m.id,
            'code', m.code,
            'name', m.name,
            'category', m.category,
            'image_url', m.image_url
          )
          ORDER BY m.category ASC, m.name ASC
        ) FILTER (WHERE m.id IS NOT NULL),
        '[]'
      ) AS menus
    FROM buffet_tickets b
    LEFT JOIN buffet_ticket_menus btm 
      ON btm.buffet_ticket_id = b.id
    LEFT JOIN menus m 
      ON m.id = btm.menu_id
      AND m.status = true
    WHERE b.id = $1
      AND b.is_active = true
    GROUP BY b.id, b.code, b.name, b.description, b.price, b.image_url, b.is_active
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getAllBuffetTickets,
  getBuffetTicketByCode,
  getBuffetTicketById,
};