const { loginUserService, registerUserService } = require("./customerAuth.service");

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginUserService({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function registerUser(req, res, next) {
  try {
    const {
      full_name,
      email,
      phone,
      password,
      confirm_password,
      birthday,
      gender,
      address,
    } = req.body;

    const result = await registerUserService({
      full_name,
      email,
      phone,
      password,
      confirm_password,
      birthday,
      gender,
      address,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginUser,
  registerUser,
};