import axiosInstance from './axiosInstance';

// Lấy danh sách gói buffet
export const getBuffetTickets = () =>
  axiosInstance.get('/menu/tickets');