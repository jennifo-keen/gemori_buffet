const { getDashboard } = require("./dashboard.service");

const dashboardController = async (req, res) => {
    try {
        const { date } = req.query;

        const data = await getDashboard(date);

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { dashboardController };