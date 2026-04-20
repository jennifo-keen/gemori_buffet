import React, { useEffect, useMemo, useState } from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const BORDER_COLOR = "rgba(177, 65, 53, 0.1)";
const API_BASE_URL = "http://localhost:3000/api";

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) return "Chưa cập nhật";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Chưa cập nhật";
  return date.toLocaleDateString("vi-VN");
};

const fieldLabelSx = {
  fontSize: 13,
  color: "#9ca3af",
  mb: 1,
};

const fieldValueSx = {
  fontSize: { xs: 15, sm: 16 },
  fontWeight: 600,
  wordBreak: "break-word",
};

const fieldRowSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  gap: { xs: 2, sm: 3, md: 4 },
};

const fieldColSx = {
  width: { xs: "100%", sm: "50%" },
  minWidth: 0,
};

export const DetailsSection = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    "";

  const authHeaders = useMemo(() => {
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  }, [token]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.get(`${API_BASE_URL}/profile/me`, {
        headers: authHeaders,
      });

      const userData = response.data?.data;

      setProfile(userData);
      setFormData({
        fullName: userData?.fullName || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        dateOfBirth: formatDateForInput(userData?.dateOfBirth),
        address: userData?.address || "",
      });
    } catch (error) {
      console.error("Lỗi lấy profile:", error);
      setErrorMessage(
        error?.response?.data?.message || "Không thể tải thông tin hồ sơ"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSuccessMessage("");
    setErrorMessage("");

    setFormData({
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      dateOfBirth: formatDateForInput(profile?.dateOfBirth),
      address: profile?.address || "",
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth || null,
        address: formData.address,
      };

      const response = await axios.put(`${API_BASE_URL}/profile/me`, payload, {
        headers: authHeaders,
      });

      const updatedData = response.data?.data;

      setProfile((prev) => ({
        ...prev,
        ...updatedData,
      }));

      setFormData((prev) => ({
        ...prev,
        fullName: updatedData?.fullName || "",
        phone: updatedData?.phone || "",
        dateOfBirth: formatDateForInput(updatedData?.dateOfBirth),
        address: updatedData?.address || "",
      }));

      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        try {
          const parsedUser = JSON.parse(userStorage);
          parsedUser.fullName = updatedData?.fullName || parsedUser.fullName;
          localStorage.setItem("user", JSON.stringify(parsedUser));
        } catch (e) {
          console.error("Không cập nhật được localStorage user");
        }
      }

      setIsEditing(false);
      setSuccessMessage("Cập nhật hồ sơ thành công");
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      setErrorMessage(
        error?.response?.data?.message || "Cập nhật hồ sơ thất bại"
      );
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: "10px", sm: "12px" },
          border: `1px solid ${BORDER_COLOR}`,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 4 },
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          gap={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#1f2937",
                fontWeight: 700,
                fontSize: { xs: 22, sm: 24 },
              }}
            >
              Hồ sơ cá nhân
            </Typography>
            <Typography
              sx={{
                color: "#6b7280",
                fontSize: { xs: 13, sm: 14 },
                mt: 0.5,
              }}
            >
              Quản lý thông tin tài khoản và bảo mật của bạn
            </Typography>
          </Box>

          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditOutlinedIcon sx={{ width: 18, height: 18 }} />}
              onClick={handleEdit}
              fullWidth={false}
              sx={{
                backgroundColor: "#b14135",
                px: 2,
                py: 1,
                borderRadius: "8px",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#99372d" },
              }}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Button
                variant="outlined"
                startIcon={<CloseOutlinedIcon />}
                onClick={handleCancel}
                disabled={saving}
                sx={{
                  borderRadius: "8px",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Hủy
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveOutlinedIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{
                  backgroundColor: "#b14135",
                  borderRadius: "8px",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { backgroundColor: "#99372d" },
                }}
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </Button>
            </Stack>
          )}
        </Stack>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* BOX 1 */}
          <Box sx={{ pb: 2, borderBottom: `1px solid ${BORDER_COLOR}` }}>
            <Box sx={fieldRowSx}>
              <Box sx={fieldColSx}>
                <Typography sx={fieldLabelSx}>Họ và tên</Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={formData.fullName}
                    onChange={handleChange("fullName")}
                  />
                ) : (
                  <Typography sx={fieldValueSx}>
                    {profile?.fullName || "Chưa cập nhật"}
                  </Typography>
                )}
              </Box>

              <Box sx={fieldColSx}>
                <Typography sx={fieldLabelSx}>Email</Typography>

                <Typography sx={fieldValueSx}>
                  {profile?.email || "Chưa cập nhật"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* BOX 2 */}
          <Box sx={{ pb: 2, borderBottom: `1px solid ${BORDER_COLOR}` }}>
            <Box sx={fieldRowSx}>
              <Box sx={fieldColSx}>
                <Typography sx={fieldLabelSx}>Số điện thoại</Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                  />
                ) : (
                  <Typography sx={fieldValueSx}>
                    {profile?.phone || "Chưa cập nhật"}
                  </Typography>
                )}
              </Box>

              <Box sx={fieldColSx}>
                <Typography sx={fieldLabelSx}>Ngày sinh</Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange("dateOfBirth")}
                    InputLabelProps={{ shrink: true }}
                  />
                ) : (
                  <Typography sx={fieldValueSx}>
                    {formatDateForDisplay(profile?.dateOfBirth)}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* BOX 3 */}
          <Box sx={{ pb: 2, borderBottom: `1px solid ${BORDER_COLOR}` }}>
            <Typography sx={fieldLabelSx}>Địa chỉ</Typography>

            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                multiline
                minRows={2}
                value={formData.address}
                onChange={handleChange("address")}
              />
            ) : (
              <Typography sx={fieldValueSx}>
                {profile?.address || "Chưa cập nhật"}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            pt: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#fff7f5",
              border: `1px solid ${BORDER_COLOR}`,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, color: "#374151", mb: 0.5 }}>
                Xóa tài khoản
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6b7280",
                  wordBreak: "break-word",
                }}
              >
                Một khi bạn xóa tài khoản, mọi dữ liệu sẽ không thể khôi phục.
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#b14135",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: "8px",
                width: { xs: "100%", sm: "auto" },
                flexShrink: 0,
                "&:hover": { backgroundColor: "#99372d" },
              }}
            >
              Xóa tài khoản
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DetailsSection;