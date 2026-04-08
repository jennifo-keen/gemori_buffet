import React, { useEffect, useState, useCallback } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import TableCard from '../kitchen_components/TableCardOpt';

import { fetchPendingItems, updateItemStatus, completeTableStatus } from '../kitchen_api/kitchenApi';
import { useKitchenSocket } from '../kitchen_hook/useKitchenSocket';

export default function Kitchen_OrdDetail() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Logic tải dữ liệu
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

  // 2. Sử dụng custom hook để xử lý Realtime
  useKitchenSocket(loadData);

  // 3. Các hàm xử lý sự kiện
  const handleCompleteTable = async (tableCode) => {
    try {
      await completeTableStatus(tableCode);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItem = async (itemId, status) => {
    try {
      await updateItemStatus(itemId, status);
      await loadData();
    } catch (err) {
      console.error(err);
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
        gap: 2,
        overflowX: "auto",
        padding: 2,
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",

        // scroll đẹp hơn
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: 4,
        },
      }}
    >
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
  );
};