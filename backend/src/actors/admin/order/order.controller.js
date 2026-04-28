const OrderService = require("./order.service");
class OrderController {

    // GET /orders
    // GET /orders
    async getOrders(req, res) {
        try {
            // ✅ Lấy cả status VÀ date từ query string
            const { status, date } = req.query;

            // ✅ Truyền cả 2 tham số vào Service
            const data = await OrderService.getOrders(status, date);

            res.json({ success: true, data });
        } catch (err) {
            console.error("getOrders error:", err.message);
            res.status(500).json({ success: false });
        }
    }

    // GET /orders/:id
    async getOrderDetail(req, res) {
        try {
            const { id } = req.params;

            const data = await OrderService.getOrderDetail(id);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            res.json({ success: true, data });
        } catch (err) {
            console.error("getOrderDetail error:", err.message);
            res.status(500).json({ success: false });
        }
    }

    // PATCH /orders/:id/status
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatus = ["PENDING", "SERVING", "COMPLETED"];

            if (!validStatus.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status",
                });
            }

            const data = await OrderService.updateOrderStatus(id, status);

            res.json({ success: true, data });
        } catch (err) {
            console.error("updateStatus error:", err.message);
            res.status(500).json({ success: false });
        }
    }
    // DELETE /orders/:id
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const success = await OrderService.deleteOrder(id);

            if (!success) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy đơn hàng để xóa",
                });
            }

            res.json({ success: true, message: "Xóa đơn hàng thành công" });
        } catch (err) {
            console.error("deleteOrder error:", err.message);
            res.status(500).json({ success: false, message: "Lỗi hệ thống khi xóa đơn" });
        }
    }
}

module.exports = new OrderController();