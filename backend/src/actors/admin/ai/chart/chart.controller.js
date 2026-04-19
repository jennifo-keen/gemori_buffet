const ChartService = require('./chart.service');

const getMonthlyAccuracyReport = async (req, res) => {
    try {
        const rows = await ChartService.getMonthlyAccuracyData();
        const result = rows.map(row => {
            let accuracy = 0;
            if (row.actual === 0 && row.forecast === 0) {
                accuracy = 100;
            } else if (row.actual === 0 || row.forecast === 0) {
                accuracy = 0;
            } else {
                const diff = Math.abs(row.actual - row.forecast);
                // Độ chính xác = 100% - % sai số
                accuracy = Math.max(0, 100 - (diff / row.actual * 100));
            }
            return {
                time: row.time,
                accuracy: Math.round(accuracy)
            };
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { getMonthlyAccuracyReport };
