import React from 'react';
import Header from "../order_component/HeaderProfile"
import ItemVoucher from "../order_component/ItemVoucher"
import HistoryItem from "../order_component/HistoryTicket"
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Grid,
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HistoryIcon from '@mui/icons-material/History';
import VoucherBucket from "../order_component/ItemAcc"

export const MemberProfile = () => {
  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: { xs: 2, sm: 4 } }}>
      {/* 1. Header Area */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ p: { xs: 1, sm: 2 }, bgcolor: 'white' }}
      >
        <Header />
      </Stack>

      <Box sx={{ px: { xs: 1, sm: 2 }, mt: 2 }}>
        {/* 2. User Info Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 4,
            border: '1px solid rgba(138, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2 },
            mb: 3
          }}
        >
          <Avatar
            sx={{ 
              width: { xs: 50, sm: 70 }, 
              height: { xs: 50, sm: 70 }, 
              border: '2px solid #8a0000' 
            }}
          />
          <Stack>
            <Typography 
              variant="subtitle1" 
              fontWeight={700}
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              Nguyễn Minh Hoàng
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              ID: 0123456789
            </Typography>
          </Stack>
        </Paper>

        {/* 3. Quick Actions (Ví & Hồ sơ) */}
        <Stack 
          direction="row"  
          spacing={2}      
          sx={{ 
            width: '100%', 
            justifyContent: 'center', 
            alignItems: 'center'      
          }}
        >
          <VoucherBucket />
          <VoucherBucket />
        </Stack>


        {/* 4. Vouchers Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <ConfirmationNumberIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#8a0000' }} />
            <Typography 
              variant="subtitle1" 
              fontWeight={700} 
              color="#8a0000"
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              Voucher hiện có
            </Typography>
          </Stack>
          
          <Stack 
            direction="row" 
            spacing={{ xs: 1.5, sm: 2 }} 
            sx={{ overflowX: 'auto', pb: 1 }}
          >
            {/* Voucher Item 1 */}
            <ItemVoucher />
            {/* Voucher Item 2 */}
            <ItemVoucher />
          </Stack>
        </Box>

        {/* 5. History Section */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#8a0000' }} />
            <Typography 
              variant="subtitle1" 
              fontWeight={700} 
              color="#8a0000"
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              Lịch sử ăn gần đây
            </Typography>
          </Stack>

          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberProfile;