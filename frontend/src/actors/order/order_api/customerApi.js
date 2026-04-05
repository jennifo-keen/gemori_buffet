import axiosOrder from './axiosOrder';

export const customerLogin    = (phone, password) => axiosOrder.post('/customer/login', { phone, password });
export const customerRegister = (data)            => axiosOrder.post('/customer/register', data);
export const getProfile          = ()     => axiosOrder.get('/customer/profile');
export const updateProfile       = (data) => axiosOrder.put('/customer/profile', data);
export const deleteAccount       = ()     => axiosOrder.delete('/customer/account');
export const getAvailableVouchers = ()    => axiosOrder.get('/customer/vouchers');
