import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react'; // ← thêm useCallback
import { Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';
import axiosInstance from '../../../api/axiosInstance';
import { getAllTables } from '../../../api/tableApi';
import { AuthStaffContext } from './AuthStaffContext'; // ← thêm import

export const AuthStaffProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('staff_info');
    return saved ? JSON.parse(saved) : null;
  });

  const [tables, setTables] = useState([]);
  const [tablesLoading, setTablesLoading] = useState(false);
  const [tablesError, setTablesError] = useState(null);
  const socketRef = useRef(null);

  const fetchTables = useCallback(async () => {
    try {
      setTablesLoading(true);
      setTablesError(null);
      const res = await getAllTables();
      setTables(res.data);
    } catch (err) {
      setTablesError('Không thể tải danh sách bàn');
      console.error(err);
    } finally {
      setTablesLoading(false);
    }
  }, []);

  const destroySocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  const initSocket = useCallback(() => {
    if (socketRef.current) return;

    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
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
      console.log(' Socket disconnected');
    });
  }, [fetchTables]); // ← fetchTables là dependency

  useEffect(() => {
    const saved = localStorage.getItem('staff_info');
    if (saved) {
      fetchTables();
      initSocket();
    }
    return () => destroySocket();
  }, [fetchTables, initSocket, destroySocket]); // ← đủ dependencies

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
    setAdmin(null);
    setTables([]);
    destroySocket();
  };

  const getTable = (code) =>
    tables.find((t) => t.table_code === String(code));

  const getStatus = (table) => {
    if (!table) return 0;
    if (table.status === 'ordering') return 1;
    if (table.status === 'closed')   return 2;
    return 0;
  };

  const getTableColor = (table) => {
    if (table?.status === 'ordering') return "#2563EB";
    if (table?.status === 'closed')   return "#B4463C";
    return "#a4a6a5";
  };

  const getChairColor = (table) => {
    if (table?.status === 'ordering') return "#60A5FA";
    if (table?.status === 'closed')   return "#FCA5A5";
    return "#a1a1a1";
  };

  const getFloorTables = (from, to) => {
    const numFrom = parseInt(from.replace('B', ''));
    const numTo   = parseInt(to.replace('B', ''));
    return tables.filter(t => {
      const num = parseInt(t.table_code.replace('B', ''));
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