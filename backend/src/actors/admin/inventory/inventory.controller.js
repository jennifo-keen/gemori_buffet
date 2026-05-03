const inventoryService = require('./inventory.service');

const getAllInventory = async (req, res) => {
    try {
        const { filter } = req.query;
        const data = await inventoryService.getInventory(filter);
        const stats = await inventoryService.getInventoryStats();

        res.json({
            success: true,
            data,
            stats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getInventoryData = async (req, res) => {
    try {
        const { filter } = req.query; // 'Tất cả', 'Còn hàng', 'Sắp hết', 'Hết hàng'
        const data = await inventoryService.fetchAll(filter);
        const stats = await inventoryService.getStats();

        res.status(200).json({
            success: true,
            data: data,
            stats: stats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Thêm vào file inventory.controller.js
const handleStockTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { changeAmount, type } = req.body;

        if (!id || !changeAmount || !type) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin: id, số lượng hoặc loại giao dịch."
            });
        }

        const updatedItem = await inventoryService.updateStock(id, changeAmount, type);

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy nguyên liệu trong kho."
            });
        }

        res.json({
            success: true,
            message: `${type === 'import' ? 'Nhập' : 'Xuất'} kho thành công`,
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateMinQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { min_quantity } = req.body;

        if (min_quantity === undefined || min_quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Định mức tối thiểu không hợp lệ."
            });
        }

        const updatedItem = await inventoryService.updateMinQuantity(id, min_quantity);

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy nguyên liệu để cập nhật."
            });
        }

        res.json({
            success: true,
            message: "Cập nhật định mức tối thiểu thành công",
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Thêm vào module.exports
module.exports = { getAllInventory, getInventoryData, handleStockTransaction, updateMinQuantity };