const voucherService = require("./voucher.service");

const getActiveVouchers = async (req, res) => {
  try {
    const vouchers = await voucherService.getActiveVouchers();

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách voucher thành công",
      data: vouchers,
    });
  } catch (error) {
    console.error("Error getting vouchers:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy voucher",
      error: error.message,
    });
  }
};

module.exports = {
  getActiveVouchers,
};