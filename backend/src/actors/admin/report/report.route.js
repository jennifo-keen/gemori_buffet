const express = require('express');
const router = express.Router();
const reportController = require('./report.controller');

// Route lấy doanh thu theo ngày trong tháng hiện tại
router.get('/revenue', reportController.getDailyRevenue);

module.exports = router;