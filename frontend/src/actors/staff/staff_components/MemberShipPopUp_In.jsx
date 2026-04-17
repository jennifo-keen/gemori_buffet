import React, { useState } from 'react';

import FavoriteIcon      from "@mui/icons-material/Favorite";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import axiosInstance from '../staff_api/axiosInstance';

import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

export const MemberShipPopUp_In = ({ onSuccess, onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!customerName.trim() || !phoneNumber.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await axiosInstance.post('/customers', {
        full_name: customerName,
        phone: phoneNumber,
        email: `${phoneNumber}@gemori.vn`, 
      });
      onSuccess?.(res.data);
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderColor: "rgba(177, 65, 53, 0.05)",
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <FavoriteIcon sx={{ color: "#c0392b", width: 24, height: 24 }} />
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="slate.900"
            sx={{ color: "#0f172a" }}
          >
            Khách hàng thân thiết
          </Typography>
        </Stack>

        {/* Subtitle */}
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Khách hàng chưa đăng ký thành viên?
          </Typography>

          {/* Input Card */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#f8f6f6",
              borderRadius: 3,
              border: "1px solid rgba(177, 65, 53, 0.1)",
            }}
          >
            <Stack spacing={1.5}>
              {/* Customer Name Field */}
              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#0f172a" }}
                >
                  Tên khách hàng
                </Typography>
                <TextField
                  variant="standard"
                  placeholder="Nhập họ tên..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    style: { color: "#94a3b8", fontSize: 14, padding: "2px 0" },
                  }}
                  sx={{ "& .MuiInputBase-root": { bgcolor: "transparent" } }}
                />
              </Stack>

              <Divider sx={{ borderColor: "rgba(177, 65, 53, 0.1)" }} />

              {/* Phone Number Field */}
              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#0f172a" }}
                >
                  Số điện thoại
                </Typography>
                <TextField
                  variant="standard"
                  placeholder="Nhập số điện thoại..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    style: { color: "#94a3b8", fontSize: 14, padding: "2px 0" },
                  }}
                  sx={{ "& .MuiInputBase-root": { bgcolor: "transparent" } }}
                />
              </Stack>
            </Stack>
          </Box>
            {/* Lỗi */}
          {error && (
            <Typography variant="body2" sx={{ color: "#b4463c", fontSize: 13 }}>
              {error}
            </Typography>
          )}

        </Stack>

        {/* Submit Button */}
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PersonAddAlt1Icon />}
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: "#b4463c",
            borderRadius: 3,
            py: 2,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#9e3b32",
            },
          }}
        >
          {loading ? 'Đang thêm...' : 'Thêm khách hàng mới'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default MemberShipPopUp_In;