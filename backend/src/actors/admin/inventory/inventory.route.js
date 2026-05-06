console.log("🚚 Đã load thành công Inventory Route!");
const express = require('express');
const router = express.Router();
const inventoryController = require('./inventory.controller');

router.get('/', inventoryController.getAllInventory);
router.patch('/update-stock/:id', inventoryController.handleStockTransaction);
router.patch('/update-min-quantity/:id', inventoryController.updateMinQuantity);

module.exports = router;