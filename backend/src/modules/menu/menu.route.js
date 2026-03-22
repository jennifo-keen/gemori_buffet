const { Router } = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const menuController = require('./menu.controller');

const router = Router();
router.use(authMiddleware);

router.get('/tickets', menuController.getBuffetTickets);
router.get('/', menuController.getAllMenus);              

module.exports = router;