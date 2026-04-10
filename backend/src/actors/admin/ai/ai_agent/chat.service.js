const intentConfig = require("./intentConfig");
const queries = require("./queryMapper");
const { buildList } = require("./responseBuilder");

const formatMoney = (num) =>
    Number(num || 0).toLocaleString("vi-VN");

// render template
const renderTemplate = (template, data) => {
    let result = template;

    Object.keys(data).forEach(key => {
        result = result.replace(`{${key}}`, data[key]);
    });

    return result;
};

const askAI = async (question) => {
    try {
        const ai = await classify(question);

        const { intent, entities } = ai;

        // =============================
        // 🔥 SPECIAL CASE
        // =============================

        if (intent === "revenue_by_date") {

            const result = await pool.query(
                queries.revenue_by_date,
                [entities.date]
            );

            return {
                answer: `📅 ${entities.date}: ${formatMoney(result.rows[0].total)} VND`
            };
        }

        if (intent === "revenue_compare_day") {
            const today = await pool.query(queries.revenue_today);
            const yesterday = await pool.query(queries.revenue_yesterday);

            return {
                answer: analyzeCompareDay(
                    today.rows[0].total,
                    yesterday.rows[0].total
                )
            };
        }

        if (intent === "revenue_compare_month") {
            const thisMonth = await pool.query(queries.revenue_month);
            const lastMonth = await pool.query(queries.revenue_last_month);

            return {
                answer: analyzeCompareMonth(
                    thisMonth.rows[0].total,
                    lastMonth.rows[0].total
                )
            };
        }

        // =============================
        // 🔥 AUTO MAPPING
        // =============================

        const config = intentConfig[intent];

        if (!config) {
            return { answer: "❌ Intent chưa hỗ trợ" };
        }

        const sql = queries[config.query];
        const result = await pool.query(sql);

        let data = {};

        if (config.type === "single") {
            data.total = formatMoney(result.rows[0].total);
        }

        if (config.type === "list") {
            data.list = buildList(result.rows, "name", "total");
        }

        const answer = renderTemplate(config.template, data);

        return { intent, answer };

    } catch (err) {
        console.error(err);
        return { answer: "Lỗi hệ thống 😢" };
    }
};