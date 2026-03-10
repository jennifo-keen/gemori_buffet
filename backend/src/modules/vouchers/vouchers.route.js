const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../middlewares/auth.middleware');
const vouchersController = require('./vouchers.controller');

const router = Router();
router.use(authMiddleware);

// Web 3 — Kiểm tra mã khi thanh toán
router.post('/validate', requireRole('staff', 'admin'), vouchersController.validate);

module.exports = router;