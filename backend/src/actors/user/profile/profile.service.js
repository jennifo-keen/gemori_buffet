const { pool } = require("../../../config/db");

const getMyProfile = async (userId) => {
  const query = `
    SELECT
      id,
      full_name,
      phone,
      email,
      birthday,
      gender,
      address,
      created_at,
      update_at
    FROM customers
    WHERE id = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [userId]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  return {
    id: user.id,
    fullName: user.full_name || "",
    phone: user.phone || "",
    email: user.email || "",
    birthday: user.birthday || null,
    gender: user.gender || "",
    address: user.address || "",
    createdAt: user.created_at || null,
    updateAt: user.update_at || null,
  };
};

const updateMyProfile = async (userId, payload) => {
  const { fullName, phone, birthday, gender, address } = payload;

  const query = `
    UPDATE customers
    SET
      full_name = $1,
      phone = $2,
      birthday = $3,
      gender = $4,
      address = $5,
      update_at = NOW()
    WHERE id = $6
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
    fullName || "",
    phone || "",
    birthday || null,
    gender || "",
    address || "",
    userId,
  ];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  return {
    id: user.id,
    fullName: user.full_name || "",
    phone: user.phone || "",
    email: user.email || "",
    birthday: user.birthday || null,
    gender: user.gender || "",
    address: user.address || "",
    createdAt: user.created_at || null,
    updateAt: user.update_at || null,
  };
};

const deleteMyProfile = async (userId) => {
  const query = `
    DELETE FROM customers
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [userId]);

  if (result.rows.length === 0) {
    throw new Error("Không tìm thấy tài khoản để xóa");
  }

  return {
    message: "Xóa tài khoản thành công",
  };
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
};