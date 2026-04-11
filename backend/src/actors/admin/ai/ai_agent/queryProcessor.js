const extractNumber = (text) => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : null;
};

const extractDate = (text) => {
    const match = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
    return match ? match[0] : null;
};

const processSQL = (sql, question) => {

    // 🔥 LIMIT dynamic
    const limit = extractNumber(question);
    if (limit && sql.includes("LIMIT")) {
        sql = sql.replace(/LIMIT \d+/, `LIMIT ${limit}`);
    }

    // 🔥 DATE dynamic
    const date = extractDate(question);
    if (date) {
        sql = sql.replace(/CURRENT_DATE/g, `'${date}'`);
    }

    return sql;
};

module.exports = { processSQL };