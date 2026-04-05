import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../order_context/OrderContext';
import Header from "../order_component/HeaderProfile"
import ItemVoucher from "../order_component/ItemVoucher"
import HistoryItem from "../order_component/HistoryTicket"
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  CircularProgress, Divider,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import VoucherBucket from "../order_component/ItemAcc"
import { getProfile, getAvailableVouchers } from '../order_api/customerApi';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cardholder from "../../../assets/icon/Cardholder_Ord.svg?react";

export const MemberProfile = () => {
   const navigate = useNavigate();
  const { customer, tableCode, logoutCustomer } = useOrder();
  const [vouchers, setVouchers] = useState([]);
  const [profile, setProfile]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Nếu chưa đăng nhập → redirect về login
  useEffect(() => {
    if (!customer) {
      navigate(`/order/${tableCode}/login`);
      return;
    }
    const fetchProfile = async () => {
      try {
        const [profileRes, voucherRes] = await Promise.all([
                getProfile(),
                getAvailableVouchers(),
              ]);
              setProfile(profileRes.data);
              setVouchers(voucherRes.data);
      } catch {
        setError('Không thể tải thông tin');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [customer, tableCode, navigate]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress sx={{ color: "#8a0000" }} />
    </Box>
  );

  if (error) return (
    <Box p={4} textAlign="center">
      <Typography color="error">{error}</Typography>
    </Box>
  );

  // Lấy chữ cái đầu tên
  const initials = profile?.full_name?.charAt(0).toUpperCase() || '?';

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 4 }}>
        <Header />
      <Box sx={{ px: { xs: 1, sm: 2 }, mt: 2 }}>
        {/* 2. User Info Card */}
        <Paper
          elevation={0}
          sx={{
            p:2 ,
            borderRadius: 4,
            border: '1px solid rgba(138, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 2 ,
            mb: 3,
          }}
        >
          <Avatar 
            sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: '#8a0000', 
              fontSize: 24, 
              fontWeight: 700 
            }}
          >
            {initials}
          </Avatar>
          <Stack>
            <Typography 
              variant="subtitle1" 
              fontWeight={700}
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              {profile?.full_name || '---'}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              ID: {profile?.id?.slice(0, 8) || '---'}
            </Typography>
          </Stack>
        </Paper>

        {/* 3. Quick Actions (Ví & Hồ sơ) */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%", 
            justifyContent: "center",
            alignItems: "stretch", 
            mb: 3,
          }}
        >
          {/* Item 1: VoucherBucket */}
          <Box sx={{ flex: 1 }}> 
            {/* Bọc VoucherBucket vào Box và set flex: 1 */}
            <VoucherBucket count={vouchers.length} />
          </Box>

          {/* Item 2: Hồ sơ */}
          <Paper
            elevation={0}
            onClick={() => navigate(`/order/${tableCode}/profile`)}
            sx={{
              flex: 1, 
              height: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              p: 2,
              borderRadius: 4, 
              border: "1px solid rgba(138, 0, 0, 0.1)",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            {/* Icon container */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(138, 0, 0, 0.05)",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <AccountCircleIcon sx={{ color: "#8a0000", fontSize: 24 }} />
            </Box>

            {/* Text content */}
            <Stack alignItems="center" spacing={0}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ color: "#0f172a", lineHeight: 1 }}
              >
                Hồ sơ
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                  mt: 0.5
                }}
              >
                Cập nhật
              </Typography>
            </Stack>
          </Paper>
        </Stack>

        {/* 4. Vouchers Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Cardholder sx={{ fontSize: { xs: 18, sm: 20 }, color: '#8a0000' }} />
            <Typography 
              variant="subtitle1" 
              fontWeight={700} 
              color="#8a0000"
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              Voucher hiện có
            </Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} sx={{ overflowX: 'auto', pb: 1 }}>
            {vouchers.length === 0 ? (
              <Typography color="text.secondary" fontSize={14}>Không có voucher nào</Typography>
            ) : (
              vouchers.map(v => <ItemVoucher key={v.id} voucher={v} />)
            )}
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
          </Stack>
        </Box>
         {/* Đăng xuất */}
        <Box mt={4} textAlign="center">
          <Typography
            variant="body2"
            onClick={() => { logoutCustomer(); navigate(`/order/${tableCode}`); }}
            sx={{ color: '#8a0000', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Đăng xuất
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberProfile;