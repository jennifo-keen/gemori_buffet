const buffetService = require('./ticket.service');

const getTickets = async (req, res) => {
    try {
        const tickets = await buffetService.getAllTickets();
        res.json(tickets);
    } catch (error) {
        console.error("🔥 GET TICKETS ERROR:", error);
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

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, menu_ids } = req.body;

        // Nếu m dùng multer, ảnh sẽ nằm trong req.file. 
        // Nếu không gửi file mới, image_url sẽ là null và Service sẽ giữ ảnh cũ.
        const image_url = req.file ? req.file.path : null;

        // Ép kiểu menu_ids về mảng nếu FE gửi lên dạng string hoặc undefined
        const parsedMenuIds = Array.isArray(menu_ids) ? menu_ids : (menu_ids ? [menu_ids] : []);

        const updated = await buffetService.updateTicket(id, {
            name,
            price,
            description,
            image_url,
            menu_ids: parsedMenuIds
        });

        if (!updated) {
            return res.status(404).json({ message: "Không tìm thấy vé để cập nhật!" });
        }

        return res.status(200).json({
            success: true,
            message: "Cập nhật vé và thực đơn thành công",
            ticket: updated
        });
    } catch (error) {
        console.error("🔥 UPDATE TICKET ERROR:", error);
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
        // Nếu lỗi do ràng buộc dữ liệu (mã 23503 trong Postgres)
        if (error.code === '23503') {
            return res.status(400).json({
                message: "Vé này đã có dữ liệu giao dịch/hóa đơn, không thể xóa vĩnh viễn. Hãy dùng chức năng 'Tạm ngưng'!"
            });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTickets, patchStatus, createTicket, deleteTicket, updateTicket };