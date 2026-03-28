const bcrypt = require('bcryptjs');
const { pool } = require('../../../config/db');

const getAllCustomers = async () => {
  const result = await pool.query(
    `SELECT id, full_name, phone, email, birthday, gender, address, created_at, update_at
     FROM customers ORDER BY created_at DESC`
  );
  return result.rows;
};

const getCustomerByPhone = async (phone) => {
  const result = await pool.query(
    `SELECT id, full_name, phone, email FROM customers WHERE phone = $1`,
    [phone]
  );
  if (!result.rows[0]) throw { status: 404, message: 'Không tìm thấy thành viên' };
  return result.rows[0];
};
 
const createCustomer = async (data) => {
  const { full_name, phone, email, password, birthday, gender, address } = data;

  // Kiểm tra trùng
 const existPhone = await pool.query('SELECT id FROM customers WHERE phone = $1', [phone]);
  if (existPhone.rows[0]) throw { status: 400, message: 'Số điện thoại đã được đăng ký' };
 
  const existEmail = await pool.query('SELECT id FROM customers WHERE email = $1', [email]);
  if (existEmail.rows[0]) throw { status: 400, message: 'Email đã được đăng ký' };
 
  const password_hash = await bcrypt.hash(password || '123456', 10);
 
  const result = await pool.query(
    `INSERT INTO customers (full_name, phone, email, password_hash, birthday, gender, address)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, full_name, phone, email`,
    [full_name, phone, email, password_hash, birthday || null, gender || null, address || null]
  );
  return result.rows[0];
};
 
const updateCustomer = async (id, data) => {
  const { full_name, email, birthday, gender, address, password } = data;
 
  const check = await pool.query('SELECT id FROM customers WHERE id = $1', [id]);
  if (!check.rows[0]) throw { status: 404, message: 'Thành viên không tồn tại' };
 
  const fields = []; const values = []; let i = 1;
  if (full_name) { fields.push(`full_name = $${i++}`);     values.push(full_name); }
  if (email)     { fields.push(`email = $${i++}`);          values.push(email); }
  if (birthday)  { fields.push(`birthday = $${i++}`);       values.push(birthday); }
  if (gender)    { fields.push(`gender = $${i++}`);         values.push(gender); }
  if (address)   { fields.push(`address = $${i++}`);        values.push(address); }
  if (password)  {
    const hash = await bcrypt.hash(password, 10);
    fields.push(`password_hash = $${i++}`); values.push(hash);
  }
 
  if (!fields.length) throw { status: 400, message: 'Không có gì để cập nhật' };
 
  values.push(id);
  const result = await pool.query(
    `UPDATE customers SET ${fields.join(', ')} WHERE id = $${i} RETURNING id, full_name, phone, email`,
    values
  );
  return result.rows[0];
};
 
const deleteCustomer = async (id) => {
  const check = await pool.query('SELECT id FROM customers WHERE id = $1', [id]);
  if (!check.rows[0]) throw { status: 404, message: 'Thành viên không tồn tại' };
  await pool.query('DELETE FROM customers WHERE id = $1', [id]);
};
 
module.exports = { getAllCustomers, getCustomerByPhone, createCustomer, updateCustomer, deleteCustomer };