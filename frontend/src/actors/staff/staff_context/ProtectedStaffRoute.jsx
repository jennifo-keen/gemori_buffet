import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedStaffRoute = ({ children }) => {
  // 1. Lấy dữ liệu trực tiếp từ Storage (không thông qua hook nữa cho chắc)
  const staffToken = localStorage.getItem('staff_token');
  const adminToken = localStorage.getItem('token'); // Token Admin Uyên Lê

  const staffInfo = localStorage.getItem('staff_info');
  const adminInfo = localStorage.getItem('user'); // User Admin Uyên Lê

  // 2. Kiểm tra: Chỉ cần có 1 trong 2 loại Token và Info là cho qua
  const isAuthenticated = (staffToken && staffInfo) || (adminToken && adminInfo);

  if (!isAuthenticated) {
    console.log("Chưa login nên bị đá ra nè!");
    return <Navigate to="/staff/login" replace />;
  }

  // 3. Nếu OK thì cho vào trang Checkout
  return children;
};

export default ProtectedStaffRoute;