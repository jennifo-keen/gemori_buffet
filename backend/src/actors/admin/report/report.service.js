const { pool } = require("../../../config/db");

const getRevenueStatistics = async (month, year) => {
    const query = `
    SELECT
        -- Chuyển paid_at từ UTC sang giờ VN trước khi lấy Ngày (Day)
        CAST(EXTRACT(DAY FROM (paid_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')) AS INTEGER) AS day_num,
        SUM(amount) AS total_revenue
    FROM public.payments
    WHERE
        status = 'paid' 
        AND paid_at IS NOT NULL
        -- Lọc Tháng và Năm cũng dựa trên giờ Việt Nam để khớp 100% với thực tế
        AND EXTRACT(MONTH FROM (paid_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')) = $1::INTEGER
        AND EXTRACT(YEAR FROM (paid_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')) = $2::INTEGER
    GROUP BY day_num
    ORDER BY day_num ASC;
    `;

    try {
        const result = await pool.query(query, [month, year]);
        return result.rows.map(item => ({
            date: String(item.day_num).padStart(2, '0'),
            // Chia 1.000.000 để đổi sang đơn vị Triệu đồng cho biểu đồ đẹp hơn
            revenue: parseFloat(item.total_revenue || 0) / 1000000
        }));
    } catch (error) {
        console.error("Lỗi truy vấn doanh thu:", error);
        throw error;
    }
};

module.exports = {
    getRevenueStatistics,
};