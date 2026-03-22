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

const createOrder = async (req, res, next) => {
  try {
    const { tableId, buffetTicketId, ticketQuantity } = req.body;
    if (!tableId || !buffetTicketId || !ticketQuantity)
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });

    const order = await ordersService.createOrder({ tableId, buffetTicketId, ticketQuantity });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

module.exports = { getOrder, getAllOrders, createOrder };