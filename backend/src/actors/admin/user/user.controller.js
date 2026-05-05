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

const getStats = async (req, res) => {
    try {
        const stats = await userService.getUserStats();
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
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

const addUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!name || !email || !password || !role) {
            return res.status(400).json({ 
                success: false, 
                message: "Vui lòng nhập đầy đủ các trường bắt buộc!" 
            });
        }

        // Gọi hàm createUser từ userService (hàm t đã viết ở bước trước)
        const newUser = await userService.createUser({
            name,
            email,
            phone,
            password,
            role
        });

        res.status(201).json({ 
            success: true, 
            message: "Thêm người dùng thành công!",
            data: newUser 
        });
    } catch (error) {
        console.error("Lỗi Controller addUser:", error);
        res.status(500).json({ 
            success: false, 
            message: "Lỗi máy chủ khi thêm người dùng: " + error.message 
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.query; // FE gửi: /admin/users/id?role=staff

        if (!id || !role) {
            return res.status(400).json({ success: false, message: "Thiếu ID hoặc Role!" });
        }

        await userService.deleteUser(id, role);
        res.status(200).json({ success: true, message: "Xóa người dùng thành công!" });
    } catch (error) {
        console.error("Lỗi Controller deleteUser:", error);
        res.status(500).json({ success: false, message: "Lỗi khi xóa: " + error.message });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role } = req.body;

        if (!id || !role) {
            return res.status(400).json({ success: false, message: "Thiếu ID hoặc Role để update!" });
        }

        await userService.updateUser(id, role, { name, email, phone });
        res.status(200).json({ success: true, message: "Cập nhật thông tin thành mission!" });
    } catch (error) {
        console.error("Lỗi Controller updateUser:", error);
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật: " + error.message });
    }
};

module.exports = { getUsers, toggleStatus, getStats, addUser, deleteUser, updateUser };