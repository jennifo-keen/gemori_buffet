const express = require("express");
const router = express.Router();
const LoginController = require("./login.controller");

router.post("/", LoginController.login);

module.exports = router;