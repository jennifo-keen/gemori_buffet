const express = require('express');
const router = express.Router();
const buffetController = require('./ticket.controller');
const { uploadTickets } = require('../../../config/cloudinary');

router.get("/", buffetController.getTickets);
router.patch("/:id/status", buffetController.patchStatus);
// ticket.route.js
router.post(
    "/create_ticket",
    (req, res, next) => { console.log("1. Đã nhận request, chuẩn bị upload..."); next(); },
    uploadTickets.single('image'),
    (req, res, next) => { console.log("2. Upload xong! File nè:", req.file); next(); },
    buffetController.createTicket
);
router.delete("/:id", buffetController.deleteTicket);
router.patch('/:id', uploadTickets.single('image'), buffetController.updateTicket);
module.exports = router;