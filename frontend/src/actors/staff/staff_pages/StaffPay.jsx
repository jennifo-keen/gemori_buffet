import React, { useState, useEffect } from 'react'; 
import { useSearchParams, useNavigate } from 'react-router-dom';

import MemberShipInput from "../staff_components/MemberShip_Input"
import Ticket from "../staff_components/Ticket";
import PaymentMethod from "../staff_components/PaymentMethod"

import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Box, Stack, Typography, TextField, Button, Grid, CircularProgress } from "@mui/material";

import { validateVoucher, checkout } from '../staff_api/paymentApi';
import { getTableOrder } from '../staff_api/tableApi';

import useAuthStaff from '../staff_hook/useAuthStaff';
import useDialog from '../staff_hook/useDialog'


const StaffPay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateTableStatus } = useAuthStaff();
  const { showSuccess, showError } = useDialog();

  const tableId   = searchParams.get('tableId');
  const tableCode = searchParams.get('tableCode');
  const orderId   = searchParams.get('orderId');

  const [order, setOrder]               = useState(null);
  const [loading, setLoading]           = useState(true);
  const [submitting, setSubmitting]     = useState(false);
  const [customer, setCustomer]         = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [voucherCode, setVoucherCode]   = useState('');
  const [voucherData, setVoucherData]   = useState(null);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherError, setVoucherError] = useState('');

   // Lấy order
  useEffect(() => {
    if (!tableId) return;
    const fetch = async () => {
      try {
        const res = await getTableOrder(tableId);
        setOrder(res.data);
      } catch {
        showError({ title: 'Lỗi', subtitle: 'Không thể tải đơn hàng' });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [tableId]);

  // Tính tiền
  const ticketTotal    = order ? order.ticket_price * order.ticket_quantity : 0;
  const discountAmount = voucherData?.discount_amount || 0;
  const grandTotal     = ticketTotal - discountAmount;

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN').format(Math.round(amount || 0)) + ' VNĐ';

  // Áp voucher
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    try {
      setVoucherLoading(true);
      setVoucherError('');
      const res = await validateVoucher(voucherCode, ticketTotal);
      setVoucherData(res.data);
    } catch (err) {
      setVoucherError(err.response?.data?.message || 'Mã không hợp lệ');
      setVoucherData(null);
    } finally {
      setVoucherLoading(false);
    }
  };

  // Thanh toán
  const handleConfirm = async () => {
    if (!selectedMethod) {
      showError({ title: 'Chưa chọn phương thức', subtitle: 'Vui lòng chọn phương thức thanh toán' });
      return;
    }
    try {
      setSubmitting(true);
      await checkout({
        orderId,
        paymentMethod: selectedMethod,
        phone: customer?.phone || null,
        voucherCode: voucherData ? voucherCode : null,
      });

      // Cập nhật context
      updateTableStatus(tableId, 'empty');

      showSuccess({
        title: 'Thanh toán thành công!',
        subtitle: `${tableCode} — ${formatVND(grandTotal)}`,
        confirmText: 'Về sơ đồ bàn',
        onConfirm: () => navigate('/staff'),
      });
    } catch (err) {
      showError({
        title: 'Thanh toán thất bại',
        subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  return (
    <Box sx={{ p: "32px", gap: "22px" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 'auto' }} sx={{ width: { md: '628px' } }}>
          <Box>
            <Stack
              spacing={0.5}
              sx={{
                borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                pb: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h4"
                fontWeight={600}
                sx={{ color: "#1a1f36", whiteSpace: "nowrap" }}
              >
                Thanh toán hóa đơn
              </Typography>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <ArrowDropDown sx={{ color: "#e26255", width: 16, height: 16 }} />
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ color: "#e26255", whiteSpace: "nowrap" }}
                >
                  {tableCode}
                </Typography>
              </Stack>
            </Stack>

            <Box
              component="header"
              sx={{
                borderBottom: "1px solid #b141350d",
                mt: 2,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  backgroundColor: "#b4463c",
                  borderBottom: "1px solid #b141350d",
                  borderRadius: '18px 18px 0 0', 
                  p: 2,
                }}
              >
                <ShoppingCartOutlined sx={{ color: "white", width: 20, height: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: 500, lineHeight: 1 }}
                >
                  Chi tiết đơn hàng
                </Typography>
              </Stack>
              {order && <Ticket ticket={order} />}
            </Box>

            <Stack
              spacing={1}
              component="section"
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderTop: "1px solid rgba(177, 65, 53, 0.1)",
              }}
            >
               {/* Tạm tính */}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Tạm tính</Typography>
                <Typography variant="body2" fontWeight={600}>{formatVND(ticketTotal)}</Typography>
              </Stack>

              {/* VAT */}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">*Vé đã bao gồm thuế</Typography>
              </Stack>

              {/* Giảm giá */}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Giảm giá</Typography>
                <Typography variant="body2" fontWeight={600} color={discountAmount > 0 ? "#22c55e" : "text.primary"}>
                  {discountAmount > 0 ? `- ${formatVND(discountAmount)}` : '0 VNĐ'}
                </Typography>
              </Stack>


              <Box sx={{ py: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Mã giảm giá (Discount Code)
                </Typography>
                <Stack direction="row" spacing={1} alignItems="stretch"
                sx={{
                  justifyContent:"space-between",
                }}>
                  <TextField
                    placeholder="Nhập mã ưu đãi..."
                   value={voucherCode}
                    onChange={(e) => { setVoucherCode(e.target.value); setVoucherData(null); setVoucherError(''); }}
                    size="small"
                    error={!!voucherError}
                    helperText={voucherError || (voucherData ? `✓ Giảm ${formatVND(voucherData.discount_amount)}` : '')}
                    FormHelperTextProps={{ sx: { color: voucherData ? '#22c55e' : '#b4463c' } }}
                    sx={{
                      width: "425px",
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(177, 65, 53, 0.2)" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyVoucher}
                    disabled={voucherLoading || !voucherCode.trim()}
                    sx={{
                      bgcolor: "#b4463c",
                      borderRadius: 2,
                      px: 3,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#9a3a31" },
                    }}
                  >
                    {voucherLoading ? '...' : 'Áp dụng'}
                  </Button>
                </Stack>
              </Box>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  borderTop: "1px solid rgba(177, 65, 53, 0.1)",
                  pt: 2,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ color: "#e26255" }}>
                  Tổng cộng
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#e26255" }}>
                 {formatVND(grandTotal)}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}> {/* Chỉnh lại cột phải to hơn chút cho cân đối */}
          <Box sx={{ p: 2, borderRadius: 2 }}>
            <MemberShipInput onCustomerFound={setCustomer} />
            <PaymentMethod 
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
              onConfirm={handleConfirm}
              loading={submitting}/>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffPay;