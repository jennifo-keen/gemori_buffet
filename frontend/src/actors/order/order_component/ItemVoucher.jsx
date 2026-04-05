// src/components/Order_ItemVoucher.jsx
import React from "react";
import PercentIcon from "@mui/icons-material/Percent";
import { Box, Paper, Stack, Typography } from "@mui/material";

const formatDiscount = (voucher) => {
  if (voucher.discount_type === 'percent') return `Giảm ${voucher.discount_value}%`;
  return `Giảm ${Number(voucher.discount_value).toLocaleString('vi-VN')}đ`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('vi-VN');
};

const Order_ItemVoucher = ({ voucher }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%", // FIX: responsive full width
        height: { xs: "auto", sm: 74 },
        borderRadius: 2,
        borderColor: "#8a00001a",
        px: 1.5,
        py: 1.5,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#8a0000",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PercentIcon sx={{ color: "#f5c518", fontSize: 20 }} />
        </Box>

        <Stack flex={1}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: 12, sm: 13 },
              lineHeight: 1.3,
              wordBreak: "break-word", // FIX: xuống dòng
            }}
          >
            {voucher ? formatDiscount(voucher) : '---'}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#64748b",
              fontSize: 11,
            }}
          >
            {voucher?.code && `Mã: ${voucher.code}`}
            {voucher?.end_date && ` · Hết hạn: ${formatDate(voucher.end_date)}`}
            {voucher?.quantity !== null && voucher?.quantity !== undefined && ` · Còn ${voucher.quantity} lượt`}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Order_ItemVoucher;