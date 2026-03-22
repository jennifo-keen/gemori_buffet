const { pool } = require("../../../config/db");

const getHomeBuffetTickets = async () => {
  try {
    const query = `
      SELECT 
        code,
        name,
        description,
        price,
        image_url,
        is_active
      FROM buffet_tickets
      WHERE is_active = TRUE
      ORDER BY code ASC
      LIMIT 3
    `;

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("❌ Lỗi trong home.service:", error);
    throw error;
  }
};

module.exports = {
  getHomeBuffetTickets,
};