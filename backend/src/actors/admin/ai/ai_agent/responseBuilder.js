const buildList = (rows, key1, key2) => {
    return rows.map(r => `${r[key1]} (${r[key2]})`).join(", ");
};

module.exports = {
    buildList
};