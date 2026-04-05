const kitchenService = require('../services/kitchen.service');

// Lấy danh sách món cần làm — group theo bàn
const getPendingItems = async (req, res, next) => {
  try {
    const data = await kitchenService.getPendingItems();
    res.json(data);
  } catch (err) { next(err); }
};

// Cập nhật trạng thái 1 món
const updateItemStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status)
      return res.status(400).json({ message: 'Thiếu status' });

    const result = await kitchenService.updateItemStatus(req.params.id, status);
    res.json(result);
  } catch (err) { next(err); }
};

// Cập nhật tất cả món của 1 bàn
const updateAllByTable = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status)
      return res.status(400).json({ message: 'Thiếu status' });

    const result = await kitchenService.updateAllItemsByTable(
      req.params.tableCode,
      status
    );
    res.json(result);
  } catch (err) { next(err); }
};

// Thống kê nhanh
const getStats = async (req, res, next) => {
  try {
    const stats = await kitchenService.getKitchenStats();
    res.json(stats);
  } catch (err) { next(err); }
};

module.exports = { getPendingItems, updateItemStatus, updateAllByTable, getStats };