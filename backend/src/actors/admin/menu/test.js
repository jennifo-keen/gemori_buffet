import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const BackgroundBorder = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: "1200px",
        width: "1200px",
        bgcolor: "background.paper",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Left panel - hero image with overlay */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(/manwah-heritage-culinary-art.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "727px",
        }}
      >
        {/* Gradient overlay */}
        <Stack
          justifyContent="flex-end"
          sx={{
            width: "100%",
            height: "100%",
            p: 6,
            background:
              "linear-gradient(0deg, rgba(162,26,22,1) 0%, rgba(177,65,53,0.1) 100%)",
          }}
        >
          {/* Heading */}
          <Box pb={2}>
            <Typography
              variant="h4"
              sx={{
                color: "common.white",
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "40px",
                letterSpacing: "0px",
              }}
            >
              Gìn giữ di sản,
              <br />
              Quản trị hiện đại.
            </Typography>
          </Box>
          {/* Subtitle */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "0px",
              maxWidth: "384px",
            }}
          >
            Truy cập hệ thống quản trị chuyên sâu dành cho
            <br />
            đội ngũ vận hành Manwah Heritage Group.
          </Typography>
        </Stack>
      </Box>
      {/* Right panel - login form */}
      <Stack
        justifyContent="center"
        alignItems="flex-start"
        sx={{ p: 8, height: "727px" }}
      >
        {/* Brand + headings */}
        <Box pb={5} width="100%">
          {/* Brand name */}
          <Box pb={3}>
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "32px",
                color: "primary.main",
                letterSpacing: "0px",
              }}
            >
              GEMORI
            </Typography>
          </Box>
          {/* Login title */}
          <Box pb={1}>
            <Typography
              sx={{
                fontFamily: '"Epilogue-Bold", Helvetica',
                fontWeight: 700,
                fontSize: "24px",
                letterSpacing: "-0.60px",
                lineHeight: "32px",
                color: "text.primary",
                whiteSpace: "nowrap",
              }}
            >
              Đăng nhập hệ thống
            </Typography>
          </Box>
          {/* Subtitle */}
          <Typography
            sx={{
              fontFamily: '"Epilogue-Regular", Helvetica',
              fontWeight: 400,
              fontSize: "14px",
              letterSpacing: "0px",
              lineHeight: "20px",
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
          >
            Vui lòng nhập thông tin để tiếp tục.
          </Typography>
        </Box>
        {/* Form fields */}
        <Box pb={2} width="100%">
          <Stack spacing={3} width="100%">
            {/* Username field */}
            <Stack spacing={1} width="100%">
              <Typography
                sx={{
                  fontFamily: '"Epilogue-Bold", Helvetica',
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "1px",
                  lineHeight: "15px",
                  color: "custom.textBrown",
                  whiteSpace: "nowrap",
                }}
              >
                TÀI KHOẢN
              </Typography>
              <OutlinedInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin_"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonOutlineIcon
                      sx={{ color: "custom.textBrown", width: 16, height: 16 }}
                    />
                  </InputAdornment>
                }
                sx={{
                  bgcolor: "rgba(177,65,53,0.05)",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& input": {
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "normal",
                    color: "rgba(90,64,60,0.4)",
                    py: "15px",
                    px: 0,
                  },
                  "& .MuiInputAdornment-root": { mr: 1 },
                }}
              />
            </Stack>
            {/* Password field */}
            <Stack spacing={1} width="100%">
              <Typography
                sx={{
                  fontFamily: '"Epilogue-Bold", Helvetica',
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "1px",
                  lineHeight: "15px",
                  color: "custom.textBrown",
                  whiteSpace: "nowrap",
                }}
              >
                MẬT KHẨU
              </Typography>
              <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      sx={{ color: "custom.textBrown", width: 16, height: 16 }}
                    />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      size="small"
                      sx={{ color: "custom.textBrown" }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon
                          sx={{ width: 16, height: 16 }}
                        />
                      ) : (
                        <VisibilityOutlinedIcon
                          sx={{ width: 16, height: 16 }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  bgcolor: "rgba(177,65,53,0.05)",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& input": {
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "rgba(90,64,60,0.4)",
                    py: "15px",
                    px: 0,
                  },
                  "& .MuiInputAdornment-root:first-of-type": { mr: 1 },
                }}
              />
            </Stack>
            {/* Remember me checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{
                    p: 0,
                    mr: 1,
                    width: 16,
                    height: 16,
                    borderRadius: "2px",
                    bgcolor: "rgba(138,0,0,0.05)",
                    border: "1px solid rgba(138,0,0,0.1)",
                    color: "transparent",
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                    "& .MuiSvgIcon-root": { fontSize: 14 },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: '"Epilogue-Regular", Helvetica',
                    fontWeight: 400,
                    fontSize: "14px",
                    letterSpacing: "0px",
                    lineHeight: "20px",
                    color: "custom.textBrown",
                  }}
                >
                  Ghi nhớ đăng nhập
                </Typography>
              }
              sx={{ m: 0, alignItems: "center" }}
            />
            {/* Login button */}
            <Button
              variant="contained"
              endIcon={<ExitToAppIcon sx={{ width: 16, height: 16 }} />}
              fullWidth
              sx={{
                bgcolor: "#6c0d0a",
                color: "common.white",
                borderRadius: "8px",
                py: 2,
                px: 3,
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0px",
                lineHeight: "16px",
                textTransform: "uppercase",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              ĐĂNG NHẬP
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default BackgroundBorder;