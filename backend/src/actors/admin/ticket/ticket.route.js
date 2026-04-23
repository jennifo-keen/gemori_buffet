const express = require('express');
const router = express.Router();
const buffetController = require('./ticket.controller');
const { uploadTickets } = require('../../../config/cloudinary');

router.get("/", buffetController.getTickets);
router.patch("/:id/status", buffetController.patchStatus);
router.post("/create_ticket", uploadTickets.single('image'), buffetController.createTicket);
router.delete("/:id", buffetController.deleteTicket);
router.put('/:id', buffetController.updateTicket);
module.exports = router;