const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../../../config/db');

// Đăng nhập thành viên tại bàn
const customerLogin = async (phone, password) => {
  const result = await pool.query(
    'SELECT * FROM customers WHERE phone = $1',
    [phone]
  );

  const customer = result.rows[0];
  if (!customer) throw { status: 400, message: 'Số điện thoại chưa đăng ký' };

  const isMatch = await bcrypt.compare(password, customer.password_hash);
  if (!isMatch) throw { status: 400, message: 'Sai mật khẩu' };

  const token = jwt.sign(
    { id: customer.id, phone: customer.phone },
    process.env.JWT_SECRET,
    { expiresIn: '15d' }
  );

  return {
    token,
    customer: {
      id:        customer.id,
      full_name: customer.full_name,
      phone:     customer.phone,
      email:     customer.email,
    },
  };
};

// Đăng ký thành viên tại bàn
const customerRegister = async ({ full_name, phone, email, password, birthday, gender }) => {
  if (!full_name || !phone || !email || !password)
    throw { status: 400, message: 'Thiếu thông tin bắt buộc: full_name, phone, email, password' };

  const existPhone = await pool.query('SELECT id FROM customers WHERE phone = $1', [phone]);
  if (existPhone.rows[0]) throw { status: 400, message: 'Số điện thoại đã được đăng ký' };

  const existEmail = await pool.query('SELECT id FROM customers WHERE email = $1', [email]);
  if (existEmail.rows[0]) throw { status: 400, message: 'Email đã được đăng ký' };

  const password_hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO customers (full_name, phone, email, password_hash, birthday, gender)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, full_name, phone, email`,
    [full_name, phone, email, password_hash, birthday || null, gender || null]
  );

  const customer = result.rows[0];

  const token = jwt.sign(
    { id: customer.id, phone: customer.phone },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, customer };
};

// Lấy profile + stats
const getProfile = async (customerId) => {
  const customerResult = await pool.query(
    `SELECT id, full_name, phone, email, birthday, gender, address, created_at
     FROM customers WHERE id = $1`,
    [customerId]
  );
  const customer = customerResult.rows[0];
  if (!customer) throw { status: 404, message: 'Không tìm thấy thành viên' };

  // Đếm số đơn hàng từ payments
  const paymentResult = await pool.query(
    `SELECT COUNT(*) AS total
     FROM payments p
     LEFT JOIN orders o ON p.order_id = o.id
     WHERE o.customer_id = $1`,
    [customerId]
  );

  // Đếm số voucher available 
  const voucherResult = await pool.query(
    `SELECT COUNT(*) AS total FROM vouchers
     WHERE is_active = true
       AND (quantity IS NULL OR quantity > 0)
       AND (end_date IS NULL OR end_date >= CURRENT_DATE)
       AND (start_date IS NULL OR start_date <= CURRENT_DATE)`
  );

  return {
    ...customer,
    stats: {
      orders:   parseInt(paymentResult.rows[0].total),
      vouchers: parseInt(voucherResult.rows[0].total),
    },
  };
};

// Cập nhật profile
const updateProfile = async (customerId, data) => {
  const { full_name, email, birthday, gender, address } = data;

  const check = await pool.query('SELECT id FROM customers WHERE id = $1', [customerId]);
  if (!check.rows[0]) throw { status: 404, message: 'Thành viên không tồn tại' };

  const fields = []; const values = []; let i = 1;
  if (full_name) { fields.push(`full_name = $${i++}`); values.push(full_name); }
  if (email)     { fields.push(`email = $${i++}`);     values.push(email); }
  if (birthday)  { fields.push(`birthday = $${i++}`);  values.push(birthday); }
  if (gender)    { fields.push(`gender = $${i++}`);    values.push(gender); }
  if (address)   { fields.push(`address = $${i++}`);   values.push(address); }

  if (!fields.length) throw { status: 400, message: 'Không có gì để cập nhật' };

  values.push(customerId);
  const result = await pool.query(
    `UPDATE customers SET ${fields.join(', ')} WHERE id = $${i}
     RETURNING id, full_name, phone, email, birthday, gender, address`,
    values
  );
  return result.rows[0];
};

// Xóa tài khoản
const deleteAccount = async (customerId) => {
  const check = await pool.query('SELECT id FROM customers WHERE id = $1', [customerId]);
  if (!check.rows[0]) throw { status: 404, message: 'Thành viên không tồn tại' };
  await pool.query('DELETE FROM customers WHERE id = $1', [customerId]);
};

// Lấy vouchers available — hiện cho tất cả user
const getAvailableVouchers = async () => {
  const result = await pool.query(
    `SELECT id, code, discount_type, discount_value, quantity, start_date, end_date
     FROM vouchers
     WHERE is_active = true
       AND (quantity IS NULL OR quantity > 0)
       AND (end_date IS NULL OR end_date >= CURRENT_DATE)
       AND (start_date IS NULL OR start_date <= CURRENT_DATE)
     ORDER BY discount_value DESC`
  );
  return result.rows;
};

module.exports = { customerLogin, customerRegister, getProfile, updateProfile, deleteAccount, getAvailableVouchers };