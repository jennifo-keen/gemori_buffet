import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStaff from '../staff_hook/useAuthStaff';
import Logo1 from "../../../assets/img/Logo 1.png";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

const GemoriLogo = () => (
  <Stack direction="row" alignItems="center" spacing={0.5}>
    <Box
      component="img"
      src={Logo1}
      alt="Logo"
      sx={{
        width: 130,
        height: "49px",
        filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)"
      }}
    />
  </Stack>
);

const StaffLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginStaff } = useAuthStaff();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 LOGIC "LỌT KHE": Tự động vào thẳng nếu đã có token Admin
  useEffect(() => {
    const adminToken = localStorage.getItem('token');
    const adminUser = localStorage.getItem('user');

    if (adminToken && adminUser) {
      // Lấy các tham số tableId, tableCode từ URL (nếu có)
      const params = new URLSearchParams(location.search);
      const tableId = params.get('tableId');
      const tableCode = params.get('tableCode');

      if (tableId && tableCode) {
        // Nếu đi từ trang sơ đồ bàn sang -> Vào thẳng Checkout
        navigate(`/staff/checkout?tableId=${tableId}&tableCode=${tableCode}`, { replace: true });
      } else {
        // Nếu vào trang login bình thường mà đã có token admin -> Vào trang chính Staff
        navigate('/staff', { replace: true });
      }
    }
  }, [navigate, location]);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await loginStaff(username, password);

      if (location.pathname.includes('/kitchen')) {
        navigate('/kitchen');
      } else {
        navigate('/staff');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header */}
      <Box component="header" sx={{ bgcolor: "white", boxShadow: "0px 1px 4px rgba(0,0,0,0.08)", px: 4, py: 2 }}>
        <GemoriLogo />
      </Box>

      {/* Main */}
      <Box component="main" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", px: 5, py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            display: "flex", flexDirection: "column", alignItems: "stretch",
            gap: 3, p: 5, borderRadius: 4,
            border: "1px solid rgba(177, 65, 53, 0.05)",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            width: "100%", maxWidth: 440, bgcolor: "white",
          }}
        >
          <Stack alignItems="center" spacing={2.5}>
            <GemoriLogo />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "#0f172a", textAlign: "center", fontSize: "1.375rem" }}>
              Chào mừng trở lại
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", textAlign: "center", lineHeight: 1.6, px: 1 }}>
              Đăng nhập để truy cập trang dành cho nhân viên.
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2.5}>
            <Stack spacing={0.875}>
              <Typography component="label" htmlFor="username-input" sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#334155" }}>
                Tài khoản
              </Typography>
              <TextField
                id="username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tài khoản"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: "#94a3b8", fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2, bgcolor: "white",
                    "& fieldset": { borderColor: "#e2e8f0" },
                    "&:hover fieldset": { borderColor: "#cbd5e1" },
                  },
                  "& .MuiInputBase-input": { color: "#0f172a", fontSize: "0.9375rem", py: 1.75 },
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" px={0.125}>
                <Typography component="label" htmlFor="password-input" sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#334155" }}>
                  Mật khẩu
                </Typography>
                <Link href="#" underline="none" sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#b4463c", cursor: "pointer" }}>
                  Quên mật khẩu?
                </Link>
              </Stack>
              <TextField
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập mật khẩu"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "#94a3b8", fontSize: 22 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end" size="small">
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2, bgcolor: "white",
                    "& fieldset": { borderColor: "#e2e8f0" },
                    "&:hover fieldset": { borderColor: "#cbd5e1" },
                  },
                  "& .MuiInputBase-input": { color: "#0f172a", fontSize: "0.9375rem", py: 1.75 },
                }}
              />
            </Stack>

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              sx={{
                bgcolor: "#b4463c", color: "white", fontWeight: 700,
                fontSize: "1rem", py: 1.75, borderRadius: 3, textTransform: "none",
                "&:hover": { bgcolor: "#9e3b32" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập ngay'}
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, p: 3 }}>
        <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
          © 2026 Gemori Buffet. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default StaffLogin;