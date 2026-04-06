import { useEffect } from 'react';
import { io } from 'socket.io-client';


export const useKitchenSocket = (loadData, setTables) => {
  useEffect(() => {
    const socket = io(import.meta.env.SOCKET_URL);
    socket.on('connect', () => socket.emit('join_kitchen'));

    socket.on('new_order_item', () => loadData());
    socket.on('order_item_cancelled', () => loadData());
    
    socket.on('item_status_updated', ({ itemId, status }) => {
      setTables(prev => prev.map(table => ({
        ...table,
        items: table.items
          .map(i => i.id === itemId ? { ...i, status } : i)
          .filter(i => i.status !== 'done'),
      })).filter(t => t.items.length > 0));
    });

    socket.on('table_items_updated', () => loadData());

    return () => socket.disconnect();
  }, [loadData, setTables]);
};