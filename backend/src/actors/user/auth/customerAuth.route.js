const { Router } = require("express");
const { loginUser, registerUser } = require("./customerAuth.controller");

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;