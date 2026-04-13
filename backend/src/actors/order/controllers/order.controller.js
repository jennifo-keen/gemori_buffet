const orderService = require('../services/order.service');
 
const getOrderByTable = async (req, res, next) => {
  try {
    const result = await orderService.getOrderByTable(req.params.tableCode);
    res.json(result);
  } catch (err) { next(err); }
};
 
const addItems = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Danh sách món không hợp lệ' });
 
    // Validate từng item
    for (const item of items) {
      if (!item.menuId || !item.quantity || item.quantity < 1)
        return res.status(400).json({ message: 'Mỗi món cần có menuId và quantity >= 1' });
    }
 
    const result = await orderService.addItems(req.params.tableCode, items);
    res.status(201).json(result);
  } catch (err) { next(err); }
};
 
const cancelItem = async (req, res, next) => {
  try {
    const { tableCode } = req.query; 
    if (!tableCode) return res.status(400).json({ message: 'Thiếu tableCode' });

    const result = await orderService.cancelItem(req.params.itemId, tableCode);
    res.json(result);
  } catch (err) { next(err); }
};
 
const getBill = async (req, res, next) => {
  try {
    const result = await orderService.getBill(req.params.tableCode);
    res.json(result);
  } catch (err) { next(err); }
};
 
module.exports = { getOrderByTable, addItems, cancelItem, getBill };
 