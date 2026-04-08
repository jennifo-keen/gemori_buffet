import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useTableSocket = (tableCode, loadData) => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log(`✅ Table Socket Connected (${tableCode})`);
      socket.emit('join_kitchen');
    });

    const handleRefresh = () => {
      console.log(`🔔 Update for table ${tableCode}: Refreshing...`);
      loadData();
    };

    socket.on('item_status_updated', handleRefresh);
    socket.on('new_order_item', handleRefresh);
    socket.on('order_item_cancelled', handleRefresh);
    socket.on('table_items_updated', handleRefresh);

    return () => {
      // Bổ sung socket.off cho đồng bộ với file kia
      socket.off('item_status_updated', handleRefresh);
      socket.off('new_order_item', handleRefresh);
      socket.off('order_item_cancelled', handleRefresh);
      socket.off('table_items_updated', handleRefresh);
      socket.disconnect();
    };
  }, [tableCode, loadData]);
};