const { pool } = require("../../../config/db");

const getAllBuffetTickets = async () => {
  const query = `
    SELECT 
      id,
      code,
      name,
      description,
      price,
      image_url,
      is_active
    FROM buffet_tickets
    WHERE is_active = true
    ORDER BY code ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
};

const getBuffetTicketByCode = async (code) => {
  const query = `
    SELECT 
      id,
      code,
      name,
      description,
      price,
      image_url,
      is_active
    FROM buffet_tickets
    WHERE code = $1
      AND is_active = true
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [code]);
  return rows[0];
};

const getBuffetTicketById = async (id) => {
  const query = `
    SELECT 
      id,
      code,
      name,
      description,
      price,
      image_url,
      is_active
    FROM buffet_tickets
    WHERE id = $1
      AND is_active = true
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