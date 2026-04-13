const tablesService = require('../services/tables.service');

const getAll = async (req, res, next) => {
  try {
    const tables = await tablesService.getAllTables();
    res.json(tables);
  } catch (err) { next(err); }
};

const openTable = async (req, res, next) => {
  try {
    const table = await tablesService.openTable(req.params.id);
    res.json(table);
  } catch (err) { next(err); }
};

const closeTable = async (req, res, next) => {
  try {
    const table = await tablesService.closeTable(req.params.id);
    res.json(table);
  } catch (err) { next(err); }
};

const getTableOrder = async (req, res, next) => {
  try {
    const order = await tablesService.getTableCurrentOrderByCode(req.params.tableCode);
    res.json(order);
  } catch (err) { next(err); }
};

module.exports = { getAll, openTable, closeTable, getTableOrder };