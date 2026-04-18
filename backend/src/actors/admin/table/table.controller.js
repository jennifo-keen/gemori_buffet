const TableService = require("./table.service");

class TableController {
    // GET /tables
    async getTables(req, res) {
        try {
            const data = await TableService.getAllTables();
            res.json({ success: true, data });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false });
        }
    }

    // PATCH /tables/:id/status
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updated = await TableService.updateStatus(id, status);

            res.json({ success: true, data: updated });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false });
        }
    }

    // POST /tables
    async createTable(req, res) {
        try {
            const newTable = await TableService.createTable();
            res.json({ success: true, data: newTable });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false });
        }
    }
}

module.exports = new TableController();