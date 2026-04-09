require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initSocket } = require('./config/socket');
const { errorMiddleware } = require('./middlewares/error.middleware');
const routes = require('./routes');

require('./actors/admin/ai/cron/forecastCron');

const app = express();
const httpServer = http.createServer(app);

// Khởi tạo Socket.IO
initSocket(httpServer);


const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // Log để bạn dễ debug khi bị lỗi
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running perfectly!');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

// Routes
app.use('/api', routes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: `Không tìm thấy: ${req.method} ${req.path}` });
});

// Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT,'0.0.0.0', () => {
  console.log(` Server chạy tại http://localhost:${PORT}`);
});