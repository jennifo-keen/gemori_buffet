const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../../../config/db');

const login = async (username, password) => {
  const result = await pool.query(
    'SELECT * FROM admins WHERE username = $1',
    [username]
  );

  const admin = result.rows[0];
  if (!admin) throw { status: 400, message: 'Tài khoản không tồn tại' };
  if (admin.status !== 'active') throw { status: 403, message: 'Tài khoản đã bị khóa' };

  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) throw { status: 400, message: 'Sai mật khẩu' };

  const token = jwt.sign(
    { id: admin.id, role: admin.role, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    admin: {
      id:        admin.id,
      full_name: admin.full_name, 
      username:  admin.username,
      role:      admin.role,
    },
  };
};

module.exports = { login };