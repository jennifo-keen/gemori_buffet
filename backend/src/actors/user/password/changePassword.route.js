const express = require("express");
const router = express.Router();
const changePasswordController = require("./changePassword.controller");
const { verifyToken } = require("../../../middlewares/user.middleware");

router.post(
  "/change",
  verifyToken,
  changePasswordController.changePassword
);

module.exports = router;