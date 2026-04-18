const { pool } = require("../../../config/db");

class MenuService {
    // Lấy danh sách món + Thống kê
    async getAllWithStats() {
        const menusQuery = `SELECT * FROM public.menus ORDER BY id DESC`;
        const statsQuery = `
      SELECT 
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE status = true)::int as serving,
        COUNT(*) FILTER (WHERE status = false)::int as stopped
      FROM public.menus
    `;

        const menus = await pool.query(menusQuery);
        const stats = await pool.query(statsQuery);

        return { menus: menus.rows, stats: stats.rows[0] };
    }

    // Cập nhật trạng thái
    async updateStatus(id, status) {
        const query = `UPDATE public.menus SET status = $1 WHERE id = $2 RETURNING *`;
        const { rows } = await pool.query(query, [status, id]);
        return rows[0];
    }

    // Thêm món mới (Mã món tự sinh do TRIGGER trong SQL của bạn)
    async createDish(data) {
        const { name, category, image_url } = data;
        const query = `
      INSERT INTO public.menus (name, category, image_url) 
      VALUES ($1, $2, $3) RETURNING *`;
        const { rows } = await pool.query(query, [name, category, image_url]);
        return rows[0];
    }
}

module.exports = new MenuService();