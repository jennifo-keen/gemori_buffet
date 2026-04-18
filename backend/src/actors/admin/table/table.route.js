const express = require("express");
const router = express.Router();
const TableController = require("./table.controller");

// GET danh sách bàn
router.get("/", TableController.getTables);

// UPDATE trạng thái
router.patch("/:id/status", TableController.updateStatus);

// ADD bàn
router.post("/", TableController.createTable);

module.exports = router;