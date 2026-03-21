import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  Button,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";

const voucherData = [
  {
    id: 1,
    discount: "GIẢM 15%",
    badge: "Member Only",
    code: "CODE 123",
    title: "Giảm 15% tổng hóa đơn (Tối đa 200k)",
    expiry: "20/12/2023",
  },
  {
    id: 2,
    discount: "GIẢM 15%",
    badge: "Member Only",
    code: "CODE 123",
    title: "Giảm 15% tổng hóa đơn (Tối đa 200k)",
    expiry: "20/12/2023",
  },
  {
    id: 3,
    discount: "GIẢM 15%",
    badge: "Member Only",
    code: "CODE 123",
    title: "Giảm 15% tổng hóa đơn (Tối đa 200k)",
    expiry: "20/12/2023",
  },
  {
    id: 4,
    discount: "GIẢM 15%",
    badge: "Member Only",
    code: "CODE 123",
    title: "Giảm 15% tổng hóa đơn (Tối đa 200k)",
    expiry: "20/12/2023",
  },
];

const VoucherCard = ({ voucher }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flex: 1,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow:
          "0px 2px 4px -2px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)",
        bgcolor: "background.paper",
      }}
    >
      {/* Left green panel */}
      <Box
        sx={{
          width: 128,
          flexShrink: 0,
          bgcolor: "success.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          position: "relative",
        }}
      >
        {/* Left notch */}
        <Box
          sx={{
            position: "absolute",
            top: "calc(50% - 8px)",
            left: -8,
            width: 16,
            height: 16,
            bgcolor: "#f5f5f5",
            borderRadius: "50%",
          }}
        />
        <ConfirmationNumberOutlinedIcon
          sx={{ color: "white", width: 32, height: 32 }}
        />
        <Typography
          variant="labelLabel3Bold"
          sx={{
            color: "white",
            mt: 1,
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          {voucher.discount}
        </Typography>
        {/* Right notch */}
        <Box
          sx={{
            position: "absolute",
            top: "calc(50% - 8px)",
            right: -8,
            width: 16,
            height: 16,
            bgcolor: "background.paper",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
      </Box>

      {/* Right content panel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: 2,
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        {/* Top info */}
        <Stack spacing={0.75}>
          {/* Badge row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box
              sx={{
                bgcolor: "slate.200",
                borderRadius: "4px",
                px: 1,
                py: 0.25,
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 700,
                  lineHeight: "18px",
                  color: "#475569",
                  whiteSpace: "nowrap",
                }}
              >
                {voucher.badge}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 500,
                lineHeight: "18px",
                color: "#94a3b8",
                whiteSpace: "nowrap",
              }}
            >
              Mã: {voucher.code}
            </Typography>
          </Stack>

          {/* Title */}
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "16px",
              color: "text.primary",
            }}
          >
            {voucher.title}
          </Typography>

          {/* Expiry */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.75}
            sx={{ py: "1px" }}
          >
            <AccessTimeIcon sx={{ fontSize: "11.67px", color: "#64748b" }} />
            <Typography
              sx={{
                fontSize: "9px",
                fontWeight: 500,
                lineHeight: "17px",
                color: "#64748b",
                whiteSpace: "nowrap",
              }}
            >
              Hết hạn: {voucher.expiry}
            </Typography>
          </Stack>
        </Stack>

        {/* Bottom action row */}
        <Box
          sx={{
            borderTop: "1px solid #f5f5f5",
            pt: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="text"
            disableRipple
            sx={{
              p: 0,
              minWidth: "auto",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "20px",
              color: "#475569",
              "&:hover": { background: "none" },
            }}
          >
            Điều kiện
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#b4463c",
              borderRadius: "8px",
              px: 2,
              py: 1,
              fontSize: "12px",
              fontWeight: 700,
              lineHeight: "20px",
              color: "white",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              "&:hover": { bgcolor: "#9e3b32" },
              minWidth: "auto",
            }}
          >
            Dùng ngay
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export const Voucher = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: "12px",
        border: "1px solid rgba(177, 65, 53, 0.1)",
        flex: 1,
        alignSelf: "stretch",
      }}
    >
      {/* Header row */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* Title + subtitle */}
        <Stack spacing={0}>
          <Typography variant="h5" sx={{ color: "#0f172a" }}>
            Kho voucher
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              color: "#64748b",
            }}
          >
            Quản lý thông tin tài khoản và bảo mật của bạn
          </Typography>
        </Stack>

        {/* Search bar */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: 300,
            bgcolor: "rgba(177, 65, 53, 0.1)",
            borderRadius: "999px",
            pl: 3,
            pr: 0.5,
            py: 0.5,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              color: "#64748b",
              whiteSpace: "nowrap",
            }}
          >
            Tìm kiếm voucher ...
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#b4463c",
              borderRadius: "999px",
              px: 2,
              py: 1,
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "22px",
              color: "white",
              minWidth: "auto",
              boxShadow: "none",
              "&:hover": { bgcolor: "#9e3b32", boxShadow: "none" },
            }}
          >
            Tìm
          </Button>
        </Stack>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
          minHeight: "auto",
          "& .MuiTabs-indicator": {
            bgcolor: "#b4463c",
            height: "2px",
          },
          "& .MuiTab-root": {
            minHeight: "auto",
            px: 3,
            py: 1.5,
            textTransform: "none",
          },
        }}
      >
        <Tab
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 15 }} />}
          iconPosition="start"
          label="Đang hiệu lực (5)"
          sx={{
            fontSize: "14px",
            fontWeight: activeTab === 0 ? 700 : 500,
            lineHeight: "22px",
            color: activeTab === 0 ? "#b4463c" : "#64748b",
            gap: 1,
            "&.Mui-selected": {
              color: "#b4463c",
            },
          }}
        />
        <Tab
          icon={<HistoryIcon sx={{ fontSize: 13.5 }} />}
          iconPosition="start"
          label="Đã dùng (12)"
          sx={{
            fontSize: "14px",
            fontWeight: activeTab === 1 ? 700 : 500,
            lineHeight: "22px",
            color: activeTab === 1 ? "#b4463c" : "#64748b",
            gap: 1,
            "&.Mui-selected": {
              color: "#b4463c",
            },
          }}
        />
      </Tabs>

      {/* Voucher grid */}
      <Box sx={{ overflowY: "auto" }}>
        <Stack spacing={1.5}>
          {/* Row 1 */}
          <Stack direction="row" spacing={1.5}>
            {voucherData.slice(0, 2).map((voucher) => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
          </Stack>
          {/* Row 2 */}
          <Stack direction="row" spacing={1.5}>
            {voucherData.slice(2, 4).map((voucher) => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Voucher;