const { pool } = require("../../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginService {
    async login(username, password) {
        const result = await pool.query(
            "SELECT * FROM admins WHERE username = $1",
            [username]
        );

        const user = result.rows[0];

        if (!user) {
            throw new Error("Sai tài khoản");
        }

        if (user.status !== "active") {
            throw new Error("Tài khoản bị khóa");
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            throw new Error("Sai mật khẩu");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: "1d" }
        );

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                full_name: user.full_name,
            },
        };
    }
}

module.exports = new LoginService();
