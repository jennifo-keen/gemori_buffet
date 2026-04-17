import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOrder } from '../order_context/OrderContext';

import {
  getProfile, updateProfile,
  deleteAccount, getAvailableVouchers,
} from '../order_api/customerApi';

import Footer from "../order_component/Footer"
import Header from "../order_component/HeaderProfile"

import { Box, Button, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Paper, Stack, TextField, Typography
 } from "@mui/material";

import SaveIcon    from "@mui/icons-material/Save";
import CloseIcon   from "@mui/icons-material/Close";
import ConfirmIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditIcon    from "@mui/icons-material/Edit";
import ShopIcon    from "@mui/icons-material/ShoppingBagOutlined";

const BORDER_COLOR = "rgba(177, 65, 53, 0.1)";

const formatDate = (dateStr) => {
  if (!dateStr) return '---';
  return new Date(dateStr).toLocaleDateString('vi-VN');
};


const OrdProfile = () => {
  const navigate = useNavigate();
  const { tableCode, logoutCustomer } = useOrder();

  const [profile, setProfile]     = useState(null);
  const [vouchers, setVouchers]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [editing, setEditing]     = useState(false);
  const [saving, setSaving]       = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editData, setEditData]   = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, voucherRes] = await Promise.all([
          getProfile(),
          getAvailableVouchers(),
        ]);
        setProfile(profileRes.data);
        setVouchers(voucherRes.data);
        setEditData({
          full_name: profileRes.data.full_name || '',
          email:     profileRes.data.email || '',
          birthday:  profileRes.data.birthday?.split('T')[0] || '',
          gender:    profileRes.data.gender || '',
          address:   profileRes.data.address || '',
        });
      } catch {
        navigate(`/order/${tableCode}/login`);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await updateProfile(editData);
      setProfile(prev => ({ ...prev, ...res.data }));
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      logoutCustomer();
      navigate(`/order/${tableCode}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress sx={{ color: "#a21a16" }} />
    </Box>
  );

  const profileFields = [
    { label: "Họ và tên",    key: "full_name", value: profile?.full_name },
    { label: "Email",        key: "email",     value: profile?.email },
    { label: "Số điện thoại", key: null,       value: profile?.phone },   // ← không cho sửa SĐT
    { label: "Ngày sinh",    key: "birthday",  value: formatDate(profile?.birthday), type: "date" },
    { label: "Giới tính",    key: "gender",    value: profile?.gender },
    { label: "Địa chỉ",     key: "address",   value: profile?.address },
  ];

  const statsCards = [
    { label: "Đơn hàng",  value: profile?.stats?.orders   || 0, icon: <ShopIcon sx={{ color: "#a21a16", width: 24, height: 24 }} /> },
    { label: "Voucher",   value: profile?.stats?.vouchers || 0, icon: <ConfirmIcon sx={{ color: "#a21a16", width: 24, height: 24 }} /> },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 3,
        border: `1px solid ${BORDER_COLOR}`,
        boxSizing: "border-box",
      }}
    >
      <Header/>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        p={6}
      >
        <Stack spacing={0.25}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="grey.900"
            lineHeight={1.3}
          >
            Hồ sơ cá nhân
          </Typography>
          <Typography variant="caption" color="text.secondary" lineHeight={1.5}>
            Quản lý thông tin tài khoản và bảo mật của bạn
          </Typography>
        </Stack>

        {editing ? (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<CloseIcon />}
              onClick={() => setEditing(false)}
              sx={{ borderColor: "#a21a16", color: "#a21a16", borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >Hủy</Button>
            <Button variant="contained" startIcon={saving ? <CircularProgress size={14} color="inherit" /> : <SaveIcon />}
              onClick={handleSave} disabled={saving}
              sx={{ bgcolor: "#a21a16", borderRadius: 2, textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#8b1512" } }}
            >{saving ? 'Đang lưu...' : 'Lưu'}</Button>
          </Stack>
        ) : (
          <Button variant="contained" startIcon={<EditIcon sx={{ width: 18, height: 18 }} />}
            onClick={() => setEditing(true)}
            sx={{ bgcolor: "#a21a16", borderRadius: 2, textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#8b1512" } }}
          >Chỉnh sửa</Button>
        )}
      
    </Stack>
      {/* Profile Fields */}
      <Stack spacing={0} px={6} >
        {profileFields.map((field, index) => (
          <Box
            key={index}
            pb={2}
            sx={{
              borderBottom: `1px solid ${BORDER_COLOR}`,
              mb: index < profileFields.length - 1 ? 2 : 0,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
              display="block"
              mb={0.25}
            >
              {field.label}
            </Typography>
             {editing && field.key ? (
              <TextField
                fullWidth size="small" variant="outlined"
                type={field.type || 'text'}
                value={editData[field.key] || ''}
                onChange={(e) => setEditData(prev => ({ ...prev, [field.key]: e.target.value }))}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "& fieldset": { borderColor: BORDER_COLOR } } }}
              />
            ) : (
              <Typography variant="body1" fontWeight={500} color="grey.900">
                {field.value || ''}
              </Typography>
            )}
          </Box>
        ))}
      </Stack>

      {/* Stats + Delete Section */}
      <Box py={3} mt={3}  sx={{ borderTop: `1px solid ${BORDER_COLOR}` }}>
        {/* Stats Cards */}
        <Stack direction="row" spacing={2} mb={2} mx={4}>
          {statsCards.map((card, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 3,
                border: `1px solid ${BORDER_COLOR}`,
              }}
            >
              {/* Icon Box */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: "rgba(177, 65, 53, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>

              <Stack spacing={0}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  lineHeight={1.5}
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="grey.900"
                  lineHeight={1.3}
                >
                  {card.value}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>


        {/* Delete Account Card */}
        <Paper elevation={0} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, mx: 3, borderRadius: 3, bgcolor: "#fff7f4", border: `1px solid ${BORDER_COLOR}` }}>
          <Stack spacing={0.25} flex={1}>
            <Typography variant="body1" fontWeight={700} color="grey.800">Xóa tài khoản</Typography>
            <Typography variant="caption" color="text.secondary" lineHeight={1.5}>
              Một khi bạn xóa tài khoản, mọi dữ liệu sẽ không thể khôi phục.
            </Typography>
          </Stack>
          <Button variant="contained" onClick={() => setConfirmDelete(true)}
            sx={{ bgcolor: "#b4463c", borderRadius: 2, textTransform: "none", fontWeight: 700, py: 1, whiteSpace: "nowrap", flexShrink: 0, "&:hover": { bgcolor: "#9b3530" } }}
          >Xóa tài khoản</Button>
        </Paper>
      </Box>

      <Footer />

      {/* Dialog xác nhận xóa */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Hủy</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Xác nhận xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export default OrdProfile;
