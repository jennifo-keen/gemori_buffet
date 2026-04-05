const pool = require("../../../../config/db");

const getForecast = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT f.*, m.name, m.image_url
      FROM forecast_results f
      JOIN menus m ON f.menu_id = m.id
      WHERE f.forecast_date >= NOW()
      ORDER BY f.forecast_date ASC
    `);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi lấy forecast" });
    }
};

module.exports = { getForecast };