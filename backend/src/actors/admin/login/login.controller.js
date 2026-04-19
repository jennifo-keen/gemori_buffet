const LoginService = require("./login.service");

class LoginController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const data = await LoginService.login(username, password);

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new LoginController();