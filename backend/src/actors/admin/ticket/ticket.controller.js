const buffetService = require('./ticket.service');

const getTickets = async (req, res) => {
    try {
        const tickets = await buffetService.getAllTickets();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const patchStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        const updated = await buffetService.updateStatus(id, is_active);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTicket = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image_url = req.file ? req.file.path : null;

        if (!name || !price) {
            return res.status(400).json({ message: "Tên và giá vé là bắt buộc!" });
        }

        const newTicket = await buffetService.createTicket({
            name,
            price,
            description,
            image_url
        });

        return res.status(201).json({
            success: true,
            message: "Tạo vé buffet thành công",
            ticket: newTicket
        });
    } catch (error) {
        console.error("🔥 ERROR:", error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await buffetService.deleteTicket(id);
        
        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy vé để xóa!" });
        }
        
        res.json({ message: "Xóa vé thành công", deletedTicket: deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTickets, patchStatus, createTicket, deleteTicket };