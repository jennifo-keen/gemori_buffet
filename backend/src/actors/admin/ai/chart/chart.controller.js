const ChartService = require('./chart.service');

const getMonthlyAccuracyReport = async (req, res) => {
    try {
        const rows = await ChartService.getMonthlyAccuracyData();
        const result = rows.map(row => {
            if (row.actual === 0 && row.forecast === 0) {
                return { time: row.time, accuracy: null };
            }

            let accuracy = 0;
            const act = parseFloat(row.actual);
            const pred = parseFloat(row.forecast);

            if (act === 0) {
                // Có dự báo mà thực tế không bán được đơn nào -> Sai số 100% -> Acc = 0
                accuracy = 0;
            } else {
                const diff = Math.abs(act - pred);
                // Công thức tính độ chính xác chuẩn
                accuracy = Math.max(0, 100 - (diff / act * 100));
            }

            return {
                time: row.time,
                accuracy: Math.round(accuracy)
            };
        });

        // Trả về dữ liệu đã lọc các ngày null
        res.json(result.filter(item => item.accuracy !== null));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { getMonthlyAccuracyReport };
