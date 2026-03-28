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
    { expiresIn: '24h' }
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

// Xem thông tin thành viên
const getProfile = async (customerId) => {
  const result = await pool.query(
    `SELECT id, full_name, phone, email, birthday, gender, address, created_at
     FROM customers WHERE id = $1`,
    [customerId]
  );

  const customer = result.rows[0];
  if (!customer) throw { status: 404, message: 'Không tìm thấy thành viên' };
  return customer;
};

module.exports = { customerLogin, customerRegister, getProfile };