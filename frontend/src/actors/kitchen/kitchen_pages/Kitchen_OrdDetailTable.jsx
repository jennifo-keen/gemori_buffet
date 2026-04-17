import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";

import OrdStatusHeader  from "../kitchen_components/OrdStatusHeader"
import OrderTable       from '../kitchen_components/OrderTable';

import { fetchPendingItems, updateItemStatus, completeTableStatus } from '../kitchen_api/kitchenApi';

import { useTableSocket } from '../kitchen_hook/useTableSocket';

import useDialog from '../../staff/staff_hook/useDialog'

export default function Kitchen_OrdDetailTable() {
  const { tableCode } = useParams();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showConfirm, showSuccess, showError } = useDialog(); 

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

  // Realtime logic (Dùng chung hook xử lý 1 bàn)
  useTableSocket(tableCode, loadData);

  // Handlers
const handleUpdateItem = (itemId, status) => {
  const item = tableData?.items?.find(i => i.id === itemId);

  if (status === 'done') {
    showConfirm({
      title: 'Xác nhận xong món?',
      subtitle: 'Món sẽ được đánh dấu hoàn thành và thông báo cho khách.',
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
    updateItemStatus(itemId, status).catch(err =>
      showError({
        title: 'Lỗi cập nhật',
        subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
        confirmText: 'Đóng',
      })
    );
  }
};

  const handleCompleteAll = () => {
  showConfirm({
    title: 'Hoàn tất đơn bàn?',
    subtitle: `Tất cả món của bàn ${tableCode} sẽ được đánh dấu hoàn thành.`,
    badges: [
      { label: `Bàn ${tableCode}` },
      { label: `${tableData?.items?.length || 0} món` },
    ],
    confirmText: 'Hoàn tất',
    cancelText: 'Hủy',
    onConfirm: async () => {
      try {
        await completeTableStatus(tableCode);
        showSuccess({
          title: 'Hoàn tất đơn!',
          subtitle: `Bàn ${tableCode} đã được phục vụ xong.`,
          confirmText: 'Đóng',
          onConfirm: () => navigate('/kitchen'),
        });
      } catch (err) {
        showError({
          title: 'Lỗi hoàn tất',
          subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
          confirmText: 'Đóng',
        });
      }
    },
  });
};

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  if (!tableData) return (
    <Box p={4} textAlign="center">
      <Typography color="text.secondary">
        Không có món nào đang chờ cho bàn {tableCode}
      </Typography>
      <Button onClick={() => navigate('/kitchen')} sx={{ mt: 2, color: "#b4463c" }}>
        Quay lại
      </Button>
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
        <OrdStatusHeader tableData={tableData}/>
        <OrderTable 
          items={tableData.items}
          onUpdateItem={handleUpdateItem}
        />

         <Box
              component="footer"
              sx={{
                borderTop: "1px solid rgba(177, 65, 53, 0.1)",
                pt: 4,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {/* Back to table map button */}
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/kitchen')}
                  sx={{
                    backgroundColor: "grey.100",
                    borderRadius: 3,
                    px: 4,
                    py: 2,
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
                  Quay lại sơ đồ bàn
                </Button>
        
                {/* Complete order button */}
                <Button
                  variant="contained"
                  onClick={handleCompleteAll}
                  sx={{
                    backgroundColor: "#b14135",
                    borderRadius: 3,
                    px: 6,
                    py: 2,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#8f3329",
                      boxShadow: "none",
                    },
                  }}
                >
                  HOÀN TẤT ĐƠN
                </Button>
              </Stack>
            </Box>

    </Box>
  )
}