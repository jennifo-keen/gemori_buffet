const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../middlewares/auth.middleware');
const ordersController = require('./orders.controller');

const router = Router();
router.use(authMiddleware);

router.get('/', requireRole('admin'), ordersController.getAllOrders);  // Web 4
router.get('/:id', ordersController.getOrder);                         // Web 3, 4

module.exports = router;