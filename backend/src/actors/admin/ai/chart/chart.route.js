const express = require('express');
const router = express.Router();
const controller = require('./chart.controller');

router.get('/', controller.getMonthlyAccuracyReport);

module.exports = router;