import React, { useState } from "react";
import axios from "axios";
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

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const ChangePass = () => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      api: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (!PASSWORD_REGEX.test(form.newPassword)) {
      newErrors.newPassword = "Mật khẩu chưa đủ mạnh";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setSuccess("");

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/password/change",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Lỗi server",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        minWidth: 0,
        bgcolor: "#fff",
        border: "1px solid rgba(177, 65, 53, 0.12)",
        borderRadius: 3,
        p: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box mb={{ xs: 3, md: 4 }} sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: { xs: 22, sm: 24 },
            fontWeight: 700,
            wordBreak: "break-word",
          }}
        >
          Thay đổi mật khẩu
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#475569",
            fontSize: { xs: 14, sm: 15 },
            wordBreak: "break-word",
          }}
        >
          Thay đổi mật khẩu của bạn
        </Typography>
      </Box>

      <Box
        sx={{
          border: "1px solid rgba(177, 65, 53, 0.12)",
          borderRadius: { xs: "14px", sm: "20px" },
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        <Stack spacing={{ xs: 2.5, sm: 3 }}>
          {passwordFields.map((field) => (
            <Stack key={field.id} spacing={1} sx={{ minWidth: 0 }}>
              <FormLabel
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#674242",
                }}
              >
                {field.label}
              </FormLabel>

              <TextField
                type={showPassword[field.id] ? "text" : "password"}
                placeholder={field.placeholder}
                value={form[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleVisibility(field.id)}>
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
                    minHeight: 56,
                  },
                }}
              />
            </Stack>
          ))}

          {errors.api && <Typography color="error">{errors.api}</Typography>}

          {success && <Typography color="green">{success}</Typography>}

          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              bgcolor: "#fff4f2",
              borderRadius: "16px",
              minWidth: 0,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1.5 }}
              alignItems={{ xs: "flex-start", sm: "flex-start" }}
              sx={{ minWidth: 0 }}
            >
              <InfoOutlined sx={{ color: "#b4463c", flexShrink: 0 }} />

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  fontWeight={700}
                  color="#b4463c"
                  sx={{ wordBreak: "break-word", mb: 0.5 }}
                >
                  Yêu cầu bảo mật:
                </Typography>

                {securityRequirements.map((req, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: 14,
                      color: "#b4463c",
                      lineHeight: 1.7,
                      wordBreak: "break-word",
                    }}
                  >
                    {req}
                  </Typography>
                ))}
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                width: { xs: "100%", sm: 228 },
                minHeight: 48,
                borderRadius: "8px",
                bgcolor: "#b4463c",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#9e3c33",
                },
              }}
            >
              {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChangePass;