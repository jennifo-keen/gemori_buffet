const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../middlewares/auth.middleware');
const paymentController = require('./payment.controller');

const router = Router();
router.use(authMiddleware);

// Web 3 — Staff thanh toán
router.post('/checkout', requireRole('staff', 'admin'), paymentController.checkout);

module.exports = router;