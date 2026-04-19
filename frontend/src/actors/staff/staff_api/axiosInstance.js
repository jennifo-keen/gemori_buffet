import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SOCKET_URL}/staff`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  // 🟢 Lấy cả 2 loại token
  const staffToken = localStorage.getItem('staff_token');
  const adminToken = localStorage.getItem('token'); // Token từ login Admin (uyen.le)

  // Ưu tiên staff_token, nếu không có thì dùng adminToken
  const token = staffToken || adminToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Chỉ đá về login nếu thực sự không có cả 2 loại token
      const hasToken = localStorage.getItem('staff_token') || localStorage.getItem('token');

      if (!window.location.pathname.includes('/staff/login') && !hasToken) {
        localStorage.removeItem('staff_token');
        localStorage.removeItem('staff_info');
        // Lưu ý: Cân nhắc việc có nên xóa cả 'token' admin không, 
        // nhưng tạm thời cứ để để tránh lỗi chéo.
        window.location.href = '/staff/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;