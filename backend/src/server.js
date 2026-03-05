require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initSocket } = require('./lib/socket');
const { errorMiddleware } = require('./middlewares/error.middleware');
const routes = require('./routes');

const app = express();
const httpServer = http.createServer(app);

// Khởi tạo Socket.IO
initSocket(httpServer);

// Middlewares
app.use(cors());
app.use(express.json());

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
httpServer.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});