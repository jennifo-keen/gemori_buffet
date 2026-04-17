const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const ticketStorage = cloudinaryStorage({
    cloudinary,
    params: {
        folder: 'gemori_buffet/buffet_tickets',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        resource_type: 'image',
    },
});

const menuStorage = cloudinaryStorage({
    cloudinary,
    params: {
        folder: 'gemori_buffet/menus',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const uploadTickets = multer({ storage: ticketStorage });
const uploadMenus = multer({ storage: menuStorage });

module.exports = { uploadTickets, uploadMenus };
