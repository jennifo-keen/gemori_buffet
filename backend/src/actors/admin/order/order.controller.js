const OrderService = require("./order.service");

class OrderController {

    // GET /orders
    async getOrders(req, res) {
        try {
            const { status } = req.query;

            const data = await OrderService.getOrders(status);

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
}

module.exports = new OrderController();