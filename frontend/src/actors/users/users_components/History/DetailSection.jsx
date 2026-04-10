import React, { useEffect, useMemo, useState } from "react";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const formatCurrency = (value) => {
  if (value == null) return "--";
  return new Intl.NumberFormat("vi-VN").format(Number(value)) + " đ";
};

const formatDateTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const mapPaymentMethod = (method) => {
  if (!method) return "Chưa có thông tin";
  const map = {
    cash: "Thanh toán bằng tiền mặt",
    momo: "Thanh toán qua MoMo",
    card: "Thanh toán bằng thẻ",
    banking: "Chuyển khoản ngân hàng",
  };
  return map[method.toLowerCase()] || method;
};

const mapStatus = (status) => {
  if (!status) return "Chưa cập nhật";
  const map = {
    paid: "Đã thanh toán",
    pending: "Chờ thanh toán",
    failed: "Thanh toán thất bại",
    refunded: "Đã hoàn tiền",
  };
  return map[status.toLowerCase()] || status;
};

export const DetailsSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const orderId = searchParams.get("orderId");

  // chỉnh lại đoạn này theo dữ liệu login hiện tại của bạn
  const customerId = useMemo(() => {
    return (
      localStorage.getItem("customerId") ||
      JSON.parse(localStorage.getItem("customer") || "{}")?.id ||
      JSON.parse(localStorage.getItem("user") || "{}")?.id ||
      ""
    );
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!customerId || !orderId) {
        setLoading(false);
        setError("Thiếu customerId hoặc orderId.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/history/${customerId}/${orderId}`
        );
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Không thể tải chi tiết hóa đơn");
        }

        setData(result.data);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải chi tiết hóa đơn");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [customerId, orderId]);

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "12px",
          border: "1px solid rgba(177, 65, 53, 0.1)",
        }}
      >
        <Stack alignItems="center" justifyContent="center" py={8}>
          <CircularProgress />
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "12px",
          border: "1px solid rgba(177, 65, 53, 0.1)",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  if (!data?.order) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "12px",
          border: "1px solid rgba(177, 65, 53, 0.1)",
        }}
      >
        <Alert severity="info">Không có dữ liệu hóa đơn.</Alert>
      </Paper>
    );
  }

  const { order, buffetLine, extraItems } = data;
  const displayTime = order.paid_at || order.order_time;
  const invoiceCode = `#${String(order.id).slice(0, 8).toUpperCase()}`;

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: "12px",
        border: "1px solid rgba(177, 65, 53, 0.1)",
        flex: 1,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <ArrowBackIcon
          onClick={() => navigate("/history")}
          sx={{
            width: 34,
            height: 34,
            color: "text.primary",
            cursor: "pointer",
          }}
        />
        <Typography variant="h5" color="text.primary">
          Chi tiết hóa đơn
        </Typography>
      </Stack>

      <Stack spacing={4}>
        <Box
          sx={{
            borderLeft: "4px solid #b4463c",
            pl: 2,
            py: 0.5,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Stack spacing={0.5} alignItems="flex-start">
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "16px",
                color: "#b4463c",
              }}
            >
              Hóa đơn điện tử
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: "48px",
                color: "text.primary",
                whiteSpace: "nowrap",
              }}
            >
              {invoiceCode}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarTodayIcon
                sx={{ width: 12, height: 12, color: "text.secondary" }}
              />
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "22px",
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                {order.paid_at ? "Thanh toán lúc " : "Tạo đơn lúc "}
                {formatDateTime(displayTime)}
              </Typography>
            </Stack>

            {order.table_code && (
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "22px",
                  color: "text.secondary",
                }}
              >
                Bàn: {order.table_code}
              </Typography>
            )}
          </Stack>

          <Chip
            label={`Trạng thái: ${mapStatus(order.payment_status || order.status)}`}
            sx={{
              bgcolor: "rgba(177, 65, 53, 0.1)",
              color: "#b4463c",
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "16px",
              borderRadius: "8px",
              height: "auto",
              px: 0.5,
              py: 0.5,
              "& .MuiChip-label": {
                px: 1,
                py: 0.5,
              },
            }}
          />
        </Box>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderColor: "#b4463c",
            borderRadius: "12px",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#b4463c",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <WalletIcon sx={{ width: 32, height: 32, color: "white" }} />
            </Box>

            <Stack spacing={0}>
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: "20px",
                  color: "#b4463c",
                }}
              >
                Thanh toán
              </Typography>

              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "26px",
                  color: "text.primary",
                }}
              >
                {mapPaymentMethod(order.payment_method)}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {buffetLine && (
          <Paper
            variant="outlined"
            sx={{
              borderColor: "#b4463c",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ bgcolor: "#b4463c", px: 3, py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <RestaurantIcon sx={{ width: 24, height: 24, color: "white" }} />
                <Typography
                  sx={{
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: "white",
                  }}
                >
                  Chi tiết gói buffet
                </Typography>
              </Stack>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={headSx}>Món ăn/Gói</TableCell>
                    <TableCell align="center" sx={headSx}>SL</TableCell>
                    <TableCell align="right" sx={headSx}>Đơn giá</TableCell>
                    <TableCell align="right" sx={headSx}>Thành tiền</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell sx={bodyNameSx}>{buffetLine.name}</TableCell>
                    <TableCell align="center" sx={bodyValueSx}>
                      {buffetLine.quantity}
                    </TableCell>
                    <TableCell align="right" sx={bodyValueSx}>
                      {formatCurrency(buffetLine.unit_price)}
                    </TableCell>
                    <TableCell align="right" sx={bodyStrongSx}>
                      {formatCurrency(buffetLine.line_total)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4} sx={{ p: 0, border: "none" }}>
                      <Divider sx={{ borderColor: "#b4463c" }} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "18px",
                        fontWeight: 700,
                        lineHeight: "26px",
                        color: "text.primary",
                        border: "none",
                        pt: 1.5,
                        pb: 2,
                      }}
                    >
                      Tổng thanh toán
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "24px",
                        fontWeight: 700,
                        lineHeight: "32px",
                        color: "#b4463c",
                        border: "none",
                        pt: 1.5,
                        pb: 2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatCurrency(order.total_amount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {extraItems?.length > 0 && (
          <Paper
            variant="outlined"
            sx={{
              borderColor: "#b4463c",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ bgcolor: "#f8fafc", px: 3, py: 2 }}>
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#0f172a",
                }}
              >
                Món đã gọi
              </Typography>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={headSx}>Tên món</TableCell>
                    <TableCell align="center" sx={headSx}>SL</TableCell>
                    <TableCell align="center" sx={headSx}>Trạng thái</TableCell>
                    <TableCell align="right" sx={headSx}>Thời gian gọi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {extraItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={bodyNameSx}>
                        {item.menu_name || "Món không xác định"}
                      </TableCell>
                      <TableCell align="center" sx={bodyValueSx}>
                        {item.quantity || 0}
                      </TableCell>
                      <TableCell align="center" sx={bodyValueSx}>
                        {item.status || "--"}
                      </TableCell>
                      <TableCell align="right" sx={bodyValueSx}>
                        {formatDateTime(item.item_order_time)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            pt: 3,
            borderTop: "1px solid #b4463c",
          }}
        >
          <Button
            onClick={() => navigate("/history")}
            variant="contained"
            fullWidth
            startIcon={<HistoryIcon />}
            sx={{
              bgcolor: "rgba(226, 232, 240, 1)",
              color: "text.primary",
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              borderRadius: "12px",
              height: 48,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "rgba(203, 213, 225, 1)",
                boxShadow: "none",
              },
            }}
          >
            Quay lại lịch sử
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

const headSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica',
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "20px",
  color: "text.secondary",
  borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
};

const bodyNameSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica',
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  color: "text.primary",
  borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
};

const bodyValueSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica',
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "text.primary",
  borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
};

const bodyStrongSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica',
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "24px",
  color: "text.primary",
  borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
};

export default DetailsSection;