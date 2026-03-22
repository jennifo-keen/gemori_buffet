const { Router } = require('express');

const router = Router();

router.use('/auth',      require('../actors/admin/auth/auth.route'));
router.use('/',    require('../actors/staff/routes/staff.route'));
router.use('/users', require('../actors/user/auth/customerAuth.route'));

module.exports = router;