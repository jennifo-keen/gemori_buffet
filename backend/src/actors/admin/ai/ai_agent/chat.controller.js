const { askAI } = require("./chat.service");

const chatWithAi = async (req, res) => {
    const { question } = req.body;
    const result = await askAI (question);
    res.json(result);
};

module.exports = { chatWithAi };