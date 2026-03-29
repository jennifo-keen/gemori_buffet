const express = require("express");
const controller = require("./history.controller");

const router = express.Router();

router.get("/:customerId", controller.getCustomerOrderHistory);
router.get("/:customerId/:orderId", controller.getOrderDetail);

module.exports = router;