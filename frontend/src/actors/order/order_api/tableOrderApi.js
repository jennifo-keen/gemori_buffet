import axiosOrder from './axiosOrder';

export const getMenu         = (tableId) => axiosOrder.get(`/${tableId}/menu`);
export const getOrder        = (tableId) => axiosOrder.get(`/${tableId}/order`);
export const addOrderItems   = (tableId, items) => axiosOrder.post(`/${tableId}/order/items`, { items });
export const cancelOrderItem = (itemId, tableId) => axiosOrder.delete(`/order-items/${itemId}?tableId=${tableId}`);
export const getBill         = (tableId) => axiosOrder.get(`/${tableId}/bill`);