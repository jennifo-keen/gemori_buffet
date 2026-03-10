const { pool } = require('../../lib/db');

// Kiểm tra voucher hợp lệ khi thanh toán — Web 3
const validateVoucher = async (code, baseAmount) => {
  const result = await pool.query(
    'SELECT * FROM vouchers WHERE code = $1',
    [code]
  );

  const voucher = result.rows[0];
  if (!voucher) throw { status: 404, message: 'Mã giảm giá không tồn tại' };
  if (!voucher.is_active) throw { status: 400, message: 'Mã giảm giá không còn hoạt động' };

  const now = new Date();

  // Kiểm tra theo ngày
  if (voucher.start_date && new Date(voucher.start_date) > now)
    throw { status: 400, message: 'Mã giảm giá chưa có hiệu lực' };
  if (voucher.end_date && new Date(voucher.end_date) < now)
    throw { status: 400, message: 'Mã giảm giá đã hết hạn' };

  // Kiểm tra theo số lượng (quantity = null nghĩa là không giới hạn)
  if (voucher.quantity !== null && voucher.quantity <= 0)
    throw { status: 400, message: 'Mã giảm giá đã hết lượt sử dụng' };

  // Tính tiền giảm
  let discountAmount = 0;
  if (voucher.discount_type === 'percent') {
    discountAmount = Math.floor(baseAmount * (voucher.discount_value / 100));
  } else {
    // fixed
    discountAmount = voucher.discount_value;
  }

  // Không giảm quá tổng tiền
  discountAmount = Math.min(discountAmount, baseAmount);

  return { voucher, discountAmount };
};

// Trừ số lượng sau khi dùng
const useVoucher = async (voucherId) => {
  await pool.query(
    `UPDATE vouchers
     SET quantity = CASE WHEN quantity IS NOT NULL THEN quantity - 1 ELSE NULL END
     WHERE id = $1`,
    [voucherId]
  );
};

module.exports = { validateVoucher, useVoucher };