const { pool } = require("../../../../config/db");

const ChartService = {
    getMonthlyAccuracyData: async () => {
        const query = `
    WITH Date_Series AS (
        SELECT generate_series(
            CURRENT_DATE - INTERVAL '14 days', -- Lấy 15 ngày bao gồm hôm nay
            CURRENT_DATE, 
            '1 day'::interval
        )::date AS d
    ),
    AI_Data AS (
        SELECT forecast_date::date as d, SUM(predicted_quantity) as total_pred
        FROM forecast_results
        WHERE forecast_date >= CURRENT_DATE - INTERVAL '15 days'
        GROUP BY d
    ),
    Actual_Data AS (
        SELECT item_order_time::date as d, SUM(quantity) as total_act
        FROM order_items
        WHERE item_order_time >= CURRENT_DATE - INTERVAL '15 days'
        GROUP BY d
    )
    SELECT 
        TO_CHAR(ds.d, 'DD/MM') as time,
        COALESCE(a.total_pred, 0)::int as forecast,
        COALESCE(b.total_act, 0)::int as actual
    FROM Date_Series ds
    LEFT JOIN AI_Data a ON ds.d = a.d
    LEFT JOIN Actual_Data b ON ds.d = b.d
    ORDER BY ds.d;
`;
        const { rows } = await pool.query(query);
        return rows;
    }
};
module.exports = ChartService;
