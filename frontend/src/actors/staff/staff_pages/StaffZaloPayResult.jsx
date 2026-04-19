// StaffZaloPayResult.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import useAuthStaff from '../staff_hook/useAuthStaff';
import useDialog from '../staff_hook/useDialog';
import axiosInstance from '../staff_api/axiosInstance';

const StaffZaloPayResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateTableStatus, tables } = useAuthStaff();
  const { showSuccess, showError } = useDialog();

  useEffect(() => {
    if (!tables) return;

    const handle = async () => {
      const status    = searchParams.get('status');
      const tableCode = searchParams.get('tableCode');

      //  Gửi toàn bộ query params lên server verify — không xử lý key phía client
      const query = Object.fromEntries(searchParams.entries());

      try {
        const res = await axiosInstance.post('/payment/zalopay/verify-redirect', { query });

        if (res.data.valid && status === '1') {
          // Callback server đã cập nhật DB — chỉ cần update UI
          const table = tables?.find(t => t.table_code === tableCode);
          if (table) updateTableStatus(table.id, 'empty');

          showSuccess({
            title: 'Thanh toán ZaloPay thành công!',
            subtitle: `Bàn ${tableCode} đã thanh toán xong.`,
            confirmText: 'Về sơ đồ bàn',
            onConfirm: () => navigate('/staff'),
          });
        } else {
          showError({
            title: status === '1' ? 'Checksum không hợp lệ' : 'Thanh toán thất bại hoặc bị hủy',
            subtitle: 'Vui lòng thử lại hoặc chọn phương thức khác.',
            confirmText: 'Quay lại',
            onConfirm: () => navigate(-1),
          });
        }
      } catch {
        showError({
          title: 'Không thể xác minh kết quả',
          subtitle: 'Vui lòng kiểm tra lại đơn hàng.',
          confirmText: 'Quay lại',
          onConfirm: () => navigate(-1),
        });
      }
    };

    handle();
  }, [tables]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2}>
      <CircularProgress sx={{ color: '#b4463c' }} />
      <Typography color="text.secondary">Đang xử lý kết quả thanh toán...</Typography>
    </Box>
  );
};

export default StaffZaloPayResult;