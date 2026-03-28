const { Router } = require('express');

const router = Router();

router.use('/auth',      require('../actors/admin/auth/auth.route'));
router.use('/',    require('../actors/staff/routes/staff.route'));
router.use('/users', require('../actors/user/auth/customerAuth.route'));
router.use('/home', require('../actors/user/home/home.router'));
router.use('/menu', require('../actors/user/menu/menu.route'));
router.use('/profile', require('../actors/user/profile/profile.route'));
router.use('/order', require('../actors/order/routes/order.routes'));
module.exports = router;