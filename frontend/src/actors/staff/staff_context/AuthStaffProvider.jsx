import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';
import axiosInstance from '../staff_api/axiosInstance';
import { getAllTables } from '../staff_api/tableApi';
import { AuthStaffContext } from './AuthStaffContext';

export const AuthStaffProvider = ({ children }) => {
  // 🟢 1. KHỞI TẠO: Check cả data Staff và data Admin
  const [admin, setAdmin] = useState(() => {
    const staffSaved = localStorage.getItem('staff_info');
    const adminSaved = localStorage.getItem('user'); // Dữ liệu login uyen.le của bạn
    const saved = staffSaved || adminSaved;
    return saved ? JSON.parse(saved) : null;
  });

  const [tables, setTables] = useState([]);
  const [tablesLoading, setTablesLoading] = useState(false);
  const [tablesError, setTablesError] = useState(null);
  const socketRef = useRef(null);

  // --- API LOGIC ---
  const fetchTables = useCallback(async () => {
    try {
      setTablesLoading(true);
      setTablesError(null);
      const res = await getAllTables();
      setTables(res.data);
    } catch (err) {
      setTablesError('Không thể tải danh sách bàn');
      console.error("Fetch Tables Error:", err);
    } finally {
      setTablesLoading(false);
    }
  }, []);

  // --- SOCKET LOGIC ---
  const destroySocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  const initSocket = useCallback(() => {
    if (socketRef.current) return;

    const socket = io(import.meta.env.VITE_URL || "http://localhost:3000");
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected as Staff/Admin');
      socket.emit('join_staff');
    });

    socket.on('table_status_changed', ({ tableId, status }) => {
      setTables(prev =>
        prev.map(t => t.id === tableId ? { ...t, status } : t)
      );
    });

    socket.on('item_status_updated', () => {
      fetchTables();
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }, [fetchTables]);

  // 🟢 2. TỰ ĐỘNG CHẠY: Nếu có bất kỳ Token nào thì cho phép tải dữ liệu bàn
  useEffect(() => {
    const staffToken = localStorage.getItem('staff_token');
    const adminToken = localStorage.getItem('token'); // Token từ login admin

    if (staffToken || adminToken) {
      fetchTables();
      initSocket();
    }
    return () => destroySocket();
  }, [fetchTables, initSocket, destroySocket]);

  // --- AUTH ACTIONS ---
  const loginStaff = async (username, password) => {
    const res = await axiosInstance.post('/auth/login', { username, password });
    const { token, admin } = res.data;
    localStorage.setItem('staff_token', token);
    localStorage.setItem('staff_info', JSON.stringify(admin));
    setAdmin(admin);
    await fetchTables();
    initSocket();
    return admin;
  };

  const logoutStaff = () => {
    localStorage.removeItem('staff_token');
    localStorage.removeItem('staff_info');
    // Lưu ý: Không xóa 'token' và 'user' của admin ở đây 
    // để tránh bị logout cả trang admin chính
    setAdmin(null);
    setTables([]);
    destroySocket();
  };

  // --- HELPER FUNCTIONS ---
  const getTable = (code) =>
    tables.find((t) => t.table_code === String(code));

  const getStatus = (table) => {
    if (!table) return 0;
    if (table.status === 'ordering') return 1;
    if (table.status === 'closed') return 2;
    return 0;
  };

  const getTableColor = (table) => {
    if (table?.status === 'ordering') return "#2563EB";
    if (table?.status === 'closed') return "#B4463C";
    return "#a4a6a5";
  };

  const getChairColor = (table) => {
    if (table?.status === 'ordering') return "#60A5FA";
    if (table?.status === 'closed') return "#FCA5A5";
    return "#a1a1a1";
  };

  const getFloorTables = (from, to) => {
    const numFrom = parseInt(from.replace(/\D/g, ''));
    const numTo = parseInt(to.replace(/\D/g, ''));
    return tables.filter(t => {
      const num = parseInt(t.table_code.replace(/\D/g, ''));
      return num >= numFrom && num <= numTo;
    });
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(prev =>
      prev.map(t => t.id === tableId ? { ...t, status: newStatus } : t)
    );
  };

  return (
    <AuthStaffContext.Provider value={{
      admin, loginStaff, logoutStaff,
      tables, tablesLoading, tablesError, fetchTables,
      getTable, getStatus, getTableColor, getChairColor,
      getFloorTables, updateTableStatus,
    }}>
      {children ?? <Outlet />}
    </AuthStaffContext.Provider>
  );
};