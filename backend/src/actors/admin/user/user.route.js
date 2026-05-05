// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/', userController.getUsers);
router.patch('/:id/status', userController.toggleStatus);
router.get('/stats', userController.getStats);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;