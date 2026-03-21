import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
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
import { useState } from "react";

export const MainLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
        {/* Header section: logo, title, subtitle */}
        <Stack spacing={2.5} alignItems="center">
          {/* Logo */}
          <Box display="flex" justifyContent="center">
            <svg
              width="130"
              height="50"
              viewBox="0 0 130 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Gemori Logo"
            >
              {/* Fork icon */}
              <g transform="translate(0, 5)">
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="18"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="18"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="18"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 8 Q12 12 16 8"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="12"
                  x2="12"
                  y2="30"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Spoon */}
                <ellipse
                  cx="26"
                  cy="7"
                  rx="4"
                  ry="5.5"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  fill="none"
                />
                <line
                  x1="26"
                  y1="12.5"
                  x2="26"
                  y2="30"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              {/* Gemori text */}
              <text
                x="38"
                y="32"
                fontFamily='"Be Vietnam Pro", Helvetica, sans-serif'
                fontSize="22"
                fontWeight="600"
                fill="#1a1a1a"
                fontStyle="italic"
              >
                Gemori
              </text>
            </svg>
          </Box>

          {/* Title */}
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

          {/* Subtitle */}
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

        {/* Form fields */}
        <Stack spacing={2.5}>
          {/* Phone number field */}
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
              Số điện thoại
            </FormLabel>
            <OutlinedInput
              placeholder="Nguyễn Văn A"
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
                color: "rgba(148, 163, 184, 1)",
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
                  color: "rgba(148, 163, 184, 1)",
                },
              }}
            />
          </FormControl>

          {/* Password field */}
          <FormControl fullWidth>
            {/* Label row with "Quên mật khẩu?" */}
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
              type={showPassword ? "text" : "password"}
              placeholder="Nguyễn Văn A"
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
                color: "rgba(148, 163, 184, 1)",
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
                  color: "rgba(148, 163, 184, 1)",
                },
              }}
            />
          </FormControl>

          {/* Login button */}
          <Button
            variant="contained"
            fullWidth
            disableElevation
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
            }}
          >
            Đăng nhập ngay
          </Button>
        </Stack>

        {/* Footer: register link */}
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