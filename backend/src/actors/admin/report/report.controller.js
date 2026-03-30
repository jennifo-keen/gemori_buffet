const reportService = require('./report.service');

const getDailyRevenue = async (req, res) => {
    try {
        const { month, year } = req.query;
        // Gọi hàm từ service đã export
        const data = await reportService.getRevenueStatistics(parseInt(month), parseInt(year));

        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getDailyRevenue };