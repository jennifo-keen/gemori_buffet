const Groq = require("groq-sdk");

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateAnswer = async (question, sql, rows) => {
    try {
        const prompt = `
Bạn là trợ lý AI cho admin nhà hàng buffet.

Câu hỏi:
${question}

SQL đã chạy:
${sql}

Kết quả dữ liệu:
${JSON.stringify(rows)}

Yêu cầu:
- Trả lời tự nhiên như con người
- Không nói về SQL
- Nếu là tiền → thêm đơn vị VND
- Nếu là danh sách → format đẹp
- Nếu không có dữ liệu → trả lời nhẹ nhàng
- Có thể thêm nhận xét ngắn (xu hướng, tăng giảm)
`;

        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant", 
            messages: [
                {
                    role: "system",
                    content: "Bạn là AI phân tích dữ liệu nhà hàng."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7
        });

        return response.choices[0].message.content;

    } catch (err) {
        console.error("GROQ ERROR:", err);
        return null;
    }
};

module.exports = { generateAnswer };