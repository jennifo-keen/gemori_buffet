import axiosInstance from './axiosInstance';

// Tạo order mới — Web 3
export const createOrder = (data) =>
  axiosInstance.post('/orders/create', data);

export const deleteOrderItem = (itemId, tableCode) =>
  axiosInstance.delete(`/order-items/${itemId}?tableCode=${tableCode}`);