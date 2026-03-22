const { Router } = require('express');

const router = Router();

router.use('/auth',      require('../actors/admin/auth/auth.route'));
router.use('/tables',    require('../modules/tables/tables.route'));
router.use('/orders',    require('../modules/orders/orders.route'));
router.use('/customers', require('../modules/customers/customers.route'));
router.use('/vouchers',  require('../modules/vouchers/vouchers.route'));
router.use('/payment',   require('../modules/payment/payment.route'));
router.use('/kitchen',   require('../modules/kitchen/kitchen.route'));


router.use('/users', require('../actors/user/auth/customerAuth.route'));

module.exports = router;