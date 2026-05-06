import { formatTime, getRelativeTime as getRelativeTimeUtil } from '../../../../utils/timezoneFix';

// ✅ Sử dụng getRelativeTime từ utility
export const getRelativeTime = (dateStr) => {
  return getRelativeTimeUtil(dateStr);
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
  const date = new Date(oldest.item_order_time);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
  if (diff >= 15) return 'Ưu tiên cao';
  if (diff >= 8)  return 'Ưu tiên TB';
  return null;
};

export const formatOrderTime = (dateStr) => {
  return formatTime(dateStr);
};

export const isHighPriority = (items) => {
  const oldest = items?.find(i => i.status === 'pending');
  if (!oldest) return false;
  const date = new Date(oldest.item_order_time);
  return Math.floor((Date.now() - date.getTime()) / 1000 / 60) >= 10;
};