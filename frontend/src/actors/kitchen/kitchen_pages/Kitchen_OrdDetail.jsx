import React, { useEffect, useState, useCallback } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";

import TableCard from '../kitchen_components/TableCardOpt';

import { fetchPendingItems, updateItemStatus, completeTableStatus } from '../kitchen_api/kitchenApi';

import { useKitchenSocket } from '../kitchen_hook/useKitchenSocket';

import useDialog from '../../staff/staff_hook/useDialog'

export default function Kitchen_OrdDetail() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showConfirm, showSuccess, showError } = useDialog(); 

  const loadData = useCallback(async () => {
    try {
      const res = await fetchPendingItems();
      setTables(res.data);
    } catch (err) {
      console.error('Lỗi tải dữ liệu bếp:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Sử dụng custom hook để xử lý Realtime
  useKitchenSocket(loadData);

  // Các hàm xử lý sự kiện
  const handleCompleteTable = async (tableCode) => {
        try {
          await completeTableStatus(tableCode);
          await loadData();
          showSuccess({
            title: 'Hoàn tất đơn!',
            subtitle: `Bàn ${tableCode} đã được phục vụ xong.`,
            confirmText: 'Đóng',
          });
        } catch (err) {
          showError({
            title: 'Lỗi hoàn tất',
            subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
            confirmText: 'Đóng',
          });       
      }
  };

  const handleUpdateItem = async (itemId, status) => {
      const item = tables.flatMap(t => t.items).find(i => i.id === itemId);

    if (status === 'done') {
      showConfirm({
        title: 'Xác nhận xong món?',
        subtitle: 'Món sẽ được đánh dấu hoàn thành và gửi thông báo cho khách.',
        badges: [
          { label: item?.menu_name || 'Món' },
          { label: `SL: ${item?.quantity}` },
        ],
        confirmText: 'Xong món',
        cancelText: 'Hủy',
        onConfirm: async () => {
          try {
            await updateItemStatus(itemId, status);
          } catch (err) {
            showError({
              title: 'Lỗi cập nhật',
              subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
              confirmText: 'Đóng',
            });
          }
        },
      });
    } else {
      updateItemStatus(itemId, status).catch(err => {
        showError({
          title: 'Lỗi cập nhật',
          subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
          confirmText: 'Đóng',
        });
      });
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  if (tables.length === 0) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography color="text.secondary">Không có món nào đang chờ</Typography>
    </Box>
  );
  return (
    <Box
      sx={{
        zoom: 0.75,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowX: "auto",
        padding: 2,
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: 4,
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
        {tables.map((tableData) => (
          <Box key={tableData.table_code} sx={{ flex: "0 0 auto" }}>
            <TableCard 
              data={tableData}
              onComplete={() => handleCompleteTable(tableData.table_code)}
              onUpdateItem={handleUpdateItem}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};