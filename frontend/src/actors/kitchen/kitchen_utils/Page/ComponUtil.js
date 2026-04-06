/**
 * Sắp xếp danh sách bàn: Bàn có món 'pending' lâu nhất sẽ lên đầu
 */
export const sortTablesByPriority = (tables) => {
  return [...tables].sort((a, b) => {
    const getTime = (items) => {
      const pendingItems = items.filter(i => i.status === 'pending');
      if (pendingItems.length === 0) return 0;
      // Lấy thời gian của món cũ nhất
      return Math.min(...pendingItems.map(i => new Date(i.item_order_time).getTime()));
    };

    const timeA = getTime(a.items);
    const timeB = getTime(b.items);

    return timeA - timeB; // Thời gian nhỏ hơn = cũ hơn = ưu tiên cao hơn
  });
};