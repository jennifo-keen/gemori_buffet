const { spawn } = require("child_process");
const { pool } = require("../../../config/db");
const { processSQL } = require("./queryProcessor");

const semanticSearch = (question) => {
    return new Promise((resolve, reject) => {

        const py = spawn("py", [
            "nlp/samantic_search.py",
            JSON.stringify({ question })
        ]);

        let data = "";

        py.stdout.on("data", (chunk) => {
            data += chunk.toString();
        });

        py.on("close", () => {
            try {
                resolve(JSON.parse(data));
            } catch (err) {
                reject(err);
            }
        });
    });
};

const askAI = async (question) => {
    try {

        // 🧠 1. AI chọn SQL
        const ai = await semanticSearch(question);

        if (ai.confidence < 0.3) {
            return { answer: "🤔 Không hiểu câu hỏi" };
        }

        // 🧠 2. Inject param
        const finalSQL = processSQL(ai.sql, question);

        console.log("SQL:", finalSQL);

        // 🧠 3. Query DB
        const result = await pool.query(finalSQL);

        return {
            answer: JSON.stringify(result.rows)
        };

    } catch (err) {
        console.error(err);
        return { answer: "Lỗi hệ thống 😢" };
    }
};

module.exports = { askAI };