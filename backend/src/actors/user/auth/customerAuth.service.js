const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../../config/db");

function signToken(user) {
  const payload = {
    sub: user.id,
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    phone: user.phone,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

async function loginUserService({ email, password }) {
  if (!email || !password) {
    const error = new Error("Thiếu email hoặc mật khẩu");
    error.statusCode = 400;
    throw error;
  }

  const query = `
    SELECT 
      id,
      full_name,
      phone,
      email,
      password_hash,
      birthday,
      gender,
      address,
      created_at,
      update_at
    FROM customers
    WHERE email = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [email.toLowerCase().trim()]);

  if (result.rows.length === 0) {
    const error = new Error("Email hoặc mật khẩu không đúng");
    error.statusCode = 401;
    throw error;
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error("Email hoặc mật khẩu không đúng");
    error.statusCode = 401;
    throw error;
  }

  const token = signToken(user);

  return {
    success: true,
    message: "Đăng nhập thành công",
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      phone: user.phone,
      email: user.email,
      birthday: user.birthday,
      gender: user.gender,
      address: user.address,
      created_at: user.created_at,
      update_at: user.update_at,
    },
  };
}

async function registerUserService({
  full_name,
  email,
  phone,
  password,
  confirm_password,
  birthday,
  gender,
  address,
}) {
  if (!email || !phone || !password) {
    const error = new Error("Vui lòng nhập email, số điện thoại và mật khẩu");
    error.statusCode = 400;
    throw error;
  }

  if (confirm_password !== undefined && password !== confirm_password) {
    const error = new Error("Xác nhận mật khẩu không khớp");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedPhone = phone.trim();

  const checkQuery = `
    SELECT id, email, phone
    FROM customers
    WHERE email = $1 OR phone = $2
    LIMIT 1
  `;

  const checkResult = await pool.query(checkQuery, [normalizedEmail, normalizedPhone]);

  if (checkResult.rows.length > 0) {
    const existingUser = checkResult.rows[0];

    if (existingUser.email === normalizedEmail) {
      const error = new Error("Email đã tồn tại");
      error.statusCode = 409;
      throw error;
    }

    if (existingUser.phone === normalizedPhone) {
      const error = new Error("Số điện thoại đã tồn tại");
      error.statusCode = 409;
      throw error;
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const insertQuery = `
    INSERT INTO customers (
      full_name,
      phone,
      email,
      password_hash,
      birthday,
      gender,
      address
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING
      id,
      full_name,
      phone,
      email,
      birthday,
      gender,
      address,
      created_at,
      update_at
  `;

  const values = [
    full_name ? full_name.trim() : null,
    normalizedPhone,
    normalizedEmail,
    hashedPassword,
    birthday || null,
    gender || null,
    address || null,
  ];

  const result = await pool.query(insertQuery, values);
  const user = result.rows[0];

  const token = signToken(user);

  return {
    success: true,
    message: "Đăng ký thành công",
    token,
    user,
  };
}

module.exports = {
  loginUserService,
  registerUserService,
};