import React from 'react';
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Footer from "../order_component/Footer"
import Header from "../order_component/HeaderProfile"



const BORDER_COLOR = "rgba(177, 65, 53, 0.1)";

const profileFields = [
  { label: "Họ và tên", value: "Nguyễn Văn A" },
  { label: "Email", value: "nguyenvana@example.com" },
  { label: "Số điện thoại", value: "0 901 234 567" },
  { label: "Ngày sinh", value: "01/06/2005" },
  { label: "Địa chỉ", value: "123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh", },
];

const statsCards = [
  {
    label: "Đơn hàng",
    value: "24",
    icon: (
      <ShoppingBagOutlinedIcon
        sx={{ color: "#a21a16", width: 24, height: 24 }}
      />
    ),
  },
  {
    label: "Voucher",
    value: "12",
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#a21a16", width: 24, height: 24 }}
      />
    ),
  },
];

const Section = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 3,
        border: `1px solid ${BORDER_COLOR}`,
        boxSizing: "border-box",
      }}
    >
      <Header></Header>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        p={6}
      >
        <Stack spacing={0.25}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="grey.900"
            lineHeight={1.3}
          >
            Hồ sơ cá nhân
          </Typography>
          <Typography variant="caption" color="text.secondary" lineHeight={1.5}>
            Quản lý thông tin tài khoản và bảo mật của bạn
          </Typography>
        </Stack>

        <Button
          variant="contained"
          startIcon={<EditIcon sx={{ width: 18, height: 18 }} />}
          sx={{
            backgroundColor: "#a21a16",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 14,
            px: 1.5,
            py: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": { backgroundColor: "#8b1512" },
          }}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      {/* Profile Fields */}
      <Stack spacing={0} px={6} >
        {profileFields.map((field, index) => (
          <Box
            key={index}
            pb={2}
            sx={{
              borderBottom: `1px solid ${BORDER_COLOR}`,
              mb: index < profileFields.length - 1 ? 2 : 0,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
              display="block"
              mb={0.25}
            >
              {field.label}
            </Typography>
            <Typography variant="body1" fontWeight={500} color="grey.900">
              {field.value}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Stats + Delete Section */}
      <Box py={3} mt={3}  sx={{ borderTop: `1px solid ${BORDER_COLOR}` }}>
        {/* Stats Cards */}
        <Stack direction="row" spacing={2} mb={2} mx={4}>
          {statsCards.map((card, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 3,
                border: `1px solid ${BORDER_COLOR}`,
              }}
            >
              {/* Icon Box */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: "rgba(177, 65, 53, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>

              <Stack spacing={0}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  lineHeight={1.5}
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="grey.900"
                  lineHeight={1.3}
                >
                  {card.value}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {/* Delete Account Card */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            mx:4,
            my:1,
            borderRadius: 3,
            backgroundColor: "#fff7f4",
            border: `1px solid ${BORDER_COLOR}`,
          }}
        >
          <Stack spacing={0.25} flex={1}>
            <Typography variant="body1" fontWeight={700} color="grey.800">
              Xóa tài khoản
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              lineHeight={1.5}
              sx={{ fontFamily: "'Be Vietnam Pro', Helvetica, sans-serif" }}
            >
              Một khi bạn xóa tài khoản, mọi dữ liệu sẽ không thể khôi phục. Hãy
              chắc chắn về điều này.
            </Typography>
          </Stack>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b4463c",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14,
              py: 1,
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow:
                "0px 4px 6px -4px #ef444433, 0px 10px 15px -3px #ef444433",
              "&:hover": { backgroundColor: "#9b3530" },
            }}
          >
            Xóa tài khoản
          </Button>
        </Paper>
      </Box>
<Footer/>
    </Paper>
  );
};

export default Section;
