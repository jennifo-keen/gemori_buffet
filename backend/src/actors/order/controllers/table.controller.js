const tableService = require('../services/table.service');
 
const verifyTable = async (req, res, next) => {
  try {
    const result = await tableService.verifyTable(req.params.tableId);
    res.json(result);
  } catch (err) { next(err); }
};
 
module.exports.tableController = { verifyTable };