const menuService = require('../services/menu.service');
 
const getMenuByTable = async (req, res, next) => {
  try {
    const result = await menuService.getMenuByTable(req.params.tableId);
    res.json(result);
  } catch (err) { next(err); }
};
 
module.exports.menuController = { getMenuByTable };