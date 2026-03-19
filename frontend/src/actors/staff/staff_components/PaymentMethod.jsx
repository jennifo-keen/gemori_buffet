import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Paper } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentsIcon from '@mui/icons-material/Payments'; // Tiền mặt
import QrCode2Icon from '@mui/icons-material/QrCode2'; // QR/Chuyển khoản
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Thẻ
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('cash');

  const methods = [
    { id: 'cash', label: 'Tiền mặt', sub: 'Cash Payment', icon: <PaymentsIcon /> },
    { id: 'bank', label: 'Chuyển khoản / QR', sub: 'Bank Transfer', icon: <QrCode2Icon /> },
    { id: 'card', label: 'Thẻ (Visa/Master)', sub: 'Credit/Debit Card', icon: <CreditCardIcon /> },
  ];

  return (
    <Box sx={{ maxWidth: 400, p: 2, bgcolor: 'white', borderRadius: 4 }}>
      {/* Tiêu đề */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <PaymentIcon sx={{ color: '#1a1f36' }} />
        <Typography variant="h6" fontWeight={600} color="#1a1f36">
          Phương thức thanh toán
        </Typography>
      </Stack>

      {/* Danh sách các thẻ phương thức */}
      <Stack spacing={2}>
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <Paper
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              elevation={0}
              sx={{
                p: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                border: '1px solid',
                // Đổi màu viền nếu được chọn
                borderColor: isSelected ? '#b4463c' : '#f0f0f0',
                bgcolor: isSelected ? 'rgba(180, 70, 60, 0.02)' : 'white',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#b4463c' },
              }}
            >
              <Box sx={{ 
                mr: 3, 
                color: isSelected ? '#b4463c' : '#757575',
                display: 'flex' 
              }}>
                {React.cloneElement(method.icon, { sx: { fontSize: 32 } })}
              </Box>
              
              <Box>
                <Typography variant="body1" fontWeight={600} color="#1a1f36">
                  {method.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {method.sub}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Stack>

      {/* Nút Hoàn tất */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<CheckCircleIcon />}
        sx={{
          mt: 4,
          py: 1.5,
          borderRadius: 3,
          bgcolor: '#b4463c',
          fontSize: '1.1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          '&:hover': { bgcolor: '#9a3a31' },
        }}
      >
        Hoàn tất thanh toán
      </Button>
    </Box>
  );
};

export default PaymentMethods;