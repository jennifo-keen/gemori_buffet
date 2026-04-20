const { spawn } = require("child_process");
const { pool } = require("../../../../config/db");
const { processSQL } = require("./queryProcessor");
const { generateAnswer } = require("./llm");

// 🎯 format tiền
const formatMoney = (num) => {
    return Number(num || 0).toLocaleString("vi-VN") + "đ";
};

// 🎯 fallback (chỉ dùng khi AI fail)
const formatResponse = (sql, rows, question) => {
    if (!rows || rows.length === 0) {
        return "😢 Không có dữ liệu cho yêu cầu này.";
    }

    const first = rows[0];

    //payment
    if (first.payment_method && first.total !== undefined) {
        return `💳 Phương thức phổ biến: ${first.payment_method} (${first.total} lượt)`;
    }

    // voucher
    if (first.code && first.total !== undefined && !first.start_date) {
        return `🎟 Voucher phổ biến: ${first.code} (${first.total} lượt)`;
    }

    // bàn
    if (first.table_code && first.status) {
        return `🪑 Có ${rows.length} bàn (${first.status})`;
    }

    // món
    if (first.name && (first.total !== undefined || first.sum !== undefined)) {
        let text = "🍽 Danh sách món:\n";
        rows.forEach((r, i) => {
            text += `${i + 1}. ${r.name} (${r.total || r.sum})\n`;
        });
        return text;
    }

    // doanh thu
    if (sql.toLowerCase().includes("sum(amount)")) {
        return `💰 Doanh thu: ${formatMoney(first.total)}`;
    }

    return "📊 " + JSON.stringify(rows);
};

//  gọi python semantic
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

//  MAIN
const askAI = async (question) => {
    try {
        console.log("QUESTION:", question);

        // 1. AI chọn SQL
        const ai = await semanticSearch(question);
        console.log("AI RESULT:", ai);

        if (!ai.sql || ai.confidence < 0.3) {
            return { answer: " Tui chưa hiểu câu hỏi này lắm, hỏi rõ hơn giúp tui nha!" };
        }

        //  2. xử lý SQL dynamic
        const finalSQL = processSQL(ai.sql, question);
        console.log("FINAL SQL:", finalSQL);

        // query DB
        const result = await pool.query(finalSQL);
        console.log("ROWS:", result.rows);

        //  AI sinh câu trả lời
        let answer = await generateAnswer(question, finalSQL, result.rows);

        //fallback nếu AI lỗi hoặc trả rỗng
        if (!answer || answer.length < 5) {
            console.log(" FALLBACK RESPONSE");
            answer = formatResponse(finalSQL, result.rows, question);
        }

        return { answer };

    } catch (err) {
        console.error("AI ERROR:", err);
        return { answer: "😵 Hệ thống bị lỗi rồi, thử lại sau nha!" };
    }
};

module.exports = { askAI };