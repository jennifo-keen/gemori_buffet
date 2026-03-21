import React from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Paper,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const genderOptions = [
  { value: "nam", label: "Nam" },
  { value: "nu", label: "Nữ" },
  { value: "khac", label: "Khác" },
];

export const MainRegister = () => {
  const [gender, setGender] = useState("");
  const [agreed, setAgreed] = useState(false);

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#fff",
      "& fieldset": {
        borderColor: "rgba(226, 232, 240, 1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(203, 213, 225, 1)",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      color: "rgba(148, 163, 184, 1)",
      fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
      padding: "14px 0",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(148, 163, 184, 1)",
      opacity: 1,
    },
  };

  const labelSx = {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "22px",
    color: "rgba(51, 65, 85, 1)",
    fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
    mb: 0.5,
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        px: 2,
        py: 5,
        width: "100%",
        backgroundColor: "rgba(245, 245, 245, 1)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          width: "100%",
          p: 5,
          borderRadius: "12px",
          border: "1px solid rgba(177, 65, 53, 0.05)",
          boxShadow: "0px 1px 2px #0000000d",
          backgroundColor: "#fff",
        }}
      >
        {/* Header */}
        <Box pb={4}>
          <Stack spacing={1}>
            <Typography
              variant="h4"
              sx={{
                color: "rgba(15, 23, 42, 1)",
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
              }}
            >
              Đăng ký hội viên
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(100, 116, 139, 1)",
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Trở thành một phần của cộng đồng Gemori và nhận các ưu đãi
              <br />
              đặc quyền.
            </Typography>
          </Stack>
        </Box>

        {/* Form Fields */}
        <Box pb={2}>
          <Stack spacing={2.5}>
            {/* Full Name */}
            <Box>
              <Typography sx={labelSx}>Họ và tên</Typography>
              <TextField
                fullWidth
                placeholder="Nguyễn Văn A"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon
                        sx={{ color: "rgba(100, 116, 139, 1)", fontSize: 22 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />
            </Box>
            {/* Email & Phone */}
            <Stack direction="row" spacing={2.5}>
              <Box flex={1}>
                <Typography sx={labelSx}>Email</Typography>
                <TextField
                  fullWidth
                  placeholder="example@gmail.com"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          sx={{ color: "rgba(100, 116, 139, 1)", fontSize: 22 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>
              <Box flex={1}>
                <Typography sx={labelSx}>Số điện thoại</Typography>
                <TextField
                  fullWidth
                  placeholder="09xx xxx xxx"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon
                          sx={{ color: "rgba(100, 116, 139, 1)", fontSize: 22 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>
            </Stack>

            {/* Date of Birth & Gender */}
            <Stack direction="row" spacing={2.5} alignItems="flex-start">
              <Box flex={1}>
                <Typography sx={labelSx}>Ngày tháng năm sinh</Typography>
                <TextField
                  fullWidth
                  placeholder="mm/dd/yyyy"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon
                          sx={{ color: "rgba(100, 116, 139, 1)", fontSize: 22 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ...inputSx,
                    "& .MuiInputBase-input": {
                      ...inputSx["& .MuiInputBase-input"],
                      color: "rgba(15, 23, 42, 1)",
                    },
                  }}
                />
              </Box>
              <Box flex={1}>
                <Typography sx={labelSx}>Giới tính</Typography>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ pt: 1.5, gap: 1 }}
                >
                  {genderOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "rgba(203, 213, 225, 1)",
                            "&.Mui-checked": {
                              color: "rgba(180, 70, 60, 1)",
                            },
                            p: 0.5,
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            color: "rgba(51, 65, 85, 1)",
                            fontFamily:
                              '"Be Vietnam Pro", Helvetica, sans-serif',
                          }}
                        >
                          {option.label}
                        </Typography>
                      }
                      sx={{ mr: 1, ml: 0 }}
                    />
                  ))}
                </RadioGroup>
              </Box>
            </Stack>

            {/* Password & Confirm Password */}
            <Stack direction="row" spacing={2.5}>
              <Box flex={1}>
                <Typography sx={labelSx}>Mật khẩu</Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="••••••••"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          sx={{ color: "rgba(100, 116, 139, 1)", fontSize: 22 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>
              <Box flex={1}>
                <Typography sx={labelSx}>Xác nhận mật khẩu</Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="••••••••"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          sx={{ color: "rgba(100, 116, 139, 1)", fontSize: 22 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>
            </Stack>

            {/* Terms & Conditions Checkbox */}
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={1.5}
              sx={{ py: "7px" }}
            >
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                size="small"
                sx={{
                  p: 0,
                  mt: "2px",
                  color: "rgba(203, 213, 225, 1)",
                  borderRadius: "4px",
                  "&.Mui-checked": {
                    color: "rgba(180, 70, 60, 1)",
                  },
                }}
              />
              <Typography
                component="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22.8px",
                  color: "rgba(71, 85, 105, 1)",
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                }}
              >
                Tôi đồng ý với các{" "}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 500,
                    color: "#b14135",
                    cursor: "pointer",
                    fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  }}
                >
                  Điều khoản dịch vụ
                </Box>{" "}
                và{" "}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 500,
                    color: "#b14135",
                    cursor: "pointer",
                    fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  }}
                >
                  Chính sách bảo mật
                </Box>{" "}
                của
                <br />
                Gemori.
              </Typography>
            </Stack>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#b4463c",
                borderRadius: "12px",
                py: 2,
                boxShadow:
                  "0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#a03d34",
                },
              }}
            >
              Tạo tài khoản ngay
            </Button>
          </Stack>
        </Box>

        {/* Login Link */}
        <Box pt={4}>
          <Typography
            align="center"
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              color: "rgba(100, 116, 139, 1)",
              fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
            }}
          >
            Bạn đã có tài khoản?{" "}
            <Link
              href="/login"
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
              Đăng nhập
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default MainRegister;