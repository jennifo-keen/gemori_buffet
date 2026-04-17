import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import { useOrder } from '../order_context/OrderContext';

import { customerLogin } from '../order_api/customerApi';

import HeaderLogin from "../order_component/HeaderLogin"
import Footer      from "../order_component/Footer"

import PasswordIcon              from "@mui/icons-material/Password";
import PhoneIcon                 from "@mui/icons-material/PhoneAndroid";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const LoginLayout = () => {
  const navigate = useNavigate();
  const { loginCustomer, tableCode } = useOrder();
  

  const [phone, setPhone]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      setError('Vui lòng nhập số điện thoại và mật khẩu');
      return;
    }
    try {
      setLoading(true);
      setError('');

      if (loginCustomer) {
        await loginCustomer(phone, password);
      } else {
        const res = await customerLogin(phone, password);
        localStorage.setItem('customer_token', res.data.token);
        localStorage.setItem('customer_info', JSON.stringify(res.data.customer));
      }
      navigate(`/order/${tableCode}/menu`);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: "white",
        borderRadius: 4,
        border: "1px solid rgba(177, 65, 53, 0.05)",
        width: "100%",
      }}
    >
      <HeaderLogin/>

      {/* Header section */}
      <Stack alignItems="center" spacing={1}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
        >
          Chào mừng trở lại
        </Typography>
        <Typography
          color="#979797"
          textAlign="center"
          sx={{ 
          fontSize: 14,
          maxWidth: 342 }}
        >
          Đăng nhập để nhận ưu đãi buffet đặc quyền dành
          <br />
          riêng cho thành viên
        </Typography>
      </Stack>

      {/* Form fields */}
      <Stack spacing={2.5} sx={{px:3}}>

        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

        {/* Phone number field */}
        <Stack spacing={0.5}>
          <Typography variant="body2" fontWeight={600} color="grey.700">
            Số điện thoại
          </Typography>
          <TextField
            fullWidth
            placeholder="Số điện thoại"
            variant="outlined"
             value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: "grey.400", fontSize: 22 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "white",
                "& fieldset": {
                  borderColor: "grey.200",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "grey.400",
                opacity: 1,
              },
            }}
          />
        </Stack>

        {/* Password field */}
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" fontWeight={600} color="grey.700">
              Mật khẩu
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{ color: "#b4463c", fontWeight: 700, fontSize: "0.75rem" }}
            >
              Quên mật khẩu?
            </Link>
          </Stack>
          <TextField
            fullWidth
            placeholder="Mật khẩu"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon sx={{ color: "grey.400", fontSize: 22 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityOffOutlinedIcon
                    sx={{ color: "grey.400", fontSize: 22 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "white",
                "& fieldset": {
                  borderColor: "grey.200",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "grey.400",
                opacity: 1,
              },
            }}
          />
        </Stack>

        {/* Login button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            bgcolor: "#a21a16",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            py: 2,
            borderRadius: 3,
            textTransform: "none",
            boxShadow:
              "0px 4px 6px -4px rgba(177,65,53,0.2), 0px 10px 15px -3px rgba(177,65,53,0.2)",
            "&:hover": {
              bgcolor: "#8b1612",
            },
          }}
        >
           {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập ngay'}
        </Button>

      </Stack>

      {/* Footer section */}
      <Box sx={{ borderTop: "1px solid", borderColor: "grey.100", pt: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          sx={{ px: 1}}
        >
          <Typography variant="body2" color="grey.600">
            Chưa có tài khoản thành viên?
          </Typography>
          <Link
            href="#"
            underline="none"
            onClick={() => navigate(`/order/${tableCode}/register`)}
            sx={{ color: "#b4463c", fontWeight: 700, fontSize: "0.875rem" }}
          >
            Đăng ký thành viên
          </Link>
        </Stack>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default LoginLayout;