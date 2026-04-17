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
        return "😢 Không có dữ liệu cho yêu cầu này m ơi.";
    }

    question = question.toLowerCase();
    const first = rows[0];

    // ===== 1. 💳 PAYMENT POPULAR (ƯU TIÊN CAO NHẤT) =====
    if (first.payment_method && first.total !== undefined) {
        return `💳 Khách hay thanh toán bằng **${first.payment_method}** nhất (${first.total} lượt).`;
    }

    // ===== 2. 🎟 VOUCHER POPULAR =====
    if (first.code && first.total !== undefined && !first.start_date) {
        return `🎟 Voucher được dùng nhiều nhất là **${first.code}** (${first.total} lượt).`;
    }

    // ===== 3. 🪑 TABLE STATUS =====
    if (first.table_code && first.status) {
        const grouped = {};
        rows.forEach(r => {
            if (!grouped[r.status]) grouped[r.status] = [];
            grouped[r.status].push(r.table_code);
        });

        let text = "🪑 **Tình trạng bàn:**\n";
        for (const status in grouped) {
            text += `- ${status}: ${grouped[status].join(", ")}\n`;
        }
        return text;
    }

    // ===== 4. 🎟 LIST VOUCHER =====
    if (first.code && first.start_date) {
        let text = "🎟 **Danh sách voucher:**\n";
        rows.forEach(v => {
            text += `- ${v.code} | SL: ${v.quantity} | ${v.is_active ? "🟢 Active" : "🔴 Off"}\n`;
        });
        return text;
    }

    // ===== 5. 📊 COMPARE =====
    if (first.today !== undefined && first.yesterday !== undefined) {
        return calcCompare(Number(first.today), Number(first.yesterday), "Hôm nay");
    }

    if (first.current !== undefined && first.previous !== undefined) {
        return calcCompare(Number(first.current), Number(first.previous), "Giai đoạn này");
    }

    // ===== 6. 🔥 TOP / LOW DISH =====
    if (first.name && (first.sum !== undefined || first.total !== undefined)) {
        const key = first.sum !== undefined ? "sum" : "total";
        const isTop = sql.toLowerCase().includes("desc");

        let text = isTop
            ? "🔥 **Top món bán chạy:**\n"
            : "🧊 **Món bán chậm:**\n";

        rows.forEach((item, i) => {
            text += `${i + 1}. ${item.name} (${item[key]} món)\n`;
        });

        return text;
    }

    // ===== 7. 💰 DOANH THU (CHỈ SUM(amount)) =====
    if (sql.toLowerCase().includes("sum(amount)")) {
        const value = first.total || Object.values(first)[0];

        if (question.includes("từ") && question.includes("đến")) {
            return `💰 Doanh thu trong khoảng: **${formatMoney(value)}**`;
        }

        return `💰 Doanh thu: **${formatMoney(value)}**`;
    }

    // ===== 8. 📦 COUNT =====
    if (Object.values(first)[0] !== undefined && rows.length === 1) {
        const val = Object.values(first)[0];
        return `📊 Kết quả: ${val}`;
    }

    // ===== FALLBACK =====
    return "📊 Kết quả:\n" + JSON.stringify(rows, null, 2);
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