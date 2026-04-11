const { pool } = require("../../../config/db");

const getRevenueStatistics = async (month, year) => {
    const query = `
    SELECT 
        CAST(EXTRACT(DAY FROM paid_at) AS INTEGER) AS day_num, 
        SUM(amount) AS total_revenue
    FROM public.payments
    WHERE 
        status = 'paid' 
        AND paid_at IS NOT NULL
        AND EXTRACT(MONTH FROM paid_at) = $1::INTEGER
        AND EXTRACT(YEAR FROM paid_at) = $2::INTEGER
    GROUP BY day_num
    ORDER BY day_num ASC;
`;
    const result = await pool.query(query, [month, year]);
    return result.rows.map(item => ({
        date: String(item.day_num).padStart(2, '0'),
        revenue: parseFloat(item.total_revenue || 0) / 1000000
    }));
};

module.exports = {
    getRevenueStatistics,
};