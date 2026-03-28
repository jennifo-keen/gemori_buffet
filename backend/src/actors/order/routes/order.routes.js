const { Router } = require('express');
const { tableController, menuController, orderController, authController } = require('../controllers');
const { authCustomerMiddleware } = require('../../../middlewares/auth.middleware');

const router = Router();

// ── Public (chỉ cần tableId từ QR) ──────────────────────────

// 1. Xác thực bàn — gọi đầu tiên khi Web 1 load
// GET /api/order/tables/:tableId/verify
router.get('/tables/:tableId/verify',       tableController.verifyTable);

// 2. Menu theo gói buffet của bàn
// GET /api/order/tables/:tableId/menu
router.get('/tables/:tableId/menu',         menuController.getMenuByTable);

// 3. Xem order + trạng thái món realtime
// GET /api/order/tables/:tableId/order
router.get('/tables/:tableId/order',        orderController.getOrderByTable);

// 4. Gọi món — gửi bếp
// POST /api/order/tables/:tableId/order/items
// Body: { items: [{ menuId, quantity }] }
router.post('/tables/:tableId/order/items', orderController.addItems);

// 5. Hủy món (chỉ khi còn pending)
// DELETE /api/order/order-items/:itemId?tableId=...
router.delete('/order-items/:itemId',       orderController.cancelItem);

// 6. Hóa đơn tạm tính
// GET /api/order/tables/:tableId/bill
router.get('/tables/:tableId/bill',         orderController.getBill);

// ── Customer Auth (thành viên — optional) ───────────────────

// 7. Đăng nhập bằng SĐT + password
// POST /api/order/customer/login
router.post('/customer/login',              authController.customerLogin);

// 8. Đăng ký thành viên tại bàn
// POST /api/order/customer/register
router.post('/customer/register',           authController.customerRegister);

// 9. Xem thông tin thành viên (cần token)
// GET /api/order/customer/profile
router.get('/customer/profile',             authCustomerMiddleware, authController.getProfile);

module.exports = router;