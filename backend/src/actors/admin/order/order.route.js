const express = require("express");
const router = express.Router();
const OrderController = require("./order.controller");

// GET all orders
router.get("/", OrderController.getOrders);

// GET detail
router.get("/:id", OrderController.getOrderDetail);

// UPDATE status
router.patch("/:id/status", OrderController.updateStatus);

module.exports = router;