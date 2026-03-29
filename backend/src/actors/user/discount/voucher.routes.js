const express = require("express");
const router = express.Router();
const voucherController = require("./voucher.controller");

router.get("/active", voucherController.getActiveVouchers);

module.exports = router;