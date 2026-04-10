const { askAI } = require("../ai_agent/chat.service");

const chatWithAi = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const { question } = req.body;

        const result = await askAI(question);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI lỗi" });
    }
};

module.exports = { chatWithAi };