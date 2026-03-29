const historyService = require("./history.service");

const getCustomerOrderHistory = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await historyService.getCustomerOrderHistory({
      customerId,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: "Lấy lịch sử đơn hàng thành công",
      ...result,
    });
  } catch (error) {
    console.error("getCustomerOrderHistory error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy lịch sử đơn hàng",
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const { customerId, orderId } = req.params;

    const result = await historyService.getOrderDetail({
      customerId,
      orderId,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy hóa đơn",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy chi tiết hóa đơn thành công",
      data: result,
    });
  } catch (error) {
    console.error("getOrderDetail error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy chi tiết hóa đơn",
    });
  }
};

module.exports = {
  getCustomerOrderHistory,
  getOrderDetail,
};