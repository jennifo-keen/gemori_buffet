const { Router } = require('express');


const router = Router();

router.use('/admin/report', require('../actors/admin/report/report.route'));
router.use('/admin/forecast', require('../actors/admin/ai/forecastRoutes'));
router.use('/admin/chat', require('../actors/admin/ai/chatagentRoutes'));
router.use('/admin/tickets', require('../actors/admin/ticket/ticket.route'));
router.use('/admin/menus', require("../actors/admin/menu/menu.route"));
router.use('/admin/tables', require("../actors/admin/table/table.route"));
router.use('/admin/orders', require("../actors/admin/order/order.route"));

router.use('/auth', require('../actors/admin/auth/auth.route'));
router.use('/staff', require('../actors/staff/routes/staff.route'));
router.use('/kitchen', require('../actors/kitchen/routes/kitchen.routes'));
//user_member
router.use('/users', require('../actors/user/auth/customerAuth.route'));
router.use('/home', require('../actors/user/home/home.router'));
router.use('/menu', require('../actors/user/menu/menu.route'));
router.use('/profile', require('../actors/user/profile/profile.route'));
router.use('/order', require('../actors/order/routes/order.routes'));
router.use('/vouchers', require('../actors/user/discount/voucher.routes'));
router.use('/history', require('../actors/user/history/history.route'));
router.use('/password', require('../actors/user/password/changePassword.route'));

module.exports = router;