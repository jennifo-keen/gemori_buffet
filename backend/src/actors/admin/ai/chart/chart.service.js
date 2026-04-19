const { pool } = require("../../../../config/db");

const ChartService = {
    getMonthlyAccuracyData: async () => {
        const query = `
            WITH Date_Series AS (
                -- Tạo trục 15 ngày dựa trên giờ UTC hiện tại của hệ thống
                SELECT generate_series(
                    (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date - INTERVAL '14 days', 
                    (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date, 
                    '1 day'::interval
                )::date AS d
            ),
            AI_Data AS (
                -- Ép forecast_date (đang là giờ Việt) về UTC để khớp với trục
                SELECT 
                    (forecast_date AT TIME ZONE 'Asia/Ho_Chi_Minh' AT TIME ZONE 'UTC')::date as d, 
                    SUM(predicted_quantity) as total_pred
                FROM forecast_results
                WHERE forecast_date IS NOT NULL
                GROUP BY d
            ),
            Actual_Data AS (
                -- Lấy ngày từ order_items (vốn đã là UTC sẵn trong DB)
                SELECT 
                    item_order_time::date as d, 
                    SUM(quantity) as total_act
                FROM order_items
                WHERE item_order_time IS NOT NULL
                GROUP BY d
            )
            SELECT 
                TO_CHAR(ds.d, 'DD/MM') as time,
                COALESCE(a.total_pred, 0)::int as forecast,
                COALESCE(b.total_act, 0)::int as actual
            FROM Date_Series ds
            LEFT JOIN AI_Data a ON ds.d = a.d
            LEFT JOIN Actual_Data b ON ds.d = b.d
            ORDER BY ds.d ASC;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }
};

module.exports = ChartService;