const menuService = require("./menu.service");

const getAllBuffetTickets = async (req, res) => {
  try {
    const data = await menuService.getAllBuffetTickets();

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách buffet thành công",
      data,
    });
  } catch (error) {
    console.error("❌ getAllBuffetTickets error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách buffet",
    });
  }
};

const getBuffetTicketDetail = async (req, res) => {
  try {
    const { code } = req.params;

    const buffet = await menuService.getBuffetTicketByCode(code);

    if (!buffet) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy gói buffet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy chi tiết buffet thành công",
      data: buffet,
    });
  } catch (error) {
    console.error("❌ getBuffetTicketDetail error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy chi tiết buffet",
    });
  }
};

module.exports = {
  getAllBuffetTickets,
  getBuffetTicketDetail,
};