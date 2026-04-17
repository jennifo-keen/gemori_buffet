const getCurrentYear = () => new Date().getFullYear();

const extractDates = (text) => {
    const regex = /(\d{1,2}\/\d{1,2}\/\d{4})|(\d{1,2}\/\d{1,2})/g;
    let matches = text.match(regex) || [];

    return matches.map(d => {
        const parts = d.split("/");
        if (parts.length === 2) return `${parts[0]}/${parts[1]}/${getCurrentYear()}`;
        return d;
    });
};

const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const processSQL = (sql, question) => {
    question = question.toLowerCase();
    const currentYear = getCurrentYear();

    // ===== 1. 📅 THÁNG =====
    const monthMatch = question.match(/tháng\s*(\d{1,2})(?:\s*năm\s*(\d{4}))?/);

    if (monthMatch) {
        const m = monthMatch[1].padStart(2, "0");
        const y = monthMatch[2] || currentYear;

        return `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE EXTRACT(MONTH FROM paid_at) = ${m}
        AND EXTRACT(YEAR FROM paid_at) = ${y}
        `;
    }

    // ===== 2. 📅 THÁNG TRƯỚC =====
    if (question.includes("tháng trước")) {
        return `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE_TRUNC('month', paid_at) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
        `;
    }

    // ===== 3. 📅 HÔM QUA =====
    if (question.includes("hôm qua")) {
        return sql.replace(/CURRENT_DATE/g, "CURRENT_DATE - INTERVAL '1 day'");
    }

    // ===== 4. 📅 HÔM NAY =====
    if (question.includes("hôm nay")) {
        return sql.replace(/CURRENT_DATE/g, "CURRENT_DATE");
    }

    // ===== 5. 📅 RANGE DATE =====
    const dates = extractDates(question);

    if (dates.length >= 2) {
        let d1 = convertDate(dates[0]);
        let d2 = convertDate(dates[1]);

        if (new Date(d1) > new Date(d2)) [d1, d2] = [d2, d1];

        return `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) BETWEEN '${d1}' AND '${d2}'
        `;
    }

    // ===== 6. 📅 1 NGÀY =====
    if (dates.length === 1) {
        const d = convertDate(dates[0]);

        return `
        SELECT COALESCE(SUM(amount),0) as total
        FROM payments
        WHERE DATE(paid_at) = '${d}'
        `;
    }

    // ===== 7. 🔥 LIMIT (top N) =====
    const limitMatch = question.match(/(?:top|limit)\s+(\d+)/i);

    if (limitMatch && sql.toLowerCase().includes("limit")) {
        return sql.replace(/LIMIT \d+/i, `LIMIT ${limitMatch[1]}`);
    }

    return sql;
};

module.exports = { processSQL };