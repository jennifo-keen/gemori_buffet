const authService = require('./auth.service');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Vui lòng nhập username và password' });

    const result = await authService.login(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { login };