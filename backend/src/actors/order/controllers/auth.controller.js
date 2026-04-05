const authService = require('../services/auth.service');
 
const customerLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: 'Vui lòng nhập số điện thoại và mật khẩu' });
 
    const result = await authService.customerLogin(phone, password);
    res.json(result);
  } catch (err) { next(err); }
};
 
const customerRegister = async (req, res, next) => {
  try {
    const result = await authService.customerRegister(req.body);
    res.status(201).json(result);
  } catch (err) { next(err); }
};
 
const getProfile = async (req, res, next) => {
  try {
    const result = await authService.getProfile(req.customer.id);
    res.json(result);
  } catch (err) { next(err); }
};

const updateProfile = async (req, res, next) => {
  try {
    res.json(await authService.updateProfile(req.customer.id, req.body));
  } catch (err) { next(err); }
};

const deleteAccount = async (req, res, next) => {
  try {
    await authService.deleteAccount(req.customer.id);
    res.json({ message: 'Tài khoản đã được xóa' });
  } catch (err) { next(err); }
};

const getAvailableVouchers = async (req, res, next) => {
  try {
    res.json(await authService.getAvailableVouchers());
  } catch (err) { next(err); }
};

module.exports = { customerLogin, customerRegister, getProfile, updateProfile, deleteAccount, getAvailableVouchers };
 