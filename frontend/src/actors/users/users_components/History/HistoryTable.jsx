import React from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Chip,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Table row data
const orderRows = [
  {
    date: "20/10/2023",
    time: "19:30 PM",
    combo: "Combo 299K",
    comboType: "299k",
    total: "1,250,000đ",
  },
  {
    date: "15/09/2023",
    time: "12:15 PM",
    combo: "Combo 299K",
    comboType: "299k",
    total: "890,000đ",
  },
  {
    date: "02/08/2023",
    time: "18:45 PM",
    combo: "Combo 399K",
    comboType: "399k",
    total: "2,100,000đ",
  },
  {
    date: "12/07/2023",
    time: "20:00 PM",
    combo: "Combo 499K",
    comboType: "499k",
    total: "1,420,000đ",
  },
  {
    date: "12/07/2023",
    time: "20:00 PM",
    combo: "Combo 499K",
    comboType: "499k",
    total: "1,420,000đ",
  },
  {
    date: "12/07/2023",
    time: "20:00 PM",
    combo: "Combo 499K",
    comboType: "499k",
    total: "1,420,000đ",
  },
  {
    date: "12/07/2023",
    time: "20:00 PM",
    combo: "Combo 299K",
    comboType: "299k",
    total: "1,420,000đ",
  },
];

// Combo badge style mapping
const comboBadgeStyles = {
  "299k": { backgroundColor: "#e2e8f0", color: "#334155" },
  "399k": { backgroundColor: "#fff1b9", color: "#c2863d" },
  "499k": { backgroundColor: "#b141351a", color: "#b4463c" },
};

// Pagination pages
const pages = [1, 2, 3];

export const HistoryTable = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);

  return (
    <Stack spacing={4} width="100%">
      {/* Date range filter button */}
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
          Chọn khoảng thời gian
        </Button>
      </Box>

      {/* Table */}
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
              <TableCell
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  color: "#0f172a",
                  py: 2,
                  px: 3,
                  backgroundColor: "#e2e8f0",
                }}
              >
                Ngày dùng bữa
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  color: "#0f172a",
                  py: 2,
                  px: 3,
                  backgroundColor: "#e2e8f0",
                }}
              >
                Gói Buffet
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  color: "#0f172a",
                  py: 2,
                  px: 3,
                  backgroundColor: "#e2e8f0",
                }}
              >
                Tổng tiền
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  color: "#0f172a",
                  py: 2,
                  px: 3,
                  backgroundColor: "#e2e8f0",
                }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:not(:last-child) td": {
                    borderBottom: "1px solid #e5e7eb",
                  },
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                {/* Date & Time */}
                <TableCell
                  sx={{
                    py: 2.5,
                    px: 3,
                    borderBottom: "none",
                  }}
                >
                  <Stack spacing={0}>
                    <Typography
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                        color: "#0f172a",
                      }}
                    >
                      {row.date}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#914f3b",
                      }}
                    >
                      {row.time}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Combo Badge */}
                <TableCell
                  align="center"
                  sx={{ py: 3, px: 3, borderBottom: "none" }}
                >
                  <Chip
                    label={row.combo}
                    size="small"
                    sx={{
                      backgroundColor:
                        comboBadgeStyles[row.comboType].backgroundColor,
                      color: comboBadgeStyles[row.comboType].color,
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

                {/* Total */}
                <TableCell
                  align="right"
                  sx={{ py: 3, px: 3, borderBottom: "none" }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.total}
                  </Typography>
                </TableCell>

                {/* Action */}
                <TableCell
                  align="center"
                  sx={{ py: 3, px: 3, borderBottom: "none" }}
                >
                  <Button
                    variant="text"
                    disableRipple
                    onClick={() => navigate("/history/detail")}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
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
          Hiển thị 1-4 trên 12 hóa đơn
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* Previous button */}
          <Box
            component="button"
            onClick={() => setActivePage((p) => Math.max(1, p - 1))}
            sx={{
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
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: "16px", color: "#0f172a" }} />
          </Box>

          {/* Page number buttons */}
          {pages.map((page) => (
            <Box
              key={page}
              component="button"
              onClick={() => setActivePage(page)}
              sx={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: activePage === page ? "none" : "1px solid #e5e7eb",
                borderRadius: "4px",
                backgroundColor:
                  activePage === page ? "#b4463c" : "transparent",
                cursor: "pointer",
                padding: 0,
                fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                fontSize: "14px",
                fontWeight: activePage === page ? 700 : 400,
                lineHeight: "22px",
                color: activePage === page ? "#ffffff" : "#0f172a",
                "&:hover": {
                  backgroundColor: activePage === page ? "#b4463c" : "#f3f4f6",
                },
              }}
            >
              {page}
            </Box>
          ))}

          {/* Next button */}
          <Box
            component="button"
            onClick={() => setActivePage((p) => Math.min(pages.length, p + 1))}
            sx={{
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
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "16px", color: "#0f172a" }} />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HistoryTable;