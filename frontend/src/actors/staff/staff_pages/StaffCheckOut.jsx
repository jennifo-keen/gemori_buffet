import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import CardTable from "../staff_components/CardTable"
import Bill      from "../staff_components/Bill"
import InfoCard  from "../staff_components/InfoCard"

import QrCode from "../../../assets/icon/QrCode.svg"

import { getTableOrder }   from '../staff_api/tableApi';
import { deleteOrderItem } from '../staff_api/orderApi';

import  useAuthStaff from '../staff_hook/useAuthStaff';
import useDialog     from '../staff_hook/useDialog';


import RestaurantIcon from "@mui/icons-material/Restaurant";
import GroupsIcon     from "@mui/icons-material/Groups";
import PersonIcon     from "@mui/icons-material/Person";
import {Box, 
        Stack, 
        Typography,
        Paper,  
        Grid,
        Button,
        SvgIcon,
        CircularProgress,
      } from "@mui/material"

const StaffCheckOut = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { admin, tables } = useAuthStaff();
  const { showConfirm, showSuccess, showError } = useDialog();

  const tableId   = searchParams.get('tableId');
  const tableCode = searchParams.get('tableCode');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy order của bàn
  useEffect(() => {
    if (!tableCode) return;
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await getTableOrder(tableCode);
        setOrder(res.data);
      } catch  {
        setError('Không thể tải đơn hàng');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [tableCode]);

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN').format(amount || 0) + ' VNĐ';

const handleDeleteItem = (itemId) => {
  const item = order?.items?.find(i => i.id === itemId);
  if (!item) return;

  if (item.status === 'done') {
    showError({
      title: 'Không thể xóa',
      subtitle: 'Món đã được phục vụ, không thể hủy.',
      confirmText: 'Đã hiểu',
    });
    return;
  }

  showConfirm({
    title: 'Xác nhận hủy món',
    subtitle: `Bạn có chắc muốn hủy món ${item.menu_name} này không?`,
    badges: [
      { label: item.menu_name },
      { label: `SL: ${item.quantity}` },
      { label: item.status === 'pending' ? 'Đang chờ' : 'Đang làm' },
    ],
    confirmText: 'Hủy món',
    cancelText: 'Giữ lại',
    onConfirm: async () => {
      try {
        await deleteOrderItem(itemId, tableCode);
        const res = await getTableOrder(tableCode);
        setOrder(res.data);
        showSuccess({
          title: 'Đã hủy món!',
          subtitle: `Món đã được xóa khỏi đơn hàng bàn ${tableCode}`,
          confirmText: 'Đóng',
        });
      } catch (err) {
        showError({
          title: 'Hủy món thất bại',
          subtitle: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại',
          confirmText: 'Thử lại',
        });
      }
    },
  });
};

  const ticketTotal = order
    ? (order.ticket_price * order.ticket_quantity)
    : 0;

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  if (error) return (
    <Box p={4}><Typography color="error">{error}</Typography></Box>
  );

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "flex-start", 
      p: "32px",
      gap: "22px",
      width: "100%",
      minHeight: "100vh",
      boxSizing: "border-box",
      backgroundColor: "#F5F5F5",
    }}
  >
    {/* Thanh list Table  */}
      <Stack
        sx={{
          flexShrink: 0,
          height: "100vh", 
          overflow: 'hidden',
          alignItems: "flex-start",
          backgroundColor: "#FAFAFA",
          p:"24px",
        }}
      >
        <Box pb={2}>
          <Typography variant="h6" fontWeight="bold" color="grey.900">
            Các bàn khác
          </Typography>
        </Box>

        <Stack
          spacing={1.5}
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 1,
               "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#e2e8f0", borderRadius: "4px" },
          }}
        >
          {tables
            // Sắp xếp: ordering trước, empty sau
            .slice().sort((a, b) => {
              // Cùng nhóm → sort theo số bàn tăng dần (B01, B02, B03...)
              const numA = parseInt(a.table_code.replace(/\D/g, ''));
              const numB = parseInt(b.table_code.replace(/\D/g, ''));
              return numA - numB;
            })
              .map(t => {
              const isOrdering = t.status === 'ordering';
              const isCurrent  = t.id === tableId;

              return (
                <CardTable
                  key={t.id}
                  table={{
                    id: t.table_code,
                    name: `Bàn ${t.table_code}`,
                    status: isOrdering ? 'Có khách' : t.status === 'empty' ? 'Trống' : 'Bảo trì',
                    dot: isOrdering ? '#22c55e' : null,
                  }}
                  isSelected={isCurrent}
                  onClick={isOrdering
                    ? () => navigate(`/staff/checkout?tableId=${t.id}&tableCode=${t.table_code}`)
                    : null
                  }
                  disabled={!isOrdering}
                />
              );
            })
          }
        </Stack>
      </Stack>

      {/* Thanh header thẻ trạng thái  */}
      <Grid 
        container 
        spacing={2} 
        sx={{ flex: 1, alignItems: "flex-start", width: "100%" }}
      >
        <Grid item xs={12}  md={4}>
          <InfoCard
            icon={<RestaurantIcon sx={{ color: "#ef4444", fontSize: 20 }} />}
            label="Trạng thái"
            title={tableCode || '---'}
            subtitle="Có khách"
            statusColor="#22c55e"
          />
        </Grid>
        <Grid item xs={12}  md={4}>
          <InfoCard
            icon={<GroupsIcon sx={{ color: "#ef4444", fontSize: 20 }} />}
            label="Số khách hàng"
            title={order?.ticket_quantity ? `${order.ticket_quantity} người` : '---'}
            subtitle={`Gói: ${order?.ticket_name || '---'}`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard
            icon={<PersonIcon sx={{ color: "#ef4444", fontSize: 20 }} />}
            label="Nhân viên trực quầy"
            title={admin?.full_name || '---'}
            subtitle={`ID: ${admin?.id?.slice(0, 8) || '---'}`}
          />
        </Grid>

        {/* Hàng 2: Chia đôi cột trái (Đơn hàng) và cột phải (QR + Thanh toán) */}
        <Grid item xs={12} md={7}>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: "20px",
              }}
            >
            <Box
              sx={{
                width:450,
                backgroundColor: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
               
              }}
              >
                <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>
                    Đơn hàng hiện tại — {tableCode}
                  </Typography>
                </Box>

               <Box
                  sx={{
                    display: "flex",
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px solid #f1f5f9",
                    backgroundColor: "#F8FAFC",                 
                    "& .MuiTypography-root": {
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#64748b",
                    }
                  }}
                >
                  {[
                    { label: "Món ăn", flex: 4, align: "left" }, 
                    { label: "SL", flex: 1, align: "center" },   
                    { label: "Trạng thái", flex: 2, align: "center" },
                    { label: "Tác vụ", flex: 1, align: "center" },  
                  ].map((col) => (
                    <Typography
                      key={col.label}
                      sx={{
                        flex: col.flex,      
                        textAlign: col.align,
                      }}
                    >
                      {col.label}
                    </Typography>
                  ))}
                </Box>
        
                <Box
                  sx={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: "#e2e8f0", borderRadius: "4px" },
                  }}
                >
                   {order?.items?.length > 0
                  ? order.items.map(item => (
                      <Bill
                        key={item.id}
                        item={{
                          id: item.id,
                          name: item.menu_name,
                          quantity: item.quantity,
                          status: item.status,
                          image: item.image_url,
                        }}
                        onDelete={handleDeleteItem}
                      />
                    ))
                  : (
                    <Box p={4} textAlign="center">
                      <Typography color="text.secondary">Chưa có món nào</Typography>
                    </Box>
                  )
                }
                </Box>
              </Box>
            </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={2} sx={{ height: "100%",p: "20px", minWidth: "50%"}}>
            {/* QR Code */}
                 <Paper
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: "grey.200",
                      p: 3,
                      width: "100%",
                    }}
                  >
                    <Stack spacing={2}>
                      {/* Header: QR icon + title */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box src={QrCode} component="img" sx={{ color: "grey.900", fontSize: 24 }} />
                        <Typography variant="subtitle1" fontWeight="bold" color="grey.900">
                          Mã QR của bàn
                        </Typography>
                      </Stack>

                      {/* QR code display area */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#F8FAFC",
                          border: "1px solid",
                          borderColor: "grey.100",
                          borderRadius: "12px",
                          p: "24px",
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid",
                            borderColor: "grey.100",
                            borderRadius: 2,
                            p: 2,
                            bgcolor: "#FFFFFF",
                            overflow: "hidden",
                            lineHeight: 0,
                          }}
                        >
                          <Box
                            component="img"
                            alt="QR Code"
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`http://localhost:5173/order/${tableCode}`)}`}
                            sx={{
                              width: 160,
                              height: 160,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Paper>
             


              <Paper sx={{ p: 2 }}>
                  <Stack spacing={1.5}>
                  {/* Section title */}
                  <Typography variant="subtitle1" fontWeight="bold" color="grey.900">
                    Tóm tắt thanh toán
                  </Typography>

                  {/* Line items with bottom divider */}
                  <Box pb={3} sx={{ borderBottom: "1px solid", borderColor: "grey.100", width: "355px" }}>
                    <Stack spacing={1.5}>                   
                        <Stack spacing={0.5} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {order?.ticket_name} × {order?.ticket_quantity}
                          </Typography>
                          <Typography variant="body2" fontWeight="500" color="grey.900">
                            {formatVND(order?.ticket_price)} × {order?.ticket_quantity}
                          </Typography>
                        </Stack>
              
                        {/* Tạm tính */}
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Tạm tính
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {formatVND(ticketTotal)}
                      </Typography>
                    </Stack>

                    {/* VAT */}
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        *Vé đã bao gồm thuế
                      </Typography>
                    </Stack>

                    </Stack>
                  </Box>


                   {/* Voucher nếu có */}
                    {order?.voucher_code && (
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                          Voucher ({order.voucher_code})
                        </Typography>
                        <Typography variant="body2" fontWeight="500" color="#22c55e">
                          - {formatVND(ticketTotal - order.total_amount)}
                        </Typography>
                      </Stack>
                    )}
                 
                  {/* Total row */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight="bold" color="grey.900">
                      Tổng cộng
                    </Typography>
                    <Typography variant="h6" 
                                fontSize="20px"
                                fontWeight="700" 
                                color="#b4463c">
                        {formatVND(order?.total_amount || ticketTotal)}
                    </Typography>
                  </Stack>

                  {/* Payment button */}
                  <Button
                    variant="contained"
                     onClick={() => navigate(
                    `/staff/checkout/pay?tableId=${tableId}&tableCode=${tableCode}&orderId=${order?.id}`
                  )}
                    startIcon={
                    <SvgIcon viewBox="0 0 32 32">
                      <path 
                        d="M27 6H6C5.20435 6 4.44129 6.31607 3.87868 6.87868C3.31607 7.44129 3 8.20435 3 9V23C3 23.7956 3.31607 24.5587 3.87868 25.1213C4.44129 25.6839 5.20435 26 6 26H26C26.7956 26 27.5587 25.6839 28.1213 25.1213C28.6839 24.5587 29 23.7956 29 23V9C29 8.20435 28.6839 7.44129 28.1213 6.87868C27.5587 6.31607 26.7956 6 26 6ZM19 15C19 15.7956 18.6839 16.5587 18.1213 17.1213C17.5587 17.6839 16.7956 18 16 18C15.2044 18 14.4413 17.6839 13.8787 17.1213C13.3161 16.5587 13 15.7956 13 15C13 14.7348 12.8946 14.4804 12.7071 14.2929C12.5196 14.1054 12.2652 14 12 14H5V12H27V14H20C19.7348 14 19.4804 14.1054 19.2929 14.2929C19.1054 14.4804 19 14.7348 19 15ZM6 8H26C26.2652 8 26.5196 8.10536 26.7071 8.29289C26.8946 8.48043 27 8.73478 27 9V10H5V9C5 8.73478 5.10536 8.48043 5.29289 8.29289C5.48043 8.10536 5.73478 8 6 8Z" 
                        fill="currentColor" 
                      />
                    </SvgIcon>}
                    sx={{
                      backgroundColor: "#b4463c",
                      borderRadius: 3,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#9e3c33" },
                    }}
                    fullWidth
                  >
                    Thanh toán bàn này
                  </Button>
                </Stack>
              </Paper>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
};

export default StaffCheckOut;