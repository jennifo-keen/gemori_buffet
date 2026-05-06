require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const { initSocket } = require("./config/socket");
const { errorMiddleware } = require("./middlewares/error.middleware");
const routes = require("./routes");

require("./actors/admin/ai/cron/forecastCron");

const app = express();
const httpServer = http.createServer(app);

// Khởi tạo Socket.IO
initSocket(httpServer);

// Danh sách domain được phép gọi API
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",

  // Vercel frontend domain
  "https://gemori-buffet-gjzlollue-jennifo-keens-projects.vercel.app",
  "https://gemori-buffet.vercel.app",
];

// Lấy thêm domain từ biến môi trường ALLOWED_ORIGINS nếu có
const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép Postman, server-to-server request, hoặc request cùng server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      console.log("Allowed origins:", allowedOrigins);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.get('/test-ping', (req, res) => res.send('Pong'));
app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    time: new Date(),
  });
});

app.use("/api/staff/payment/zalopay/callback", (req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

// Routes chính
app.use("/api", routes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: `Không tìm thấy: ${req.method} ${req.path}`,
  });
});

// Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});