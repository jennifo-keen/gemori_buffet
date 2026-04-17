import axiosInstance from '../kitchen_api/axiosKitchen'; 

export const fetchPendingItems = () => axiosInstance.get('/items');
export const fetchStats = () => axiosInstance.get('/stats');

// Cập nhật trạng thái của 1 món ăn 
export const updateItemStatus = (itemId, status) => 
  axiosInstance.patch(`/items/${itemId}/status`, { status });

// Hoàn tất trạng thái cho cả bàn
export const completeTableStatus = (tableCode) => 
  axiosInstance.patch(`/${tableCode}/status`, { status: 'done' });