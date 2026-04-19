const { pool } = require("../../../config/db"); // Đường dẫn tới file kết nối db của bạn

const voucherService = {
    getAllVouchers: async () => {
        const result = await pool.query('SELECT * FROM vouchers ORDER BY start_date DESC');
        return result.rows;
    },

    getVoucherById: async (id) => {
        const result = await pool.query('SELECT * FROM vouchers WHERE id = $1', [id]);
        return result.rows[0];
    },

    createVoucher: async (voucherData) => {
        const { code, discount_type, discount_value, is_active, quantity, start_date, end_date } = voucherData;
        const result = await pool.query(
            `INSERT INTO vouchers (code, discount_type, discount_value, is_active, quantity, start_date, end_date) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [code, discount_type, discount_value, is_active, quantity, start_date, end_date]
        );
        return result.rows[0];
    },

    updateVoucher: async (id, voucherData) => {
        const { code, discount_type, discount_value, is_active, quantity, start_date, end_date } = voucherData;
        const result = await pool.query(
            `UPDATE vouchers SET code=$1, discount_type=$2, discount_value=$3, is_active=$4, 
             quantity=$5, start_date=$6, end_date=$7 WHERE id=$8 RETURNING *`,
            [code, discount_type, discount_value, is_active, quantity, start_date, end_date, id]
        );
        return result.rows[0];
    },

    deleteVoucher: async (id) => {
        await pool.query('DELETE FROM vouchers WHERE id = $1', [id]);
        return { message: 'Xóa voucher thành công' };
    }
};

module.exports = voucherService;