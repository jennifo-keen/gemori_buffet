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

    // clear lỗi khi user nhập lại
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

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

      // reset form
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
        width: "100%",
        bgcolor: "#fff",
        border: "1px solid rgba(177, 65, 53, 0.12)",
        borderRadius: 3,
        p: 4,
      }}
    >
      {/* Header */}
      <Box mb={4}>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Thay đổi mật khẩu
        </Typography>
        <Typography sx={{ mt: 0.5, color: "#475569" }}>
          Thay đổi mật khẩu của bạn
        </Typography>
      </Box>

      {/* Form */}
      <Box
        sx={{
          border: "1px solid rgba(177, 65, 53, 0.12)",
          borderRadius: "20px",
          p: 4,
        }}
      >
        <Stack spacing={3}>
          {passwordFields.map((field) => (
            <Stack key={field.id} spacing={1}>
              <FormLabel
                sx={{
                  fontSize: "14px",   // 👈 chỉnh ở đây
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
                      <IconButton
                        onClick={() => toggleVisibility(field.id)}
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
                }}
              />
            </Stack>
          ))}

          {/* Error API */}
          {errors.api && (
            <Typography color="error">{errors.api}</Typography>
          )}

          {/* Success */}
          {success && (
            <Typography color="green">{success}</Typography>
          )}

          {/* Security */}
          <Box sx={{ p: 3, bgcolor: "#fff4f2", borderRadius: "16px" }}>
            <Stack direction="row" spacing={1.5}>
              <InfoOutlined sx={{ color: "#b4463c" }} />
              <Box>
                <Typography fontWeight={700} color="#b4463c">
                  Yêu cầu bảo mật:
                </Typography>
                {securityRequirements.map((req, i) => (
                  <Typography key={i} fontSize={14} color="#b4463c">
                    {req}
                  </Typography>
                ))}
              </Box>
            </Stack>
          </Box>

          {/* Button */}
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                width: 228,
                height: 48,
                borderRadius: "8px",
                bgcolor: "#b4463c",
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