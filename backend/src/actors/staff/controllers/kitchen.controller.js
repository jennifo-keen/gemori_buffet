const kitchenService = require('../services/kitchen.service');

const getPendingItems = async (req, res, next) => {
  try {
    res.json(await kitchenService.getPendingItems());
  } catch (err) { next(err); }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Thiếu status' });
    res.json(await kitchenService.updateItemStatus(req.params.id, status));
  } catch (err) { next(err); }
};

module.exports = { getPendingItems, updateStatus };