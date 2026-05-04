const userService = require('./user.service');

const getUsers = async (req, res) => { // THÊM CHỮ async Ở ĐÂY
    try {
        const { tab } = req.query;

        // Bây giờ await mới hợp lệ
        const users = await userService.getAllUsers(tab);

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error("Lỗi Controller:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const toggleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, active } = req.body;

        // Frontend gửi lên 'active' hiện tại là true/false, ta chuyển sang string cho DB
        const newStatus = active ? 'active' : 'inactive';

        await userService.updateUserStatus(id, role, newStatus);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = { getUsers, toggleStatus };