import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useKitchenSocket = (loadData) => {
  useEffect(() => {
    // Thêm transports để kết nối nhanh hơn (đồng bộ với useTableSocket)
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log(" Kitchen Socket Connected");
      socket.emit('join_kitchen');
    });

    const handleRefresh = () => {
      console.log(" Signal received: Refreshing all data...");
      loadData();
    };

    socket.on('new_order_item', handleRefresh);
    socket.on('order_item_cancelled', handleRefresh);
    socket.on('item_status_updated', handleRefresh);
    socket.on('table_items_updated', handleRefresh);

    return () => {
      socket.off('new_order_item', handleRefresh);
      socket.off('order_item_cancelled', handleRefresh);
      socket.off('item_status_updated', handleRefresh);
      socket.off('table_items_updated', handleRefresh);
      socket.disconnect();
    };
  }, [loadData]);
};