const express = require("express");
const router = express.Router();
const homeController = require("./home.controller");

// API lấy 3 vé buffet cho trang home
router.get("/buffet-tickets", homeController.getHomeBuffetTickets);

module.exports = router;