const analyzeCompareDay = (a, b) => {
    const percent = b > 0 ? ((a - b) / b * 100).toFixed(1) : 0;

    return a >= b
        ? `📈 Tăng ${percent}%`
        : `📉 Giảm ${Math.abs(percent)}%`;
};

module.exports = { analyzeCompareDay };