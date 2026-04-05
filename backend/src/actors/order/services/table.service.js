const { pool } = require('../../../config/db');

// Xác thực bàn khi quét QR — trả về thông tin bàn + order hiện tại
const verifyTable = async (tableCode) => {
  const tableResult = await pool.query(
    'SELECT * FROM tables WHERE table_code = $1', [tableCode]
  );

 const table = tableResult.rows[0];
  if (!table) throw { status: 404, message: 'Bàn không tồn tại' };
  if (table.status === 'closed') throw { status: 403, message: 'Bàn đang bảo trì' };
  if (table.status === 'empty')  throw { status: 400, message: 'Bàn chưa được mở — vui lòng chờ nhân viên' };

  // Lấy order đang chạy
 const orderResult = await pool.query(
    `SELECT o.id AS order_id, o.ticket_quantity, o.order_time,
       bt.name AS ticket_name, bt.price AS ticket_price, bt.image_url AS ticket_image
     FROM orders o
     LEFT JOIN buffet_tickets bt ON o.buffet_ticket_id = bt.id
     WHERE o.table_id = $1 AND o.status = 'ordering'
     LIMIT 1`,
    [tableId]
  );

const order = orderResult.rows[0];
  if (!order) throw { status: 400, message: 'Bàn chưa có đơn hàng — vui lòng chờ nhân viên' };
 
  return {
    table: {
      id:         table.id,
      table_code: table.table_code,
      status:     table.status,
    },
    order,
  };
};
 
module.exports = {verifyTable };