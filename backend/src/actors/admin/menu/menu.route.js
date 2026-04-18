const express = require("express");
const router = express.Router();
const MenuController = require("./menu.controller");

router.get("/", MenuController.getMenus);
router.patch("/:id/status", MenuController.toggleStatus);
router.post("/add", MenuController.addDish);

module.exports = router;