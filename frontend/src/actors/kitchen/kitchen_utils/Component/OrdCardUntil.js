// Tính thời gian tương đối
export const getRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000 / 60);
  if (diff < 1) return 'Vừa xong';
  if (diff < 60) return `${diff} phút trước`;
  return `${Math.floor(diff / 60)} giờ trước`;
};

// Lấy trạng thái ưu tiên nhất của bàn
export const getPriorityStatus = (items) => {
  if (items.some(i => i.status === 'pending')) return 'pending';
  if (items.some(i => i.status === 'cooking')) return 'cooking';
  return 'done';
};

// Tính ưu tiên — bàn có pending lâu nhất = ưu tiên cao
export const getPriorityLabel = (items) => {
  const oldest = items.find(i => i.status === 'pending');
  if (!oldest) return null;
  const diff = Math.floor((Date.now() - new Date(oldest.item_order_time)) / 1000 / 60);
  if (diff >= 15) return 'Ưu tiên cao';
  if (diff >= 8)  return 'Ưu tiên TB';
  return null;
};

export const formatOrderTime = (dateStr) => {
  return dateStr 
    ? new Date(dateStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : '--:--';
};