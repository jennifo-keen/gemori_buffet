// PaymentMethod.jsx
import React from 'react';
import { Box, Typography, Stack, Button, Paper } from '@mui/material';
import PaymentIcon     from '@mui/icons-material/Payment';
import PaymentsIcon    from '@mui/icons-material/Payments';
import QrCode2Icon     from '@mui/icons-material/QrCode2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const methods = [
  {
    id:    'cash',
    label: 'Tiền mặt',
    sub:   'Cash Payment',
    icon:  <PaymentsIcon />,
  },
  {
    id:    'zalopay',
    label: 'ZaloPay',
    sub:   'QR / ATM / Visa / MasterCard',
    icon:  (
      <Box
        component="img"
        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
        sx={{ width: 32, height: 32, borderRadius: 1, objectFit: 'contain' }}
      />
    ),
  },
];

const PaymentMethod = ({ selectedMethod, onSelect, onConfirm, onZaloPay, loading }) => {
  return (
    <Box sx={{ maxWidth: 400, p: 2, bgcolor: 'white', borderRadius: 4 }}>

      {/* Tiêu đề */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <PaymentIcon sx={{ color: '#1a1f36' }} />
        <Typography variant="h6" fontWeight={600} color="#1a1f36">
          Phương thức thanh toán
        </Typography>
      </Stack>

      {/* Danh sách phương thức */}
      <Stack spacing={2}>
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <Paper
              key={method.id}
              onClick={() => onSelect(method.id)}
              elevation={0}
              sx={{
                p: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                border: '1px solid',
                borderColor: isSelected ? '#b4463c' : '#f0f0f0',
                bgcolor: isSelected ? 'rgba(180, 70, 60, 0.02)' : 'white',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#b4463c' },
              }}
            >
              {/* Icon */}
              <Box sx={{
                mr: 2,
                color: isSelected ? '#b4463c' : '#757575',
                display: 'flex',
                alignItems: 'center',
              }}>
                {method.id === 'zalopay'
                  ? method.icon
                  : React.cloneElement(method.icon, {
                      sx: { fontSize: 32, color: isSelected ? '#b4463c' : '#757575' },
                    })
                }
              </Box>

              {/* Label */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={600} color="#1a1f36">
                  {method.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {method.sub}
                </Typography>
              </Box>

              {/* Tick khi chọn */}
              {isSelected && (
                <CheckCircleIcon sx={{ color: '#b4463c', fontSize: 20, ml: 1 }} />
              )}
            </Paper>
          );
        })}
      </Stack>

      {/* Nút hành động */}
      <Stack spacing={1.5} sx={{ mt: 4 }}>
        {/* Thanh toán tiền mặt */}
        {selectedMethod === 'cash' && (
          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            startIcon={<CheckCircleIcon />}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              bgcolor: '#b4463c',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { bgcolor: '#9a3a31' },
            }}
          >
            {loading ? 'Đang xử lý...' : 'Hoàn tất thanh toán'}
          </Button>
        )}

        {/* Thanh toán ZaloPay */}
        {selectedMethod === 'zalopay' && (
          <Button
            fullWidth
            variant="contained"
            onClick={onZaloPay}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              bgcolor: '#0068ff',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              display: 'flex',
              gap: 1,
              '&:hover': { bgcolor: '#0057d9' },
              '&:disabled': { bgcolor: '#99bfff' },
            }}
          >
            <Box
              component="img"
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
              sx={{ width: 24, height: 24, borderRadius: 1 }}
            />
            {loading ? 'Đang tạo đơn...' : 'Thanh toán qua ZaloPay'}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default PaymentMethod;