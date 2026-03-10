const vouchersService = require('./vouchers.service');

const validate = async (req, res, next) => {
  try {
    const { code, base_amount } = req.body;
    if (!code || !base_amount)
      return res.status(400).json({ message: 'Thiếu code hoặc base_amount' });

    const result = await vouchersService.validateVoucher(code, Number(base_amount));
    res.json({
      voucher_id: result.voucher.id,
      code: result.voucher.code,
      discount_type: result.voucher.discount_type,
      discount_value: result.voucher.discount_value,
      discount_amount: result.discountAmount,
    });
  } catch (err) { next(err); }
};

module.exports = { validate };