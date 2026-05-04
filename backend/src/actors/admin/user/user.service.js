const { pool } = require("../../../config/db");

const getAllUsers = async (roleTab) => {
    let query = "";
    let values = [];

    // Chuyển về chữ thường để so sánh cho chuẩn
    const tab = roleTab?.toLowerCase() || 'customer';

    if (tab === 'customer') {
        // Lấy từ bảng customers
        query = `
            SELECT id, full_name AS name, 'customer' AS role, email, phone, 
                   created_at, status 
            FROM customers 
            ORDER BY created_at DESC
        `;
    } else {
        // Lấy từ bảng admins cho các role: staff, kitchen, admin
        // Dùng LOWER(role) để chắc chắn khớp với giá trị 'staff', 'kitchen', 'admin' gửi từ FE
        query = `
            SELECT id, full_name AS name, role, email, phone, 
                   created_at, status 
            FROM admins 
            WHERE LOWER(role) = $1 
            ORDER BY created_at DESC
        `;
        values = [tab];
    }

    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error("Lỗi Query DB:", error);
        throw error;
    }
};

const updateUserStatus = async (id, role, status) => {
    let table;
    // Chuyển role về chữ thường để so sánh chính xác
    const lowerRole = role?.toLowerCase();

    if (lowerRole === 'customer' || lowerRole === 'khách hàng') {
        table = 'customers';
    } else {
        table = 'admins';
    }

    // Lưu ý: Đảm bảo bảng customers của bạn đã chạy lệnh ALTER TABLE để có cột status
    const query = `UPDATE ${table} SET status = $1, updated_at = now() WHERE id = $2`;
    await pool.query(query, [status, id]);
};

module.exports = { getAllUsers, updateUserStatus };