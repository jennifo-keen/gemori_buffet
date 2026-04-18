import { Box, Stack } from "@mui/material";
import { OrderDetailSidebarSection } from "./OrderDetailSidebarSection";
import { OrderQueueTableSection } from "./OrderQueueTableSection";
import { ThemeProvider } from "./ThemeProvider";

const ContentLayoutMain = () => {
  return (
    <ThemeProvider>
      <Stack
        direction="row"
        spacing={3}
        sx={{ width: "100%", minHeight: "595px" }}
      >
        {/* Main order queue table - takes ~2/3 of the width */}
        <Box sx={{ flex: "0 0 65%" }}>
          <OrderQueueTableSection />
        </Box>
        {/* Order detail sidebar - takes ~1/3 of the width */}
        <Box sx={{ flex: 1 }}>
          <OrderDetailSidebarSection />
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default ContentLayoutMain;
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

// Food item data
const menuItems = [
  {
    id: 1,
    name: "Nước lẩu Mala Đài Loan",
    quantity: "x1",
    status: "Đã lên món",
    statusType: "served",
    time: "18:50",
    image:
      "https://storage.googleapis.com/a1aa/image/ab6axudllrorl-uqxfcnhxf0qp-anhgzebyybngsowuzqvb6opquuox-1ygogcpndqaf1kqxrvr7qyaedilqklwthgmyusa5fz5viehdepwgnsrstwdcodk5t7d-0mrylmpjos7qa7qyg3uwq0ssvkyn4hc0k5imhvatgp366xankwpb5rjim4zdcfwhlwp5ecu5d7unhlikoudloqa-k12dmopxtnb9uudxahuugaypbf3bthznpzivqv3fa8qu9tx6rt2karsn1cmonn1s.png",
  },
  {
    id: 2,
    name: "Bò Wagyu Thượng Hạng",
    quantity: "x3",
    status: "Đã lên món",
    statusType: "served",
    time: "19:05",
    image:
      "https://storage.googleapis.com/a1aa/image/ab6axuc-itaoafc1xyhsrjrdmufgghyhms4satfck-6rn8k5qbtmlr2hf52gbhc7gfu93ll6pmvhzsdyfbeuwe2x-0gthwe3g-wneqb-ipo39sace-jdd4v5ffdn-ukt-obgbhenzmnmswgzhzpuzuryaqcikoahi9rjxequambfqnfamuge7zcmuqx6-fscukxlvwu-cejziceq1cme90aauntw-zkpdotg7q295dl0zsv0eqv2pkxttnxmejmeng2sncewrnjmkjaxkz4h.png",
  },
  {
    id: 3,
    name: "Khay Hải Sản Tổng Hợp",
    quantity: "x2",
    status: "Đang chuẩn bị",
    statusType: "preparing",
    time: "Chờ 12p",
    image:
      "https://storage.googleapis.com/a1aa/image/ab6axucjtq8o8fr5w9aqbhv6dhxk1c1yqnvjbj9hfmt8svoleqdmeeaznx8hqtjbdj3jmmimirqkaw-mixyhscfhpef0fu5vznmiwkadfwqa7xv5xkxgqerdc4iiqk7qwqzq3cj0rjo9vtpnvrwonhozsintiohaomnisyfpyswir-srztqrxbaz7tdla6o-jsob0pb8eu2qzspnkcdglsvnveufxzndo1i3y92bpt0p5n-8itih4kjsqqvxahv1fdi72uvagbm3ev6-jmm9.png",
  },
];

const getStatusStyles = (statusType) => {
  if (statusType === "served") {
    return { backgroundColor: "#d1fae5", color: "#047857" };
  }
  return { backgroundColor: "#fef3c7", color: "#b45309" };
};

export const OrderDetailSidebarSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2.5,
        bgcolor: "background.paper",
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "primary.light",
        boxShadow: 1,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack spacing={0}>
          <Typography
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 900,
              fontSize: "18px",
              letterSpacing: "-0.45px",
              lineHeight: "28px",
              color: "#230f0f",
            }}
          >
            Chi tiết đơn hàng
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "16px",
              color: "primary.main",
            }}
          >
            #ORD-9021 • Bàn 12 (VIP)
          </Typography>
        </Stack>
        <IconButton size="small" sx={{ p: 0 }}>
          <CloseIcon sx={{ fontSize: 14, color: "#230f0f" }} />
        </IconButton>
      </Stack>
      {/* Content */}
      <Stack spacing={2}>
        {/* Progress Card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            p: 1.5,
            border: "1px solid",
            borderColor: "primary.light",
            bgcolor: "secondary.light",
            borderRadius: "8px",
          }}
        >
          {/* Start time and guests row */}
          <Stack direction="row" justifyContent="space-between" pb={1}>
            <Typography
              sx={{
                fontFamily: '"Epilogue", Helvetica',
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "16px",
                color: "transparent",
              }}
            >
              <Box component="span" sx={{ color: "#78716c" }}>
                Bắt đầu:{" "}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 700,
                  color: "#230f0f",
                }}
              >
                18:45
              </Box>
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Epilogue", Helvetica',
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "16px",
                color: "transparent",
              }}
            >
              <Box component="span" sx={{ color: "#78716c" }}>
                Khách:{" "}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 700,
                  color: "#230f0f",
                }}
              >
                06 người
              </Box>
            </Typography>
          </Stack>
          {/* Progress bar */}
          <Box
            sx={{
              width: "100%",
              height: 6,
              bgcolor: "#e7e5e4",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "75%",
                height: "100%",
                bgcolor: "primary.main",
              }}
            />
          </Box>
          {/* Progress text */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                fontFamily: '"Epilogue", Helvetica',
                fontWeight: 700,
                fontSize: "10px",
                lineHeight: "15px",
                color: "primary.main",
                textAlign: "right",
              }}
            >
              Tiến độ phục vụ: 9/12 món
            </Typography>
          </Box>
        </Box>
        {/* Menu items list */}
        <Stack spacing={1.5}>
          {/* Section label */}
          <Typography
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 900,
              fontSize: "10px",
              letterSpacing: "1px",
              lineHeight: "15px",
              color: "#a8a29e",
            }}
          >
            DANH SÁCH MÓN ĐANG PHỤC VỤ
          </Typography>
          {/* Food items */}
          {menuItems.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
            >
              {/* Food image */}
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "8px",
                  objectFit: "cover",
                  flexShrink: 0,
                  boxShadow: "0px 0px 0px 1px #8a00001a",
                }}
              />
              {/* Food details */}
              <Stack spacing={0.5} flex={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography
                    sx={{
                      fontFamily: '"Epilogue", Helvetica',
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#230f0f",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Epilogue", Helvetica',
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#230f0f",
                      flexShrink: 0,
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      px: 0.75,
                      py: 0.25,
                      borderRadius: "4px",
                      ...getStatusStyles(item.statusType),
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Epilogue", Helvetica',
                        fontWeight: 700,
                        fontSize: "10px",
                        lineHeight: "15px",
                      }}
                    >
                      {item.status}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Epilogue", Helvetica',
                      fontWeight: 400,
                      fontSize: "10px",
                      lineHeight: "15px",
                      color: "#a8a29e",
                    }}
                  >
                    {item.time}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}

          {/* "And 9 more items" row */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "secondary.light",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            >
              <MoreHorizIcon sx={{ fontSize: 16, color: "#a8a29e" }} />
            </Box>
            <Typography
              sx={{
                fontFamily: '"Epilogue", Helvetica',
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "12px",
                lineHeight: "16px",
                color: "#a8a29e",
              }}
            >
              Và 9 món khác...
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "primary.light",
          pt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Subtotal row */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              color: "#78716c",
            }}
          >
            Tạm tính:
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 900,
              fontSize: "18px",
              lineHeight: "28px",
              color: "primary.main",
            }}
          >
            2,450,000₫
          </Typography>
        </Stack>
        {/* Action buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "16px",
              color: "primary.main",
              borderColor: "secondary.dark",
              borderRadius: "8px",
              py: 1.25,
              textTransform: "none",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "secondary.light",
              },
            }}
          >
            In hóa đơn tạm
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              fontFamily: '"Epilogue", Helvetica',
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "16px",
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "8px",
              py: 1.25,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#6a0000",
              },
            }}
          >
            Thanh toán
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderDetailSidebarSection;
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

// Table column headers data
const TABLE_HEADERS = [
  { label: "MÃ ĐƠN", flex: "0 0 92px" },
  { label: "SỐ BÀN", flex: "0 0 110px" },
  { label: "THỜI\nGIAN", flex: "0 0 80px" },
  { label: "MÓN", flex: "0 0 70px" },
  { label: "TỔNG TIỀN", flex: "0 0 110px" },
  { label: "TRẠNG THÁI", flex: "1 1 auto" },
  { label: "", flex: "0 0 50px" },
];

// Status badge config
const STATUS_CONFIG = {
  serving: {
    label: "Đang\nphục vụ",
    bgColor: "#dbeafe",
    dotColor: "#3b82f6",
    textColor: "#1d4ed8",
  },
  waiting: {
    label: "Chờ\nthanh\ntoán",
    bgColor: "#fef3c7",
    dotColor: "#f59e0b",
    textColor: "#b45309",
  },
  done: {
    label: "Đã hoàn\nthành",
    bgColor: "#d1fae5",
    dotColor: "#10b981",
    textColor: "#047857",
  },
};

// Order rows data
const ORDER_ROWS = [
  {
    id: "#ORD-\n9021",
    tableNum: "12",
    tableZone: "VIP\nZone",
    tableNumBg: "#8a00001a",
    tableNumColor: "#8a0000",
    time: "18:45",
    timeAgo: "45 phút\ntrước",
    dishCount: "12",
    total: "2,450,000₫",
    status: "serving",
    highlighted: true,
    opacity: 1,
  },
  {
    id: "#ORD-\n9020",
    tableNum: "05",
    tableZone: "Sảnh\nchính",
    tableNumBg: "#f5f5f4",
    tableNumColor: "#57534e",
    time: "19:10",
    timeAgo: "20 phút\ntrước",
    dishCount: "08",
    total: "1,890,000₫",
    status: "waiting",
    highlighted: false,
    opacity: 1,
  },
  {
    id: "#ORD-\n9019",
    tableNum: "22",
    tableZone: "Sân\nvườn",
    tableNumBg: "#f5f5f4",
    tableNumColor: "#57534e",
    time: "17:30",
    timeAgo: "Đã xong\n30p",
    dishCount: "04",
    total: "750,000₫",
    status: "done",
    highlighted: false,
    opacity: 0.8,
  },
  {
    id: "#ORD-\n9018",
    tableNum: "08",
    tableZone: "Sảnh\nchính",
    tableNumBg: "#f5f5f4",
    tableNumColor: "#57534e",
    time: "19:25",
    timeAgo: "Vừa mới",
    dishCount: "15",
    total: "3,120,000₫",
    status: "serving",
    highlighted: false,
    opacity: 1,
  },
];

// Status badge component
const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status];
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{
        backgroundColor: config.bgColor,
        borderRadius: "999px",
        px: 1,
        py: 0.5,
        display: "inline-flex",
      }}
    >
      <Box
        sx={{
          width: 5,
          height: 6,
          borderRadius: "50%",
          backgroundColor: config.dotColor,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontFamily: '"Epilogue", Helvetica',
          fontWeight: 700,
          fontSize: "10px",
          lineHeight: "normal",
          color: config.textColor,
          whiteSpace: "pre-line",
        }}
      >
        {config.label}
      </Typography>
    </Stack>
  );
};

export const OrderQueueTableSection = () => {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #8a00001a",
        boxShadow: "0px 1px 2px #0000000d",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      {/* Table header row */}
      <Stack
        direction="row"
        alignItems="stretch"
        sx={{
          backgroundColor: "#8a00000d",
          width: "100%",
        }}
      >
        {TABLE_HEADERS.map((col, idx) => (
          <Box
            key={idx}
            sx={{
              flex: col.flex,
              px: 2,
              py: "21px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Epilogue", Helvetica',
                fontWeight: 900,
                fontSize: "10px",
                letterSpacing: "1px",
                lineHeight: "normal",
                color: "#8a0000",
                whiteSpace: "pre-line",
              }}
            >
              {col.label}
            </Typography>
          </Box>
        ))}
      </Stack>
      {/* Table body rows */}
      <Box sx={{ width: "100%" }}>
        {ORDER_ROWS.map((row, idx) => (
          <Stack
            key={row.id}
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
              opacity: row.opacity,
              backgroundColor: row.highlighted ? "#8a00001a" : "transparent",
              borderTop: idx === 0 ? "none" : "1px solid #8a00000d",
              boxShadow: row.highlighted
                ? "inset 0px 0px 0px 1px #8a000033"
                : "none",
              position: "relative",
            }}
          >
            {/* MÃ ĐƠN */}
            <Box sx={{ flex: "0 0 92px", px: 2, py: 2 }}>
              <Typography
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#230f0f",
                  whiteSpace: "pre-line",
                }}
              >
                {row.id}
              </Typography>
            </Box>
            {/* SỐ BÀN */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ flex: "0 0 110px", pl: 2 }}
            >
              <Box
                sx={{
                  minWidth: 28,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: row.tableNumBg,
                  borderRadius: "4px",
                  px: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Epilogue", Helvetica',
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: row.tableNumColor,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.tableNum}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#57534e",
                  whiteSpace: "pre-line",
                }}
              >
                {row.tableZone}
              </Typography>
            </Stack>
            {/* THỜI GIAN */}
            <Box sx={{ flex: "0 0 80px", pl: 3, pr: 2, py: "18.5px" }}>
              <Typography
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#230f0f",
                }}
              >
                {row.time}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 400,
                  fontSize: "10px",
                  lineHeight: "normal",
                  color: "#a8a29e",
                  whiteSpace: "pre-line",
                }}
              >
                {row.timeAgo}
              </Typography>
            </Box>
            {/* MÓN */}
            <Box sx={{ flex: "0 0 70px", px: 2, py: "20.5px" }}>
              <Box
                sx={{
                  width: 35,
                  height: 32,
                  backgroundColor: "#f5f5f4",
                  borderRadius: "999px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Epilogue", Helvetica',
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#230f0f",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.dishCount}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Epilogue", Helvetica',
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#230f0f",
                    whiteSpace: "nowrap",
                  }}
                >
                  món
                </Typography>
              </Box>
            </Box>
            {/* TỔNG TIỀN */}
            <Box sx={{ flex: "0 0 110px", px: 2, py: "26px" }}>
              <Typography
                sx={{
                  fontFamily: '"Epilogue", Helvetica',
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#230f0f",
                  whiteSpace: "nowrap",
                }}
              >
                {row.total}
              </Typography>
            </Box>
            {/* TRẠNG THÁI */}
            <Box sx={{ flex: "1 1 auto", px: 2, py: "19.5px" }}>
              <StatusBadge status={row.status} />
            </Box>
            {/* Chevron */}
            <Box
              sx={{
                flex: "0 0 50px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                px: 1,
                py: "18px",
              }}
            >
              <IconButton size="small" sx={{ p: 0.5 }}>
                <ChevronRightIcon sx={{ fontSize: "14px", color: "#230f0f" }} />
              </IconButton>
            </Box>
          </Stack>
        ))}
      </Box>
      {/* Spacer to push footer down */}
      <Box sx={{ flex: 1, minHeight: "120px" }} />
      {/* Footer with pagination */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: "rgba(250,250,249,0.5)",
          borderTop: "1px solid #8a00000d",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Epilogue", Helvetica',
            fontWeight: 500,
            fontSize: "10px",
            letterSpacing: "1px",
            lineHeight: "15px",
            color: "#78716c",
            whiteSpace: "nowrap",
          }}
        >
          TRANG {page} / {totalPages}
        </Typography>
        {/* Pagination prev/next buttons */}
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            sx={{
              width: 28,
              height: 28,
              border: "1px solid #8a00001a",
              borderRadius: "6px",
              backgroundColor: "background.paper",
              "&:hover": { backgroundColor: "#8a00000d" },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: "14px", color: "#230f0f" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            sx={{
              width: 28,
              height: 28,
              border: "1px solid #8a00001a",
              borderRadius: "6px",
              backgroundColor: "background.paper",
              "&:hover": { backgroundColor: "#8a00000d" },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "14px", color: "#230f0f" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};