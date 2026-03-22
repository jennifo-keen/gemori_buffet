const express = require("express");
const router = express.Router();
const profileController = require("./profile.controller");

const { verifyToken } = require("../../../middlewares/user.middleware");

router.get("/me", verifyToken, profileController.getMyProfile);
router.put("/me", verifyToken, profileController.updateMyProfile);

module.exports = router;