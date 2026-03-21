import React, { useState } from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

// Profile field data
const profileFields = [
  [
    { label: "Họ và tên", value: "Nguyễn Văn A" },
    { label: "Email", value: "nguyenvana@example.com" },
  ],
  [
    { label: "Số điện thoại", value: "0 901 234 567" },
    { label: "Ngày sinh", value: "01/06/2005" },
  ],
];

// Stats card data
const statsCards = [
  {
    label: "Đơn hàng",
    value: "24",
    icon: (
      <ShoppingBagOutlinedIcon
        sx={{ width: 24, height: 24, color: "primary.main" }}
      />
    ),
  },
  {
    label: "Voucher",
    value: "12",
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ width: 24, height: 24, color: "primary.main" }}
      />
    ),
  },
];

const BORDER_COLOR = "rgba(177, 65, 53, 0.1)";

export const DetailsSection = () => {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "12px",
          border: `1px solid ${BORDER_COLOR}`,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Header: Title + Edit Button */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" color="slate.900">
              Hồ sơ cá nhân
            </Typography>
            <Typography variant="labelLabel2Regular" color="text.secondary">
              Quản lý thông tin tài khoản và bảo mật của bạn
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<EditOutlinedIcon sx={{ width: 18, height: 18 }} />}
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              px: 1.5,
              py: 1,
              borderRadius: "8px",
              typography: "labelLabel2Medium",
              "&:hover": { backgroundColor: "primary.main" },
            }}
          >
            Chỉnh sửa
          </Button>
        </Stack>

        {/* Profile Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0, width: "100%" }}>
          {profileFields.map((row, rowIndex) => (
            <Grid container spacing={4} key={rowIndex}>
              {row.map((field) => (
                <Grid item xs={6} key={field.label} sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "100%",
                      pb: 2,
                      borderBottom: `1px solid ${BORDER_COLOR}`,
                      mb: rowIndex < profileFields.length - 1 ? 3 : 0,
                    }}
                  >
                    <Typography
                      variant="labelLabel3SemiBold"
                      color="slate.400"
                      display="block"
                    >
                      {field.label}
                    </Typography>

                    <Typography
                      variant="labelLabel1Medium"
                      color="slate.900"
                      display="block"
                    >
                      {field.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}

          <Box
            sx={{
              width: "100%",
              pb: 2,
              borderBottom: `1px solid ${BORDER_COLOR}`,
              mt: 3,
            }}
          >
            <Typography
              variant="labelLabel3SemiBold"
              color="slate.400"
              display="block"
            >
              Địa chỉ
            </Typography>

            <Typography
              variant="labelLabel1Medium"
              color="slate.900"
              display="block"
            >
              123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
            </Typography>
          </Box>
        </Box>

        {/* Bottom section: Stats + Delete Account */}
        <Box
          sx={{
            pt: 4,
            borderTop: `1px solid ${BORDER_COLOR}`,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Stats Cards */}
          <Stack direction="row" spacing={2}>
            {statsCards.map((card) => (
              <Paper
                key={card.label}
                elevation={0}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: "12px",
                  border: `1px solid ${BORDER_COLOR}`,
                }}
              >
                {/* Icon box */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    backgroundColor: BORDER_COLOR,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </Box>

                <Box>
                  <Typography
                    variant="labelLabel3Bold"
                    color="slate.500"
                    display="block"
                  >
                    {card.label}
                  </Typography>
                  <Typography variant="h6" color="slate.900" display="block">
                    {card.value}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>

          {/* Delete Account Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderRadius: "12px",
              backgroundColor: "background.warm",
              border: `1px solid ${BORDER_COLOR}`,
            }}
          >
            <Box>
              <Typography
                variant="labelLabel1Bold"
                color="slate.800"
                display="block"
              >
                Xóa tài khoản
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "text.secondary",
                }}
              >
                Một khi bạn xóa tài khoản, mọi dữ liệu sẽ không thể khôi phục.
                Hãy chắc chắn về điều này.
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                px: 3,
                py: 1,
                borderRadius: "8px",
                typography: "labelLabel2Bold",
                flexShrink: 0,
                boxShadow: 4,
                "&:hover": { backgroundColor: "primary.main" },
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