import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import logo from "../../../../assets/img/Logo 1.png";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MainLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      setError("");

      if (!email.trim() || !password.trim()) {
        setError("Vui lòng nhập đầy đủ email và mật khẩu");
        return;
      }

      setLoading(true);

      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError("Không thể kết nối đến máy chủ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={10}
      py={12}
      sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: "40px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid rgba(180, 70, 60, 0.05)",
          boxShadow: "0px 1px 2px #0000000d",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Box display="flex" justifyContent="center">
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: 130,
                height: "49.01px",
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: "40px",
              letterSpacing: "0px",
              color: "rgba(15, 23, 42, 1)",
              textAlign: "center",
            }}
          >
            Chào mừng trở lại
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              letterSpacing: "0px",
              color: "rgba(100, 116, 139, 1)",
              textAlign: "center",
              px: 1,
            }}
          >
            Đăng nhập để nhận ưu đãi buffet đặc quyền dành
            <br />
            riêng cho thành viên
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          {error && <Alert severity="error">{error}</Alert>}

          <FormControl fullWidth>
            <FormLabel
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "22px",
                color: "rgba(51, 65, 85, 1)",
                mb: "7px",
                "&.Mui-focused": { color: "rgba(51, 65, 85, 1)" },
              }}
            >
              Email
            </FormLabel>
            <OutlinedInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập email của bạn"
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlineIcon
                    sx={{
                      width: 22,
                      height: 22,
                      color: "rgba(148, 163, 184, 1)",
                    }}
                  />
                </InputAdornment>
              }
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "rgba(15, 23, 42, 1)",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(226, 232, 240, 1)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(203, 213, 225, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(180, 70, 60, 1)",
                },
                "& input::placeholder": {
                  color: "rgba(148, 163, 184, 1)",
                  opacity: 1,
                },
                "& .MuiInputAdornment-root": {
                  mr: 1.5,
                },
                px: 2,
                py: 0,
              }}
              inputProps={{
                style: {
                  padding: "14px 0",
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(15, 23, 42, 1)",
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: "8px", px: "4px" }}
            >
              <FormLabel
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "22px",
                  color: "rgba(51, 65, 85, 1)",
                  "&.Mui-focused": { color: "rgba(51, 65, 85, 1)" },
                }}
              >
                Mật khẩu
              </FormLabel>
              <Link
                href="#"
                underline="none"
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: "20px",
                  color: "rgba(180, 70, 60, 1)",
                  cursor: "pointer",
                }}
              >
                Quên mật khẩu?
              </Link>
            </Stack>

            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    sx={{
                      width: 22,
                      height: 22,
                      color: "rgba(148, 163, 184, 1)",
                    }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    size="small"
                    sx={{ color: "rgba(148, 163, 184, 1)", p: 0 }}
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon sx={{ width: 22, height: 22 }} />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        sx={{ width: 22, height: 22 }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "rgba(15, 23, 42, 1)",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(226, 232, 240, 1)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(203, 213, 225, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(180, 70, 60, 1)",
                },
                "& input::placeholder": {
                  color: "rgba(148, 163, 184, 1)",
                  opacity: 1,
                },
                "& .MuiInputAdornment-root": {
                  mr: 1.5,
                },
                px: 2,
                py: 0,
              }}
              inputProps={{
                style: {
                  padding: "14px 0",
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(15, 23, 42, 1)",
                },
              }}
            />
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            disableElevation
            onClick={handleLogin}
            disabled={loading}
            sx={{
              backgroundColor: "rgba(180, 70, 60, 1)",
              color: "#ffffff",
              fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              letterSpacing: "0px",
              borderRadius: "12px",
              py: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(160, 50, 40, 1)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(180, 70, 60, 0.6)",
                color: "#ffffff",
              },
            }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập ngay"}
          </Button>
        </Stack>

        <Box sx={{ borderTop: "1px solid rgba(245, 245, 245, 1)", pt: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            sx={{ px: 1 }}
          >
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                color: "rgba(71, 85, 105, 1)",
                whiteSpace: "nowrap",
              }}
            >
              Chưa có tài khoản thành viên?
            </Typography>
            <Link
              href="/register"
              underline="none"
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "16px",
                color: "rgba(180, 70, 60, 1)",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Đăng ký thành viên
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLogin;