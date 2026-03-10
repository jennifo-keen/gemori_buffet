const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../middlewares/auth.middleware');
const kitchenController = require('./kitchen.controller');

const router = Router();
router.use(authMiddleware);

// Web 3 Staff theo dõi + Web 5 Bếp
router.get('/items', requireRole('staff', 'admin', 'kitchen'), kitchenController.getPendingItems);
router.patch('/items/:id/status', requireRole('staff', 'admin', 'kitchen'), kitchenController.updateStatus);

module.exports = router;