const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Kết nối DB thất bại:', err.message);
  } else {
    console.log('✅ Kết nối DB thành công');
    release();
  }
});

module.exports = { pool };