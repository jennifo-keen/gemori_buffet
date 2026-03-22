const customersService = require('../services/customers.service');

const getAll = async (req, res, next) => {
  try {
    res.json(await customersService.getAllCustomers());
  } catch (err) { next(err); }
};

const getByPhone = async (req, res, next) => {
  try {
    res.json(await customersService.getCustomerByPhone(req.params.phone));
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { full_name, phone, email } = req.body;
    if (!full_name || !phone || !email)
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc: full_name, phone, email' });

    res.status(201).json(await customersService.createCustomer(req.body));
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    res.json(await customersService.updateCustomer(req.params.id, req.body));
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await customersService.deleteCustomer(req.params.id);
    res.json({ message: 'Xóa thành viên thành công' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getByPhone, create, update, remove };