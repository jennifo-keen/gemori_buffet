// zalopay.service.js — viết lại hoàn toàn theo docs v1
const axios    = require('axios').default;
const CryptoJS = require('crypto-js');
const { pool } = require('../../../config/db');
const { getIO } = require('../../../config/socket');

const config = {
  appid:    process.env.ZALOPAY_APP_ID   || '2553',
  key1:     process.env.ZALOPAY_KEY1     || 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  key2:     process.env.ZALOPAY_KEY2     || 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  key2_redirect: process.env.ZALOPAY_KEY2_REDIRECT || 'Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3',
  endpoint: process.env.ZALOPAY_ENDPOINT || 'https://sandbox.zalopay.com.vn/v001/tpe/createorder', 
};

// ── Tạo đơn hàng ────────────────────────────────────────────────
const createZaloPayOrder = async ({ orderId, amount, tableCode }) => {
  const now        = new Date();
  //  Format yyMMdd (2 số năm) đúng theo docs, timezone GMT+7
  const pad        = n => String(n).padStart(2, '0');
  const yy         = pad(now.getFullYear() % 100);
  const mm         = pad(now.getMonth() + 1);
  const dd         = pad(now.getDate());
  const dateStr    = `${yy}${mm}${dd}`;                  // e.g. 260419
  const appTransId = `${dateStr}_${Date.now()}`;         // e.g. 260419_1776620501218
  const appTime    = now.getTime();
  const appUser    = 'gemori_staff';
  const amountInt  = Math.round(Number(amount));

  // embeddata — tên field đúng theo docs v1
  const embeddata = JSON.stringify({
    redirecturl: `${process.env.ZALOPAY_REDIRECT_URL || 'http://localhost:5173/staff/zalopay-result'}?tableCode=${tableCode}&orderId=${orderId}`,
    order_id: orderId,
  });
  const item = JSON.stringify([]);

  // hmac_input: appid|apptransid|appuser|amount|apptime|embeddata|item
  const data2sign = `${config.appid}|${appTransId}|${appUser}|${amountInt}|${appTime}|${embeddata}|${item}`;
  const mac = CryptoJS.HmacSHA256(data2sign, config.key1).toString();

  // field names đúng theo docs v1 (không có dấu _)
  const order = {
    appid:       config.appid,
    apptransid:  appTransId,
    appuser:     appUser,
    apptime:     appTime,
    item:        item,
    embeddata:   embeddata,
    amount:      amountInt,
    callback_url: process.env.ZALOPAY_CALLBACK_URL,
    description: `Gemori Buffet - Ban ${tableCode}`,
    bankcode:    '',
    mac:         mac,
  };

  console.log('\n=== ZALOPAY CREATE ORDER ===');
  console.log('endpoint     :', config.endpoint);
  console.log('apptransid   :', appTransId);
  console.log('amount       :', amountInt);
  console.log('data2sign    :', data2sign);
  console.log('mac          :', mac);
  console.log('============================\n');

  const response = await axios.post(config.endpoint, null, { params: order });

  console.log('=== ZALOPAY RESPONSE ===');
  console.log(JSON.stringify(response.data, null, 2));
  console.log('========================\n');

  if (response.data.returncode !== 1) {
    throw {
      status:  400,
      message: `ZaloPay: ${response.data.returnmessage} (code: ${response.data.returncode})`,
    };
  }

  await pool.query(
    `INSERT INTO payments (order_id, payment_method, amount, status)
     VALUES ($1, 'zalopay', $2, 'pending')`,
    [orderId, amountInt]
  );

  return {
    order_url:    response.data.orderurl, 
    app_trans_id: appTransId,
  };
};

// ── Callback từ ZaloPay Server ──────────────────────────────────
const handleCallback = async (dataStr, requestMac) => {
  console.log('\n=== ZALOPAY CALLBACK ===');
  console.log('data:', dataStr);
  console.log('mac :', requestMac);

  //  Verify bằng key2
  const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
  console.log('mac computed:', mac);

  if (mac !== requestMac) {
    console.log(' MAC INVALID');
    return { returncode: -1, returnmessage: 'mac not equal' };
  }

  const data      = JSON.parse(dataStr);
  const embeddata = JSON.parse(data.embeddata || '{}');
  const orderId   = embeddata.order_id;

  if (!orderId) {
    console.log(' Order ID not found in embeddata');
    return { returncode: -1, returnmessage: 'Order not found' };
  }

  await pool.query(
    `UPDATE payments SET status='completed', paid_at=NOW()
     WHERE order_id=$1 AND payment_method='zalopay'`,
    [orderId]
  );

  const orderRes = await pool.query(
    `UPDATE orders SET status='paid' WHERE id=$1 RETURNING table_id, total_amount`,
    [orderId]
  );
  const order = orderRes.rows[0];

  if (order) {
    await pool.query(`UPDATE tables SET status='empty' WHERE id=$1`, [order.table_id]);
    try {
      const io = getIO();
      io.to('staff').emit('table_status_changed', { tableId: order.table_id, status: 'empty' });
      io.to(`table_${order.table_id}`).emit('order_paid', { orderId, total_amount: order.total_amount });
    } catch (e) { console.error('Socket:', e.message); }
  }

  console.log(' CALLBACK SUCCESS');
  return { returncode: 1, returnmessage: 'success' };
};

// ── Verify redirect từ ZaloPay Gateway ─────────────────────────
// Theo docs: checksumData = appid|apptransid|pmcid|bankcode|amount|discountamount|status
const verifyRedirect = (query) => {
  const { appid, apptransid, pmcid, bankcode, amount, discountamount, status, checksum } = query;
  const checksumData = `${appid}|${apptransid}|${pmcid}|${bankcode}|${amount}|${discountamount}|${status}`;
  const computed     = CryptoJS.HmacSHA256(checksumData, config.key2).toString();

  console.log('\n=== VERIFY REDIRECT ===');
  console.log('checksumData:', checksumData);
  console.log('computed    :', computed);
  console.log('received    :', checksum);
  console.log('valid       :', computed === checksum);
  console.log('=======================\n');

  return computed === checksum;
};

module.exports = { createZaloPayOrder, handleCallback, verifyRedirect };