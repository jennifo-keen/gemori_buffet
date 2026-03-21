import React, { useState } from "react";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const passwordFields = [
  {
    id: "currentPassword",
    label: "Mật khẩu hiện tại",
    placeholder: "Nhập mật khẩu hiện tại",
  },
  {
    id: "newPassword",
    label: "Mật khẩu mới",
    placeholder: "Nhập mật khẩu mới",
  },
  {
    id: "confirmPassword",
    label: "Xác nhận mật khẩu mới",
    placeholder: "Nhập lại mật khẩu mới",
  },
];

const securityRequirements = [
  "Mật khẩu phải có ít nhất 8 ký tự",
  "Bao gồm chữ hoa (A-Z) và chữ thường (a-z)",
  "Phải bao gồm ít nhất một chữ số (0-9)",
];

export const ChangePass = () => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        border: "1px solid rgba(177, 65, 53, 0.12)",
        
        borderRadius: 3,
        p: 4,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box mb={4}>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: "32px",
          }}
        >
          Thay đổi mật khẩu
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: "16px",
            fontWeight: 400,
            color: "#475569",
            lineHeight: "24px",
          }}
        >
          Thay đổi mật khẩu của bạn
        </Typography>
      </Box>

      {/* Form area */}
      <Box
        sx={{
          width: "100%",
          border: "1px solid rgba(177, 65, 53, 0.12)",
          borderRadius: "20px",
          p: 4,
          boxSizing: "border-box",
          
        }}
      >
        <Stack spacing={3}>
          {passwordFields.map((field) => (
            <Stack key={field.id} spacing={1}>
              <FormLabel
                htmlFor={field.id}
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#674242",
                }}
              >
                {field.label}
              </FormLabel>

              <TextField
                id={field.id}
                type={showPassword[field.id] ? "text" : "password"}
                placeholder={field.placeholder}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleVisibility(field.id)}
                        edge="end"
                      >
                        {showPassword[field.id] ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(177, 65, 53, 0.10)",
                    borderRadius: "8px",
                    height: 56,
                  },
                  
                  "& .MuiInputBase-input": {
                    fontSize: "16px",
                  },
                }}
              />
            </Stack>
          ))}

          {/* Security box */}
          <Box
            sx={{
              p: 3,
              bgcolor: "#fff4f2",
              borderRadius: "16px",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <InfoOutlined sx={{ color: "#b4463c", mt: "2px" }} />

              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#b4463c",
                    mb: 1,
                  }}
                >
                  Yêu cầu bảo mật:
                </Typography>

                <Stack spacing={0.5}>
                  {securityRequirements.map((req, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: "14px",
                        color: "#b4463c",
                        lineHeight: "22px",
                      }}
                    >
                      {req}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>

          {/* Button */}
          <Box display="flex" justifyContent="center" pt={1}>
            <Button
              variant="contained"
              sx={{
                width: 228,
                height: 48,
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "none",
                bgcolor: "#b4463c",
                "&:hover": {
                  bgcolor: "#9f3d34",
                },
              }}
            >
              Cập nhật mật khẩu
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChangePass;