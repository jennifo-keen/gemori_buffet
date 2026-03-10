const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../middlewares/auth.middleware');
const tablesController = require('./tables.controller');

const router = Router();
router.use(authMiddleware);

router.get('/', tablesController.getAll);                                            // Web 3, 4
router.patch('/:id/open', requireRole('staff', 'admin'), tablesController.openTable);   // Web 3
router.patch('/:id/close', requireRole('staff', 'admin'), tablesController.closeTable); // Web 3
router.get('/:id/order', tablesController.getTableOrder);                            // Web 3

module.exports = router;