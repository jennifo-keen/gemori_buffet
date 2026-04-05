import axiosInstance from './axiosInstance';

// Tạo order mới — Web 3
export const createOrder = (data) =>
  axiosInstance.post('/orders/create', data);