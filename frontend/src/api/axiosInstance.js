import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('staff_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/staff/login')) {
        localStorage.removeItem('staff_token');
        localStorage.removeItem('staff_info');
        window.location.href = '/staff/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;