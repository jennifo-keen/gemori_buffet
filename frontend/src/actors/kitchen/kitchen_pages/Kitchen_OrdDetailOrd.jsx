import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrdStatusHeader  from "../kitchen_components/OrdStatusHeader"
import OrderTable from '../kitchen_components/OrderTable';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Stack, CircularProgress, Typography } from "@mui/material";

import { fetchPendingItems, updateItemStatus, completeTableStatus } from '../kitchen_api/kitchenApi';
import { useTableSocket } from '../kitchen_hook/useTableSocket';

export default function Kitchen_OrdDetailOrd() {
  const { tableCode } = useParams();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false)

  // Load data logic
  const loadData = useCallback(async () => {
    try {
      const res = await fetchPendingItems();
      const found = res.data.find(t => t.table_code === tableCode);
      setTableData(found || null);
    } catch (err) {
      console.error("Lỗi tải dữ liệu bàn:", err);
    } finally {
      setLoading(false);
    }
  }, [tableCode]);

  useEffect(() => { loadData(); }, [loadData]);

  // Realtime logic
  useTableSocket(tableCode, loadData, setTableData);

  // Handlers
  const handleUpdateItem = async (itemId, status) => {
    try {
      await updateItemStatus(itemId, status);
    } catch (err) {
      console.error("Lỗi cập nhật món:", err);
    }
  };

  const handleCompleteAll = async () => {
    try {
      setCompleting(true);
      await completeTableStatus(tableCode);
      navigate('/kitchen/all');
    } catch (err) {
      console.error("Lỗi hoàn tất bàn:", err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  if (!tableData) return (
    <Box p={4} textAlign="center">
      <Typography color="text.secondary">Không có món nào đang chờ cho bàn {tableCode}</Typography>
      <Button onClick={() => navigate('/kitchen/all')} sx={{ mt: 2, color: "#b4463c" }}>Quay lại</Button>
    </Box>
  );

  return (
    <Box
      sx={{
        p:"32px",
        gap: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zoom: "0.75",
      }}>
        <OrdStatusHeader tableData={tableData} />
        <OrderTable 
          items={tableData.items}
          onUpdateItem={handleUpdateItem}
        />

        <Box
          component="footer"
          sx={{
            borderTop: "1px solid rgba(177, 65, 53, 0.1)",
            py: "16px",

            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Close details button */}
            <Button
              variant="contained"
              onClick={() => navigate('/kitchen/all')}
              startIcon={<CloseIcon sx={{ width: 24, height: 24 }} />}
              sx={{
                backgroundColor: "grey.100",
                borderRadius: "12px",
                px: "48px",
                py: "16px",
                fontWeight: "bold",
                fontSize: "0.875rem",
                textTransform: "none",
                boxShadow: "none",
                color: "#334155",
                "&:hover": {
                  backgroundColor: "grey.200",
                  boxShadow: "none",
                },
              }}
            >
              Đóng chi tiết
            </Button>

            {/* Complete order button */}
            <Button
              variant="contained"
              startIcon={completing ? <CircularProgress size={20} color="inherit" /> : <CheckBoxIcon />}
              onClick={handleCompleteAll}
              disabled={completing}
              sx={{
                backgroundColor: "#b14135",
                borderRadius: "12px",
                px: 6,
                py: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#8f342a",
                  boxShadow: "none",
                },
              }}
            >
              {completing ? 'ĐANG XỬ LÝ...' : 'HOÀN TẤT ĐƠN'}
            </Button>
          </Stack>
        </Box>

    </Box>
  )
}