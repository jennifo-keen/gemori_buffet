const { spawn } = require("child_process");
const { pool } = require("../../../../config/db");
const { processSQL } = require("./queryProcessor");

// 🎯 format tiền
const formatMoney = (num) => {
    return Number(num).toLocaleString("vi-VN") + "đ";
};

// 🎯 format câu trả lời

const calcCompare = (current, previous, label) => {
    const diff = current - previous;
    const percent = previous === 0
        ? 100
        : ((diff / previous) * 100).toFixed(1);

    if (diff > 0) {
        return `📈 ${label} tăng ${percent}% (${formatMoney(diff)})`;
    } else if (diff < 0) {
        return `📉 ${label} giảm ${Math.abs(percent)}% (${formatMoney(diff)})`;
    } else {
        return `😐 ${label} không thay đổi`;
    }
};

const formatResponse = (sql, rows, question) => {

    if (!rows || rows.length === 0) {
        return "😢 Không có dữ liệu";
    }

    question = question.toLowerCase();

    // 📊 SO SÁNH (DAY / MONTH / YEAR)
    if (rows[0].today !== undefined && rows[0].yesterday !== undefined) {
        return calcCompare(
            Number(rows[0].today),
            Number(rows[0].yesterday),
            "Doanh thu hôm nay"
        );
    }

    if (rows[0].current !== undefined && rows[0].previous !== undefined) {

        if (sql.includes("month")) {
            return calcCompare(
                Number(rows[0].current),
                Number(rows[0].previous),
                "Doanh thu tháng này"
            );
        }

        if (sql.includes("year")) {
            return calcCompare(
                Number(rows[0].current),
                Number(rows[0].previous),
                "Doanh thu năm nay"
            );
        }
    }

    // 💰 DOANH THU
    if (rows[0].total !== undefined && sql.includes("SUM(amount)")) {

        if (question.includes("từ") && question.includes("đến")) {
            return `💰 Tổng doanh thu trong khoảng thời gian: ${formatMoney(rows[0].total)}`;
        }

        return `💰 Doanh thu: ${formatMoney(rows[0].total)}`;
    }

    // 📦 SỐ ĐƠN
    if (rows[0].total !== undefined && sql.includes("COUNT(*)")) {
        return `📦 Có ${rows[0].total} đơn hàng`;
    }

    // ⚠️ TỒN KHO
    if (sql.includes("stock_quantity")) {

        if (rows.length === 0) {
            return "✅ Tồn kho ổn, không có món nào sắp hết";
        }

        let text = "⚠️ Cảnh báo tồn kho:\n";

        rows.forEach((item) => {
            text += `- ${item.name} (còn ${item.stock_quantity})\n`;
        });

        return text;
    }

    // 🔥 GỢI Ý
    if (
        question.includes("nên") ||
        question.includes("chuẩn bị") ||
        question.includes("nhập")
    ) {
        let text = "🔥 Gợi ý món nên chuẩn bị:\n";

        rows.forEach((item, index) => {
            text += `${index + 1}. ${item.name} (${item.total})\n`;
        });

        return text;
    }

    // 🧊 MÓN BÁN ÍT
    if (sql.includes("ORDER BY total ASC")) {
        let text = "🧊 Món bán ít:\n";

        rows.forEach((item, index) => {
            text += `${index + 1}. ${item.name} (${item.total})\n`;
        });

        return text;
    }

    // 🔥 TOP MÓN
    if (sql.includes("GROUP BY")) {
        let text = "🔥 Top món bán chạy:\n";

        rows.forEach((item, index) => {
            text += `${index + 1}. ${item.name} (${item.total} món)\n`;
        });

        return text;
    }

    return JSON.stringify(rows);
};

const semanticSearch = (question) => {
    return new Promise((resolve) => {

        const py = spawn("py", [
            "./src/actors/admin/ai/ai_agent/nlp/samantic_search.py",
            JSON.stringify({ question })
        ]);

        let data = "";

        py.stdout.on("data", (chunk) => {
            data += chunk.toString();
        });

        py.stderr.on("data", (err) => {
            console.error("PY ERROR:", err.toString());
        });

        py.on("close", () => {
            console.log("RAW PYTHON:", data);

            if (!data) {
                return resolve({ sql: null, confidence: 0 });
            }

            try {
                resolve(JSON.parse(data));
            } catch (err) {
                console.error("PARSE ERROR:", data);
                resolve({ sql: null, confidence: 0 });
            }
        });
    });
};

const askAI = async (question) => {
    try {

        console.log("QUESTION:", question);

        // 🧠 1. AI chọn SQL
        const ai = await semanticSearch(question);

        console.log("AI RESULT:", ai);

        if (!ai.sql || ai.confidence < 0.3) {
            return { answer: "🤔 Tui chưa hiểu câu hỏi của bạn á 😢" };
        }

        // 🧠 2. Inject param
        const finalSQL = processSQL(ai.sql, question);

        console.log("FINAL SQL:", finalSQL);

        // 🧠 3. Query DB
        const result = await pool.query(finalSQL);

        // 🧠 4. FORMAT ĐẸP
        const answer = formatResponse(finalSQL, result.rows, question);

        return { answer };

    } catch (err) {
        console.error("AI ERROR:", err);
        return { answer: "😵 Lỗi hệ thống rồi, thử lại nha!" };
    }
};

module.exports = { askAI };