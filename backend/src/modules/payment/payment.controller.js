const paymentService = require('./payment.service');

const checkout = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, phone, voucherCode } = req.body;
    if (!orderId || !paymentMethod)
      return res.status(400).json({ message: 'Thiếu orderId hoặc paymentMethod' });

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