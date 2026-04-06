import axios from 'axios';

const axiosKitchen = axios.create({
  baseURL: `${import.meta.env.VITE_SOCKET_URL}/kitchen`,
  timeout: 10000,
});

axiosKitchen.interceptors.request.use((config) => {
  const token = localStorage.getItem('staff_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosKitchen.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/kitchen/login')) {
        localStorage.removeItem('staff_token');
        localStorage.removeItem('staff_info');
        window.location.href = '/kitchen/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosKitchen;