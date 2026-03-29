const changePasswordService = require("./changePassword.service");

const changePassword = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const result = await changePasswordService.changePassword({
      customerId,
      currentPassword,
      newPassword,
      confirmPassword,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Lỗi server khi đổi mật khẩu.",
    });
  }
};

module.exports = {
  changePassword,
};