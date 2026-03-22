const homeService = require("./home.service");

const getHomeBuffetTickets = async (req, res) => {
  try {
    const buffetTickets = await homeService.getHomeBuffetTickets();

    return res.status(200).json({
      success: true,
      message: "Lấy dữ liệu buffet của trang home thành công",
      data: buffetTickets,
    });
  } catch (error) {
    console.error("❌ Lỗi getHomeBuffetTickets:", error.message);

    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy dữ liệu buffet trang home",
    });
  }
};

module.exports = {
  getHomeBuffetTickets,
};