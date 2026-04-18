const { pool } = require("../../../config/db");

class TableService {
    // Lấy tất cả bàn
    async getAllTables() {
        const query = `SELECT * FROM public.tables ORDER BY table_code ASC`;
        const { rows } = await pool.query(query);
        return rows;
    }

    // Cập nhật trạng thái bàn
    async updateStatus(id, status) {
        const query = `
            UPDATE public.tables
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;
        const { rows } = await pool.query(query, [status, id]);
        return rows[0];
    }

    // Thêm bàn mới
    async createTable() {
        const query = `
            INSERT INTO public.tables (status)
            VALUES ('empty')
            RETURNING *
        `;
        const { rows } = await pool.query(query);
        return rows[0];
    }
}

module.exports = new TableService();