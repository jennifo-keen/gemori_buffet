const { Router } = require('express');
const { authMiddleware, requireRole } = require('../../../middlewares/auth.middleware');
const customersController = require('../controllers/customers.controller');
const kitchenController = require('../controllers/kitchen.controller');
const menuController = require('../controllers/menu.controller');
const ordersController = require('../controllers/orders.controller');
const paymentController = require('../controllers/payment.controller');
const tablesController = require('../controllers/tables.controller');
const vouchersController = require('../controllers/vouchers.controller');

const router = Router();

// router.use(authMiddleware);

// ============ CUSTOMERS ROUTES ============
router.get('/customers/phone/:phone', requireRole('staff', 'admin'), customersController.getByPhone);
router.get('/customers', requireRole('staff', 'admin'), customersController.getAll);
router.post('/customers', requireRole('staff', 'admin'), customersController.create);
router.put('/customers/:id', requireRole('staff', 'admin'), customersController.update);
router.delete('/customers/:id', requireRole('staff', 'admin'), customersController.remove);

// ============ KITCHEN ROUTES ============
router.get('/kitchen/items', requireRole('staff', 'admin', 'kitchen'), kitchenController.getPendingItems);
router.patch('/kitchen/items/:id/status', requireRole('staff', 'admin', 'kitchen'), kitchenController.updateStatus);

// ============ MENU ROUTES ============
router.get('/menu/tickets', menuController.getBuffetTickets);
router.get('/menu', menuController.getAllMenus);

// ============ ORDERS ROUTES ============
router.get('/orders', requireRole('admin'), ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrder);
router.post('/orders/create', requireRole('staff', 'admin'), ordersController.createOrder);

// ============ PAYMENT ROUTES ============
router.post('/payment/checkout', requireRole('staff', 'admin'), paymentController.checkout);

// ============ TABLES ROUTES ============
router.get('/tables', tablesController.getAll);
router.patch('/tables/:id/open', requireRole('staff', 'admin'), tablesController.openTable);
router.patch('/tables/:id/close', requireRole('staff', 'admin'), tablesController.closeTable);
router.get('/tables/:id/order', tablesController.getTableOrder);

// ============ VOUCHERS ROUTES ============
router.post('/vouchers/validate', requireRole('staff', 'admin'), vouchersController.validate);

module.exports = router;