const buildList = (rows, k1, k2) =>
    rows.map(r => `${r[k1]} (${r[k2]})`).join(", ");

module.exports = { buildList };