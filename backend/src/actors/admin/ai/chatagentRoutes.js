const { Router } = require("express");
const { chatWithAi } = require("./ai_agent/chat.controller");
const router = Router();

router.post("/", chatWithAi);

module.exports = router;