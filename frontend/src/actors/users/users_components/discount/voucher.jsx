import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

export const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/vouchers/active");
        setVouchers(res.data.data || []);
      } catch (error) {
        console.error("Lỗi lấy voucher:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const filteredVouchers = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return vouchers;

    return vouchers.filter((voucher) =>
      String(voucher.code || "").toLowerCase().includes(keyword)
    );
  }, [search, vouchers]);

  const formatDiscountTitle = (voucher) => {
    if (voucher.discount_type === "percent") {
      return `Giảm ${voucher.discount_value}% tổng hóa đơn`;
    }

    if (voucher.discount_type === "fixed") {
      return `Giảm ${Number(voucher.discount_value).toLocaleString("vi-VN")}đ tổng hóa đơn`;
    }

    return `Giảm ${voucher.discount_value}`;
  };

  const formatLeftValue = (voucher) => {
    if (voucher.discount_type === "percent") {
      return `GIẢM ${voucher.discount_value}%`;
    }

    return `GIẢM ${voucher.discount_value}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không giới hạn";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: "0px 0px 0px 20px",
        p: { xs: 2, md: 3 },
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
        spacing={2}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "26px", md: "32px" },
              fontWeight: 700,
              color: "#18243D",
              lineHeight: 1.2,
            }}
          >
            Kho voucher
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: { xs: "14px", md: "16px" },
              color: "#7A86A1",
              lineHeight: 1.5,
            }}
          >
            Quản lý thông tin tài khoản và bảo mật của bạn
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", lg: "360px" },
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F3E7E5",
            borderRadius: "999px",
            p: "6px",
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="Tìm kiếm voucher ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#7A86A1", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              px: 1,
              "& .MuiInputBase-input": {
                fontSize: "15px",
                color: "#667085",
              },
            }}
          />

          <Button
            sx={{
              minWidth: "62px",
              height: "38px",
              borderRadius: "999px",
              backgroundColor: "#BF4B3D",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "15px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#AA4034",
                boxShadow: "none",
              },
            }}
          >
            Tìm
          </Button>
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={4}
        sx={{
          mt: 4,
          borderBottom: "1px solid #E9D9D4",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            pb: 1.5,
            borderBottom: "3px solid #BF4B3D",
          }}
        >
          <CheckCircleOutlineIcon sx={{ color: "#BF4B3D", fontSize: 18 }} />
          <Typography
            sx={{
              color: "#BF4B3D",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            Đang hiệu lực ({filteredVouchers.length})
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ pb: 1.5 }}>
          <HistoryIcon sx={{ color: "#7A86A1", fontSize: 18 }} />
          <Typography
            sx={{
              color: "#7A86A1",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Đã dùng (12)
          </Typography>
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "1fr 1fr",
            },
            gap: 2.5,
          }}
        >
          {filteredVouchers.map((voucher) => (
            <Box
              key={voucher.id}
              sx={{
                display: "flex",
                minHeight: "180px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(16, 24, 40, 0.08)",
              }}
            >
              <Box
                sx={{
                  width: "128px",
                  backgroundColor: "#29C85A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: "-9px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: "-9px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                  }}
                />

                <Stack spacing={1} alignItems="center">
                  <ConfirmationNumberOutlinedIcon
                    sx={{ color: "#fff", fontSize: 34 }}
                  />
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "12px",
                      lineHeight: 1.1,
                      textAlign: "center",
                    }}
                  >
                    {formatLeftValue(voucher)}
                  </Typography>
                </Stack>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  p: 2.25,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        backgroundColor: "#E4EAF3",
                        borderRadius: "6px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#58657E",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        Member Only
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#96A3BB",
                        fontWeight: 500,
                      }}
                    >
                      Mã: {voucher.code}
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 1.2,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#18243D",
                      lineHeight: 1.45,
                    }}
                  >
                    {formatDiscountTitle(voucher)}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={0.8}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 15, color: "#72809A" }} />
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#72809A",
                        lineHeight: 1.4,
                      }}
                    >
                      Hết hạn: {formatDate(voucher.end_date)}
                    </Typography>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    pt: 1.75,
                    borderTop: "1px solid #ECECEC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#4E5B73",
                    }}
                  >
                    Còn lại: {voucher.quantity}
                  </Typography>

                  <Button
                    sx={{
                      minWidth: "96px",
                      height: "38px",
                      px: 2.5,
                      backgroundColor: "#BF4B3D",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "15px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#AA4034",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Dùng ngay
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};