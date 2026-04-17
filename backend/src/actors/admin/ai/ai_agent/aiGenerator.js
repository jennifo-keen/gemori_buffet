const { spawn } = require("child_process");

const generateAnswer = (question, sql, rows) => {
    return new Promise((resolve) => {
        const py = spawn("py", [
            "./src/actors/admin/ai/ai_agent/nlp/generate_answer.py",
            JSON.stringify({ question, sql, rows })
        ]);

        let data = "";

        py.stdout.on("data", (chunk) => {
            data += chunk.toString();
        });

        py.stderr.on("data", (err) => {
            console.error("AI GEN ERROR:", err.toString());
        });

        py.on("close", () => {
            if (!data) return resolve(null);

            try {
                const res = JSON.parse(data);
                resolve(res.answer);
            } catch {
                resolve(null);
            }
        });
    });
};

module.exports = { generateAnswer };