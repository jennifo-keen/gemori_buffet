// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/', userController.getUsers);
router.patch('/:id/status', userController.toggleStatus);

module.exports = router;