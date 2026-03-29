const { pool } = require("../../../config/db");

const getActiveVouchers = async () => {
  const query = `
    SELECT 
      id,
      code,
      discount_type,
      discount_value,
      is_active,
      quantity,
      start_date,
      end_date
    FROM vouchers
    WHERE is_active = true
      AND quantity > 0
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
    ORDER BY end_date ASC NULLS LAST, start_date DESC NULLS LAST
  `;

  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  getActiveVouchers,
};  