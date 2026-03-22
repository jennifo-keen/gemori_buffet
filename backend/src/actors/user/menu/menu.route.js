const express = require("express");
const router = express.Router();
const menuController = require("./menu.controller");

// Lấy toàn bộ buffet
router.get("/buffet-tickets", menuController.getAllBuffetTickets);

// Lấy chi tiết 1 buffet theo code
router.get("/buffet-tickets/:code", menuController.getBuffetTicketDetail);

module.exports = router;