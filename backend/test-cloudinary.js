// test-cloudinary.js - chạy: node test-cloudinary.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

cloudinary.api.ping().then(res => console.log("✅ OK:", res)).catch(err => console.error("❌ Lỗi:", err.message));