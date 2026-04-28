const express = require("express");
const router = express.Router();
const MenuController = require("./menu.controller");
const { uploadMenus } = require('../../../config/cloudinary');

router.get("/", MenuController.getMenus);
router.patch("/:id/status", MenuController.toggleStatus);
router.post("/add", uploadMenus.single('image'), MenuController.addDish);
router.delete("/:id/delete", MenuController.deleteDish);
router.put("/:id", uploadMenus.single('image'), MenuController.updateDish);


module.exports = router;