import React, { useEffect, useMemo, useState } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const comboBadgeStyles = {
  default: { backgroundColor: "#e2e8f0", color: "#334155" },
  "299": { backgroundColor: "#e2e8f0", color: "#334155" },
  "399": { backgroundColor: "#fff1b9", color: "#c2863d" },
  "499": { backgroundColor: "#b141351a", color: "#b4463c" },
};

const formatCurrency = (value) => {
  if (value == null) return "--";
  return new Intl.NumberFormat("vi-VN").format(Number(value)) + "đ";
};

const formatDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  return date.toLocaleDateString("vi-VN");
};

const formatTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getComboType = (buffetName = "") => {
  if (buffetName.includes("299")) return "299";
  if (buffetName.includes("399")) return "399";
  if (buffetName.includes("499")) return "499";
  return "default";
};

export const HistoryTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // chỉnh lại đoạn này theo dữ liệu login hiện tại của bạn
  const customerId = useMemo(() => {
    return (
      localStorage.getItem("customerId") ||
      JSON.parse(localStorage.getItem("customer") || "{}")?.id ||
      JSON.parse(localStorage.getItem("user") || "{}")?.id ||
      ""
    );
  }, []);

  const fetchHistory = async (page = 1) => {
    if (!customerId) {
      setLoading(false);
      setError("Không tìm thấy customerId. Hãy lưu customerId sau khi đăng nhập.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/history/${customerId}?page=${page}&limit=${pagination.limit}`
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể tải lịch sử hóa đơn");
      }

      setRows(result.data || []);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải lịch sử hóa đơn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, [customerId]);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchHistory(page);
  };

  return (
    <Stack spacing={4} width="100%">
      <Box>
        <Button
          variant="outlined"
          startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: "14px" }} />}
          sx={{
            borderColor: "#e5e7eb",
            color: "#0f172a",
            fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "22px",
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 1,
            "&:hover": {
              borderColor: "#d1d5db",
              backgroundColor: "transparent",
            },
          }}
        >
          Lịch sử dùng bữa
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0px 1px 2px #0000000d",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e2e8f0" }}>
              <TableCell sx={headCellSx}>Ngày dùng bữa</TableCell>
              <TableCell align="center" sx={headCellSx}>
                Gói Buffet
              </TableCell>
              <TableCell align="right" sx={headCellSx}>
                Tổng tiền
              </TableCell>
              <TableCell align="center" sx={headCellSx}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <Typography>Chưa có hóa đơn nào</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const comboType = getComboType(row.buffet_name);
                const badgeStyle = comboBadgeStyles[comboType] || comboBadgeStyles.default;
                const usedTime = row.paid_at || row.order_time;

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:not(:last-child) td": {
                        borderBottom: "1px solid #e5e7eb",
                      },
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell sx={{ py: 2.5, px: 3, borderBottom: "none" }}>
                      <Stack spacing={0}>
                        <Typography sx={dateTextSx}>
                          {formatDate(usedTime)}
                        </Typography>
                        <Typography sx={timeTextSx}>
                          {formatTime(usedTime)}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="center" sx={{ py: 3, px: 3, borderBottom: "none" }}>
                      <Chip
                        label={row.buffet_name || "Không có gói"}
                        size="small"
                        sx={{
                          backgroundColor: badgeStyle.backgroundColor,
                          color: badgeStyle.color,
                          fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                          fontSize: "12px",
                          fontWeight: 700,
                          lineHeight: "20px",
                          borderRadius: "999px",
                          height: "auto",
                          px: 0.5,
                          py: 0.25,
                          "& .MuiChip-label": {
                            px: 1.5,
                            py: 0.25,
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: "none" }}>
                      <Typography sx={totalTextSx}>
                        {formatCurrency(row.total_amount)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center" sx={{ py: 3, px: 3, borderBottom: "none" }}>
                      <Button
                        variant="text"
                        disableRipple
                        onClick={() =>
                          navigate(`/history/detail?orderId=${row.id}`)
                        }
                        sx={{
                          fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                          fontSize: "14px",
                          fontWeight: 700,
                          lineHeight: "16px",
                          color: "#b4463c",
                          textTransform: "none",
                          p: 0,
                          minWidth: "auto",
                          "&:hover": {
                            backgroundColor: "transparent",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <Typography
          sx={{
            fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            color: "#914f3b",
            whiteSpace: "nowrap",
          }}
        >
          {pagination.total === 0
            ? "Không có dữ liệu"
            : `Hiển thị ${(pagination.page - 1) * pagination.limit + 1}-${Math.min(
                pagination.page * pagination.limit,
                pagination.total
              )} trên ${pagination.total} hóa đơn`}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            component="button"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            sx={pageButtonSx}
          >
            <ChevronLeftIcon sx={{ fontSize: "16px", color: "#0f172a" }} />
          </Box>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Box
              key={page}
              component="button"
              onClick={() => handlePageChange(page)}
              sx={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: page === pagination.page ? "none" : "1px solid #e5e7eb",
                borderRadius: "4px",
                backgroundColor: page === pagination.page ? "#b4463c" : "transparent",
                cursor: "pointer",
                padding: 0,
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "14px",
                fontWeight: page === pagination.page ? 700 : 400,
                lineHeight: "22px",
                color: page === pagination.page ? "#ffffff" : "#0f172a",
              }}
            >
              {page}
            </Box>
          ))}

          <Box
            component="button"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            sx={pageButtonSx}
          >
            <ChevronRightIcon sx={{ fontSize: "16px", color: "#0f172a" }} />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

const headCellSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "16px",
  color: "#0f172a",
  py: 2,
  px: 3,
  backgroundColor: "#e2e8f0",
};

const dateTextSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "22px",
  color: "#0f172a",
};

const timeTextSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#914f3b",
};

const totalTextSx = {
  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  color: "#0f172a",
  whiteSpace: "nowrap",
};

const pageButtonSx = {
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "4px",
  backgroundColor: "transparent",
  cursor: "pointer",
  padding: 0,
  "&:hover": { backgroundColor: "#f3f4f6" },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

export default HistoryTable;