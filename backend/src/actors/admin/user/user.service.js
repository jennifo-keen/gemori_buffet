const { pool } = require("../../../config/db");
const bcrypt = require('bcrypt');

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

const getUserStats = async () => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM customers) + (SELECT COUNT(*) FROM admins) AS total,
            (SELECT COUNT(*) FROM customers WHERE status = 'active') + (SELECT COUNT(*) FROM admins WHERE status = 'active') AS active,
            (SELECT COUNT(*) FROM customers WHERE status = 'inactive') + (SELECT COUNT(*) FROM admins WHERE status = 'inactive') AS locked
    `;
    try {
        const { rows } = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.error("Lỗi lấy stats:", error);
        throw error;
    }
};

const updateUserStatus = async (id, role, status) => {
    let table;
    const lowerRole = role?.toLowerCase();

    if (lowerRole === 'customer' || lowerRole === 'khách hàng') {
        table = 'customers';
        // Với bảng customers, chỉ update status (vì thiếu cột kia)
        const query = `UPDATE ${table} SET status = $1 WHERE id = $2`;
        await pool.query(query, [status, id]);
    } else {
        table = 'admins';
        // Với bảng admins (đã có đủ cột) thì giữ nguyên
        const query = `UPDATE ${table} SET status = $1, updated_at = now() WHERE id = $2`;
        await pool.query(query, [status, id]);
    }
};

const createUser = async (userData) => {
    const { name, email, phone, role, password, username, dob, gender } = userData;
    const lowerRole = role?.toLowerCase();

    // 1. Mã hóa mật khẩu trước khi lưu
    // SaltRounds = 10 là độ phức tạp tiêu chuẩn
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let query = "";
    let values = [];

    if (lowerRole === 'customer') {
        // Cập nhật query sử dụng hashedPassword thay vì password thô
        query = `
            INSERT INTO customers (id, full_name, email, phone, password_hash, birthday, gender, status, role, created_at, update_at)
            VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'active', 'customer', now(), now())
            RETURNING id
        `;
        values = [name, email, phone, hashedPassword, dob || null, gender || 'Other'];
    } else {
        query = `
            INSERT INTO admins (id, full_name, username, email, phone, password_hash, role, status, created_at, updated_at)
            VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'active', now(), now())
            RETURNING id
        `;
        const finalUsername = username || email.split('@')[0];
        values = [name, finalUsername, email, phone, hashedPassword, lowerRole];
    }

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Lỗi Query tại Service:", error.message);
        throw error;
    }
};

const deleteUser = async (id, role) => {
    const table = role?.toLowerCase() === 'customer' ? 'customers' : 'admins';
    const query = `DELETE FROM ${table} WHERE id = $1`;
    await pool.query(query, [id]);
};

// Sửa User (Cập nhật thông tin cơ bản)
const updateUser = async (id, userData) => {
    const { name, email, phone, role, password, username, dob, gender, address } = userData;
    const lowerRole = role?.toLowerCase();

    let passwordFragment = "";
    const values = [name, email, phone];

    if (password && password.trim() !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        passwordFragment = `, password_hash = '${hashedPassword}'`;
    }

    if (lowerRole === 'customer') {
        const query = `
            UPDATE customers 
            SET full_name = $1, email = $2, phone = $3, birthday = $4, gender = $5, address = $6, update_at = now() ${passwordFragment}
            WHERE id = $7 RETURNING id;
        `;
        const { rows } = await pool.query(query, [...values, dob || null, gender, address, id]);
        return rows[0];
    } else {
        const query = `
            UPDATE admins 
            SET full_name = $1, email = $2, phone = $3, username = $4, updated_at = now() ${passwordFragment}
            WHERE id = $5 RETURNING id;
        `;
        const { rows } = await pool.query(query, [name, email, phone, username, id]);
        return rows[0];
    }
};

module.exports = { getAllUsers, updateUserStatus, getUserStats, createUser, deleteUser, updateUser };