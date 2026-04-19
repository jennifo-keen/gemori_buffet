const voucherService = require('./voucher.service');

const voucherController = {
    getAll: async (req, res) => {
        try {
            const data = await voucherService.getAllVouchers();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const newItem = await voucherService.createVoucher(req.body);
            res.status(201).json({ success: true, data: newItem });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await voucherService.updateVoucher(req.params.id, req.body);
            res.json({ success: true, data: updatedItem });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await voucherService.deleteVoucher(req.params.id);
            res.json({ success: true, message: "Deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = voucherController;