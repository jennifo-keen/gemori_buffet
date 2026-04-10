const analyzeCompareDay = (today, yesterday) => {
    const t = today;
    const y = yesterday;

    const percent = y > 0 ? ((t - y) / y * 100).toFixed(1) : 0;

    return t >= y
        ? `Doanh thu hôm nay tăng ${percent}% so với hôm qua`
        : `Doanh thu hôm nay giảm ${Math.abs(percent)}% so với hôm qua`;
};

const analyzeCompareMonth = (thisMonth, lastMonth) => {
    const percent = lastMonth > 0
        ? ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1)
        : 0;

    return thisMonth >= lastMonth
        ? `Doanh thu tháng này tăng ${percent}%`
        : `Doanh thu tháng này giảm ${Math.abs(percent)}%`;
};

module.exports = {
    analyzeCompareDay,
    analyzeCompareMonth
};