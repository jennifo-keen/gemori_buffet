const MenuService = require("./menu.service");

class MenuController {
    async getMenus(req, res) {
        try {
            const data = await MenuService.getAllWithStats();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const result = await MenuService.updateStatus(id, status);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async addDish(req, res) {
        try {
            const result = await MenuService.createDish(req.body);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new MenuController();