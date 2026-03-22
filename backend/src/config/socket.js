const { Server } = require('socket.io');

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('🔌 Client kết nối:', socket.id);

    // Khách QR join room theo bàn
    socket.on('join_table', (tableId) => {
      socket.join(`table_${tableId}`);
    });

    // Bếp join room riêng
    socket.on('join_kitchen', () => {
      socket.join('kitchen');
    });

    // Staff join room riêng
    socket.on('join_staff', () => {
      socket.join('staff');
    });

    socket.on('disconnect', () => {
      console.log('🔌 Client ngắt kết nối:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.IO chưa khởi tạo');
  return io;
};

module.exports = { initSocket, getIO };