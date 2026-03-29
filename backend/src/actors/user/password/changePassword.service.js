const bcrypt = require("bcryptjs");
const { pool } = require("../../../config/db"); // sửa path nếu file db của bạn ở chỗ khác

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const changePassword = async ({
  customerId,
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  if (!customerId) {
    const error = new Error("Không tìm thấy người dùng.");
    error.statusCode = 401;
    throw error;
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    const error = new Error("Vui lòng nhập đầy đủ thông tin.");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword !== confirmPassword) {
    const error = new Error("Xác nhận mật khẩu mới không khớp.");
    error.statusCode = 400;
    throw error;
  }

  if (!PASSWORD_REGEX.test(newPassword)) {
    const error = new Error(
      "Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số."
    );
    error.statusCode = 400;
    throw error;
  }

  if (currentPassword === newPassword) {
    const error = new Error("Mật khẩu mới không được trùng với mật khẩu hiện tại.");
    error.statusCode = 400;
    throw error;
  }

  const userResult = await pool.query(
    `
      SELECT id, password_hash
      FROM customers
      WHERE id = $1
      LIMIT 1
    `,
    [customerId]
  );

  if (userResult.rows.length === 0) {
    const error = new Error("Người dùng không tồn tại.");
    error.statusCode = 404;
    throw error;
  }

  const user = userResult.rows[0];

  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

  if (!isMatch) {
    const error = new Error("Mật khẩu hiện tại không đúng.");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
      UPDATE customers
      SET password_hash = $1,
          update_at = NOW()
      WHERE id = $2
    `,
    [hashedPassword, customerId]
  );

  return {
    message: "Đổi mật khẩu thành công.",
  };
};

module.exports = {
  changePassword,
};