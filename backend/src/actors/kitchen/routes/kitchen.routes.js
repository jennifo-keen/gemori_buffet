const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../../middlewares/auth.middleware');
const kitchenController = require('../controllers/kitchen.controller');

const router = Router();
router.use(authMiddleware); 

//Thống kê nhanh — hiện ở top màn hình bếp
//{ pending_count, cooking_count, active_tables }
router.get('/stats', requireRole('kitchen', 'admin', 'staff'), kitchenController.getStats);

//Danh sách món cần làm — group theo bàn
//[{ table_code, table_id, items: [{ id, menu_name, quantity, status, item_order_time }] }]
router.get('/items', requireRole('kitchen', 'admin', 'staff'), kitchenController.getPendingItems);

//Cập nhật trạng thái 1 món
//Body: { status: 'cooking' | 'done' }
router.patch('/items/:id/status', requireRole('kitchen', 'admin', 'staff'), kitchenController.updateItemStatus);

//Cập nhật tất cả món của 1 bàn 
//Body: { status: 'cooking' | 'done' }
router.patch('/:tableCode/status', requireRole('kitchen', 'admin', 'staff'), kitchenController.updateAllByTable);

module.exports = router;