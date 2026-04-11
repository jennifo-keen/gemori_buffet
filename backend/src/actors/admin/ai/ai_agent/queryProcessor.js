const extractDates = (text) => {
    const regex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    return text.match(regex) || [];
};

// 🔥 convert DD/MM/YYYY → YYYY-MM-DD
const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const extractNumber = (text) => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : null;
};

const processSQL = (sql, question) => {

    // =========================
    // 🔥 LIMIT dynamic
    // =========================
    const limit = extractNumber(question);
    if (limit && sql.includes("LIMIT")) {
        sql = sql.replace(/LIMIT \d+/, `LIMIT ${limit}`);
    }

    // =========================
    // 🔥 DATE RANGE (từ → đến)
    // =========================
    const dates = extractDates(question);

    if (dates.length === 2 && sql.includes("BETWEEN")) {

        let d1 = convertDate(dates[0]);
        let d2 = convertDate(dates[1]);

        // 🔥 fix nếu user nhập ngược ngày
        if (new Date(d1) > new Date(d2)) {
            [d1, d2] = [d2, d1];
        }

        sql = sql.replace(/BETWEEN\s+'[^']+'\s+AND\s+'[^']+'/,
            `BETWEEN '${d1}' AND '${d2}'`
        );
    }

    // =========================
    // 🔥 SINGLE DATE
    // =========================
    if (dates.length === 1) {
        const d = convertDate(dates[0]);

        sql = sql.replace(/CURRENT_DATE/g, `'${d}'`);
    }

    return sql;
};

module.exports = { processSQL };