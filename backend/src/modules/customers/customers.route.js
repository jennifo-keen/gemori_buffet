const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../middlewares/auth.middleware');
const customersController = require('./customers.controller');

const router = Router();
router.use(authMiddleware);

// Web 3 — Tìm theo SĐT khi thanh toán
router.get('/phone/:phone', requireRole('staff', 'admin'), customersController.getByPhone);

// Web 3, 4 — Quản lý thành viên
router.get('/', requireRole('staff', 'admin'), customersController.getAll);
router.post('/', requireRole('staff', 'admin'), customersController.create);
router.put('/:id', requireRole('staff', 'admin'), customersController.update);
router.delete('/:id', requireRole('staff', 'admin'), customersController.remove);

module.exports = router;