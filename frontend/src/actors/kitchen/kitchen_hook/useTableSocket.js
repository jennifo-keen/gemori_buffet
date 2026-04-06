import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useTableSocket = (tableCode, loadData, setTableData) => {
  useEffect(() => {
    const socket = io(import.meta.env.SOCKET_URL);
    socket.on('connect', () => socket.emit('join_kitchen'));

    // Lắng nghe cập nhật trạng thái món
    socket.on('item_status_updated', ({ itemId, status }) => {
      setTableData(prev => {
        if (!prev) return prev;
        const updatedItems = prev.items
          .map(i => i.id === itemId ? { ...i, status } : i)
          .filter(i => i.status !== 'done');
        return { ...prev, items: updatedItems };
      });
    });

    // Lắng nghe có món mới cho bàn này
    socket.on('new_order_item', ({ tableCode: tc }) => {
      if (tc === tableCode) loadData();
    });

    // Lắng nghe khi có món bị hủy
    socket.on('order_item_cancelled', () => loadData());

    return () => socket.disconnect();
  }, [tableCode, loadData, setTableData]);
};