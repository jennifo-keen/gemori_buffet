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
            console.log("---------- DEBUG ADD DISH ----------");
            console.log("Check req.file:", req.file);
            console.log("Check req.body:", req.body);
            const { name, category } = req.body;

            // controllers/menuController.js
            const image_url = req.file ? req.file.secure_url : null;

            const result = await MenuService.createDish({ name, category, image_url });
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteDish(req, res) {
        try {
            const { id } = req.params;
            const result = await MenuService.deleteDish(id);

            if (!result) {
                return res.status(404).json({ success: false, message: "Không tìm thấy món ăn" });
            }

            res.json({ success: true, message: "Xóa món thành công", data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async updateDish(req, res) {
        try {
            const { id } = req.params;
            const { name, category } = req.body;
            // Nếu có upload ảnh mới thì lấy secure_url từ Cloudinary, không thì để null
            const image_url = req.file ? req.file.secure_url : null;

            const result = await MenuService.updateDish(id, { name, category, image_url });
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new MenuController();