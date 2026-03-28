const paymentService = require('../services/payment.service');

const checkout = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, phone, voucherCode } = req.body;
    if (!orderId || !paymentMethod)
      return res.status(400).json({ message: 'Thiếu orderId hoặc paymentMethod' });

    // Validate orderId is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(orderId)) {
      return res.status(400).json({ message: 'orderId không hợp lệ' });
    }

    const result = await paymentService.processPayment({
      orderId,
      paymentMethod,
      phone,
      voucherCode,
    });
    res.json(result);
  } catch (err) { next(err); }
};

module.exports = { checkout };