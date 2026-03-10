const ordersService = require('./orders.service');

const getOrder = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderById(req.params.id);
    res.json(order);
  } catch (err) { next(err); }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { status, from, to } = req.query;
    const orders = await ordersService.getAllOrders({ status, from, to });
    res.json(orders);
  } catch (err) { next(err); }
};

module.exports = { getOrder, getAllOrders };