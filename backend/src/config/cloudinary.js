const cloudinary = require('cloudinary'); // Không .v2 ở đây
const multer = require('multer');
const CloudinaryStorage = require('multer-storage-cloudinary'); // Không { }
require('dotenv').config();

// Cấu hình thì vẫn dùng v2 để nó nhận diện bản mới
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const ticketStorage = new CloudinaryStorage({
    // 🔥 ĐỔI CHỖ NÀY: Chỉ truyền cloudinary thôi, KHÔNG .v2
    // Vì thư viện 2.2.1 nó sẽ tự thêm .v2 vào bên trong code của nó
    cloudinary: cloudinary,
    folder: 'gemori_buffet/buffet_tickets',
    allowedFormats: ['jpg', 'png', 'jpeg'],
});

const menuStorage = new CloudinaryStorage({
    cloudinary: cloudinary, // Tương tự ở đây
    folder: 'gemori_buffet/menus',
    allowedFormats: ['jpg', 'png', 'jpeg'],
});

const uploadTickets = multer({ storage: ticketStorage });
const uploadMenus = multer({ storage: menuStorage });

module.exports = { uploadTickets, uploadMenus };