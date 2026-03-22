const menuService = require('./menu.service');

const getBuffetTickets = async (req, res, next) => {
  try {
    const tickets = await menuService.getBuffetTickets();
    res.json(tickets);
  } catch (err) { next(err); }
};

const getAllMenus = async (req, res, next) => {
  try {
    const menus = await menuService.getAllMenus();
    res.json(menus);
  } catch (err) { next(err); }
};

module.exports = { getBuffetTickets, getAllMenus };