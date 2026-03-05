const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} —`, err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Lỗi server',
  });
};

module.exports = { errorMiddleware };