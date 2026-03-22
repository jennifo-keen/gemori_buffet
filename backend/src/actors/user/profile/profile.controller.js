const profileService = require("./profile.service");

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập",
      });
    }

    const data = await profileService.getMyProfile(userId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin người dùng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin hồ sơ thành công",
      data,
    });
  } catch (error) {
    console.error("getMyProfile error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Lỗi khi lấy hồ sơ",
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập",
      });
    }

    const payload = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      birthday: req.body.birthday,
      gender: req.body.gender,
      address: req.body.address,
    };

    const data = await profileService.updateMyProfile(userId, payload);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng để cập nhật",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật hồ sơ thành công",
      data,
    });
  } catch (error) {
    console.error("updateMyProfile error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Lỗi khi cập nhật hồ sơ",
    });
  }
};

const deleteMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập",
      });
    }

    const data = await profileService.deleteMyProfile(userId);

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    console.error("deleteMyProfile error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Lỗi khi xóa tài khoản",
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
};