import axiosInstance from './axiosInstance';

// Lấy tất cả bàn
export const getAllTables = () =>
  axiosInstance.get('/tables');

// Mở bàn
export const openTable = (tableId) =>
  axiosInstance.patch(`/tables/${tableId}/open`);

// Đóng bàn
export const closeTable = (tableId) =>
  axiosInstance.patch(`/tables/${tableId}/close`);

// Xem order đang chạy của bàn
export const getTableOrder = (tableCode) =>
  axiosInstance.get(`/tables/${tableCode}/order`);