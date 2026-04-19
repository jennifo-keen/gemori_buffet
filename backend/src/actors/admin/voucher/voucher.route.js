const express = require('express');
const router = express.Router();
const voucherController = require('./voucher.controller');

router.get('/', voucherController.getAll);
router.post('/', voucherController.create);
router.put('/:id', voucherController.update);
router.delete('/:id', voucherController.delete);

module.exports = router;