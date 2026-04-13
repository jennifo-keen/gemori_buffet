import axiosOrder from './axiosOrder';

export const getMenu         = (tableCode) => axiosOrder.get(`/${tableCode}/menu`);
export const getOrder        = (tableCode) => axiosOrder.get(`/${tableCode}/order`);
export const addOrderItems   = (tableCode, items) => axiosOrder.post(`/${tableCode}/order/items`, { items });
export const cancelOrderItem = (itemId, tableCode) => axiosOrder.delete(`/order-items/${itemId}?tableCode=${tableCode}`);
export const getBill         = (tableCode) => axiosOrder.get(`/${tableCode}/bill`);