const menuService = require('../services/menu.service');
 
const getMenuByTable = async (req, res, next) => {
  try {
    const result = await menuService.getMenuByTable(req.params.tableCode);
    res.json(result);
  } catch (err) { next(err); }
};
 
module.exports = { getMenuByTable };