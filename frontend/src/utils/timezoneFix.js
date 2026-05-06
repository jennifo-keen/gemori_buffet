
/**
 * Format datetime from backend with browser's local timezone
 * Browser automatically converts UTC to local time
 * @param {string} dateStr - ISO format datetime string from backend (UTC)
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted datetime string in browser's local timezone
 */
export const formatDateTime = (dateStr, options = {}) => {
  if (!dateStr) return '--';
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '--';
  
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  
  return date.toLocaleString('vi-VN', { ...defaultOptions, ...options });
};

/**
 * Format time only from backend 
 * @param {string} dateStr - ISO format datetime string from backend (UTC)
 * @returns {string} - Formatted time string (HH:mm)
 */
export const formatTime = (dateStr) => {
  if (!dateStr) return '--:--';
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '--:--';
  
  return date.toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Format date only from backend
 * @param {string} dateStr - ISO format datetime string from backend (UTC)
 * @returns {string} - Formatted date string (dd/mm/yyyy)
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '--';
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '--';
  
  return date.toLocaleDateString('vi-VN');
};

/**
 * Calculate relative time (e.g., "5 minutes ago") from backend datetime
 * @param {string} dateStr - ISO format datetime string from backend (UTC)
 * @returns {string} - Relative time string in Vietnamese
 */
export const getRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  
  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
  
  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
};

// ============================================
// @deprecated - Old functions kept for compatibility
// Use the simple functions above instead
// ============================================

/**
 * @deprecated - Use formatTime() instead
 */
export const convertToVietnamTime = (dateStr) => {
  if (!dateStr) return new Date();
  return new Date(dateStr);
};

/**
 * @deprecated - Use formatDateTime() instead
 */
export const formatVietnamDateTime = (dateStr, options = {}) => {
  return formatDateTime(dateStr, options);
};

/**
 * @deprecated - Use formatTime() instead
 */
export const formatVietnamTime = (dateStr) => {
  return formatTime(dateStr);
};

/**
 * @deprecated - Use formatDate() instead
 */
export const formatVietnamDate = (dateStr) => {
  return formatDate(dateStr);
};

/**
 * @deprecated - Use getRelativeTime() instead
 */
export const getRelativeVietnamTime = (dateStr) => {
  return getRelativeTime(dateStr);
};
