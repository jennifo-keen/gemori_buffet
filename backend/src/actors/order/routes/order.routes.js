const { Router } = require('express');
const authController  = require('../controllers/auth.controller');
const menuController  = require('../controllers/menu.controller');
const orderController = require('../controllers/order.controller');
const { authCustomerMiddleware } = require('../../../middlewares/auth.middleware');

const router = Router();

// ── Public (chỉ cần tableId từ QR) ──────────────────────────

// 1. Menu theo gói buffet của bàn
router.get('/:tableCode/menu',         menuController.getMenuByTable);

// 3. Xem order + trạng thái món realtime
router.get('/:tableCode/order',        orderController.getOrderByTable);

// 4. Gọi món — gửi bếp
// Body: { items: [{ menuId, quantity }] }
router.post('/:tableCode/order/items', orderController.addItems);

// 5. Hủy món (chỉ khi còn pending)
router.delete('/order-items/:itemId',       orderController.cancelItem);

// 6. Hóa đơn tạm tính
router.get('/:tableCode/bill',         orderController.getBill);

// ── Customer Auth (thành viên — optional) ───────────────────

// 7. Đăng nhập bằng SĐT + password
router.post('/customer/login',              authController.customerLogin);

// 8. Đăng ký thành viên tại bàn
router.post('/customer/register',           authController.customerRegister);

// 9. Xem thông tin thành viên (cần token)
router.get('/customer/profile',        authCustomerMiddleware, authController.getProfile);
router.put('/customer/profile',        authCustomerMiddleware, authController.updateProfile);
router.delete('/customer/account',     authCustomerMiddleware, authController.deleteAccount);
router.get('/customer/vouchers',       authCustomerMiddleware, authController.getAvailableVouchers);

module.exports = router;