import React from "react";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import HistoryIcon from "@mui/icons-material/History";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
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

const serviceItems = [
  { name: "Buffet Gold", qty: 2, unitPrice: "499.000", total: "998.000" },
  { name: "Coca-Cola", qty: 2, unitPrice: "25.000", total: "50.000" },
  { name: "Khăn ướt", qty: 2, unitPrice: "5.000", total: "10.000" },
];

const summaryRows = [
  {
    label: "Tạm tính",
    value: "1.058.000 đ",
    color: "text.primary",
    isDiscount: false,
  },
  {
    label: "Giảm giá hội viên (10%)",
    value: "-105.800 đ",
    color: "success.main",
    isDiscount: true,
  },
  {
    label: "Thuế VAT (8%)",
    value: "+76.176 đ",
    color: "text.primary",
    isDiscount: false,
  },
  {
    label: "Phí dịch vụ (2%)",
    value: "+21.160 đ",
    color: "text.primary",
    isDiscount: false,
  },
];

export const    DetailsSection = () => {
    const navigate = useNavigate();
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
      {/* Header */}
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
        {/* Invoice Info */}
        <Box
          sx={{
            borderLeft: "4px solid #b4463c",
            pl: 2,
            pr: 0,
            py: 0.5,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
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
              #HD12345
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
                Thanh toán lúc 19:30, 24/05/2024
              </Typography>
            </Stack>
          </Stack>

          <Chip
            label="Trạng thái: Đã thanh toán"
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

        {/* Payment Method Card */}
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
                  whiteSpace: "nowrap",
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
                  whiteSpace: "nowrap",
                }}
              >
                Thanh toán bằng tiền mặt
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* Service Details Table */}
        <Paper
          variant="outlined"
          sx={{
            borderColor: "#b4463c",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              bgcolor: "#b4463c",
              px: 3,
              py: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <RestaurantIcon sx={{ width: 24, height: 24, color: "white" }} />
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "white",
                  whiteSpace: "nowrap",
                }}
              >
                Chi tiết dịch vụ
              </Typography>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                    }}
                  >
                    Món ăn/Gói
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                    }}
                  >
                    SL
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                    }}
                  >
                    Đơn giá
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                    }}
                  >
                    Thành tiền
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        color: "text.primary",
                        borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                      }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "text.primary",
                        borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                      }}
                    >
                      {item.qty}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "text.secondary",
                        borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                      }}
                    >
                      {item.unitPrice}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        color: "text.primary",
                        borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                      }}
                    >
                      {item.total}
                    </TableCell>
                  </TableRow>
                ))}

                {/* Summary rows inside table */}
                {summaryRows.map((row, index) => (
                  <TableRow key={`summary-${index}`}>
                    <TableCell
                      colSpan={3}
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: row.isDiscount
                          ? "success.main"
                          : "text.secondary",
                        border: "none",
                        py: 0.75,
                      }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                        color: row.isDiscount ? "success.main" : "text.primary",
                        border: "none",
                        py: 0.75,
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}

                {/* Divider row */}
                <TableRow>
                  <TableCell colSpan={4} sx={{ p: 0, border: "none" }}>
                    <Divider sx={{ borderColor: "#b4463c" }} />
                  </TableCell>
                </TableRow>

                {/* Total row */}
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
                    1.049.536 đ
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Action Buttons */}
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
          <Button
            variant="contained"
            fullWidth
            startIcon={<FileDownloadIcon />}
            sx={{
              bgcolor: "#b4463c",
              color: "white",
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              borderRadius: "12px",
              height: 48,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#9e3c33",
                boxShadow: "none",
              },
            }}
          >
            Tải hóa đơn
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DetailsSection;