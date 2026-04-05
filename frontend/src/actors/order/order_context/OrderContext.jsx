import React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {Outlet, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getMenu, getOrder, addOrderItems, cancelOrderItem } from '../order_api/tableOrderApi';
import { customerLogin, customerRegister } from '../order_api/customerApi';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { tableCode } = useParams(); // lấy từ URL /table/:tableCode
  
  const [order, setOrder]       = useState(null);
  const [menu, setMenu]         = useState({ ticket_name: '', categories: [] });
  const [cart, setCart]         = useState([]); // món đang chọn chưa gửi
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ── Customer auth — OPTIONAL ─────────────────────────────────
  const [customer, setCustomer] = useState(() => {
    const saved = localStorage.getItem('customer_info');
    return saved ? JSON.parse(saved) : null;
  });

  const socketRef = useRef(null);

  // ── Khởi tạo — load menu + load order (không cần verify bàn) ──────────
  const loadMenuAndOrder = useCallback(async () => {
    if (!tableCode) return;
    try {
      setLoading(true);
      setError(null);
      const [menuRes, orderRes] = await Promise.all([
        getMenu(tableCode),
        getOrder(tableCode),
      ]);
      setMenu(menuRes.data);
      if (orderRes.data) setOrder(orderRes.data);
      if (menuRes.data.categories?.length > 0)
        setSelectedCategory(menuRes.data.categories[0].name);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [tableCode]);

  // ── Socket — nhận cập nhật realtime ─────────────────────────
  useEffect(() => {
    loadMenuAndOrder();
    if (!tableCode) return;

    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_table', tableCode);
    });

    // Bếp cập nhật trạng thái món
    socket.on('item_status_updated', ({ itemId, status }) => {
      setOrder(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map(item =>
            item.id === itemId ? { ...item, status } : item
          ),
        };
      });
    });

    // Thanh toán xong
    socket.on('order_paid', () => {
      setOrder(null);
      setCart([]);
    });

    return () => { socket.disconnect(); socketRef.current = null; };
  }, [tableCode, loadMenuAndOrder ]);

  // ── Cart — thêm/bớt/xóa ─────────────────────────────────────
  const addToCart = (menuItem) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === menuItem.id);
      if (exist) {
        return prev.map(i => i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (menuId) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === menuId);
      if (!exist) return prev;
      if (exist.quantity === 1) return prev.filter(i => i.id !== menuId);
      return prev.map(i => i.id === menuId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const clearCart = () => setCart([]);

  // Số lượng 1 món trong cart
  const getCartQty = (menuId) => cart.find(i => i.id === menuId)?.quantity || 0;

  // Tổng số món trong cart
  const cartTotal = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ── Gửi bếp ─────────────────────────────────────────────────
  const submitOrder = async () => {
    if (!cart.length) return;
    const items = cart.map(i => ({ menuId: i.id, quantity: i.quantity }));
    const res = await addOrderItems(tableCode, items);

    // Thêm vào order hiện tại
    setOrder(prev => ({
      ...prev,
      items: [...(prev?.items || []), ...res.data],
    }));
    setCart([]);
    return res.data;
  };

  // ── Hủy món ─────────────────────────────────────────────────
  const cancelItem = async (itemId) => {
    await cancelOrderItem(itemId, tableCode);
    setOrder(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== itemId),
    }));
  };

  // ── Customer auth — OPTIONAL, không bắt buộc ────────────────
  const loginCustomer = async (phone, password) => {
    const res = await customerLogin(phone, password);
    const { token, customer } = res.data;
    localStorage.setItem('customer_token', token);
    localStorage.setItem('customer_info', JSON.stringify(customer));
    setCustomer(customer);
    return customer;
  };

  const registerCustomer = async (data) => {
    const res = await customerRegister(data);
    const { token, customer } = res.data;
    localStorage.setItem('customer_token', token);
    localStorage.setItem('customer_info', JSON.stringify(customer));
    setCustomer(customer);
    return customer;
  };

  const logoutCustomer = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_info');
    setCustomer(null);
  };

  return (
    <OrderContext.Provider value={{
      tableCode, order, menu, cart,
      loading, error,
      selectedCategory, setSelectedCategory,
      addToCart, removeFromCart, clearCart,
      getCartQty, cartTotal,
      submitOrder, cancelItem,
      loadMenuAndOrder, 
       customer, loginCustomer, registerCustomer, logoutCustomer,
    }}>
      {children ?? <Outlet />}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);