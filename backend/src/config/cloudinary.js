const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Cấu hình lưu trữ cho Ticket
const ticketStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gemori_buffet/buffet_tickets',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        resource_type: 'image'
    },
});

// Cấu hình lưu trữ cho Menu (Món ăn)
const menuStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gemori_buffet/menus',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const uploadTickets = multer({ storage: ticketStorage });
const uploadMenus = multer({ storage: menuStorage });

module.exports = { uploadTickets, uploadMenus };