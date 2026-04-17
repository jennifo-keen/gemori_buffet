import axios from 'axios';

const axiosOrder = axios.create({
  baseURL: `${import.meta.env.VITE_SOCKET_URL}/order`,
  timeout: 10000,
});

// Tự động gắn customer token
axiosOrder.interceptors.request.use((config) => {
  const token = localStorage.getItem('customer_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi 401 Web không bắt buộc đăng nhập
axiosOrder.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('customer_token');
      localStorage.removeItem('customer_info');
    }
    return Promise.reject(error);
  }
);

export default axiosOrder;