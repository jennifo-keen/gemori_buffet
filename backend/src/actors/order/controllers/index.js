const authController = require('./auth.controller').authController;
const menuController = require('./menu.controller').menuController;
const orderController = require('./order.controller').orderController;
const tableController = require('./table.controller').tableController;

module.exports = {
  authController,
  menuController,
  orderController,
  tableController,
};