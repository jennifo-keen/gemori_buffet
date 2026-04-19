import axiosInstance from './axiosInstance';

// Kiểm tra voucher
export const validateVoucher = (code, baseAmount) =>
  axiosInstance.post('/vouchers/validate', { code, base_amount: baseAmount });

// Tìm thành viên theo SĐT
export const getCustomerByPhone = (phone) =>
  axiosInstance.get(`/customers/phone/${phone}`);

// Thanh toán
export const checkout = (data) =>
  axiosInstance.post('/payment/checkout', data);

export const createZaloPayOrder = (data) =>
  axiosInstance.post('/payment/zalopay/create', data);