import React from "react";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DiamondIcon from "@mui/icons-material/Diamond";
import GroupIcon from "@mui/icons-material/Group";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

// Promotion card data
const promotions = [
  {
    badge: "HOT DEAL",
    badgeColor: "#b4463c",
    title: "Tặng voucher 100k",
    icon: <GroupIcon sx={{ fontSize: 18, color: "#b4463c" }} />,
    subtitle: "Cho nhóm trên 5 người",
    description:
      "Tụ tập bạn bè, sum họp gia đình càng đông\ncàng vui. Nhận ngay voucher 100.000 VNĐ\ncho lần đặt bàn tiếp theo.",
    metaLabel: "Hạn dùng",
    metaValue: "31/12/2026",
    buttonText: "Nhận ưu đãi",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  },
  {
    badge: "MEMBERSHIP",
    badgeColor: "#2563eb",
    title: "Giảm 15% Tổng Bill",
    icon: <CardMembershipIcon sx={{ fontSize: 16, color: "#b4463c" }} />,
    subtitle: "Ưu đãi hội viên mới",
    description:
      "Đăng ký thành viên Gemori lần đầu để nhận\nngay voucher giảm trực tiếp 15% trên tổng\nhóa đơn thanh toán.",
    metaLabel: "Đối tượng",
    metaValue: "Khách hàng mới",
    buttonText: "Đăng ký ngay",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    badge: "PREMIUM",
    badgeColor: "#f4ca66",
    title: "Đi 10 Tính 9",
    icon: <DiamondIcon sx={{ fontSize: 16, color: "#b4463c" }} />,
    subtitle: "Dành riêng cho gói Diamond",
    description:
      "Trải nghiệm thực đơn thượng hạng với tôm hùm, dẻ sườn bò Mỹ. Ưu đãi đi 4 người chỉ cần thanh toán tiền cho 3 suất buffet.",
    metaLabel: "Áp dụng",
    metaValue: "Thứ 2 - Thứ 6",
    buttonText: "Nhận ưu đãi",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
];

export const PromotionsCardsSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: { xs: 2, sm: 3, md: 3 },
        alignItems: "stretch",
      }}
    >
      {promotions.map((promo, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #cbd5e1",
            boxShadow: "0px 1px 2px #0000000d",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: { xs: 200, sm: 220, md: 224 },
              flexShrink: 0,
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%), url(${promo.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              pt: { xs: 1.5, sm: 1.75 },
              pb: { xs: 1.5, sm: 2 },
              px: { xs: 1.5, sm: 2 },
            }}
          >
            <Chip
              label={promo.badge}
              size="small"
              sx={{
                bgcolor: promo.badgeColor,
                color: "#ffffff",
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: "18px",
                height: "22px",
                borderRadius: "999px",
                "& .MuiChip-label": {
                  px: 1.5,
                  py: 0,
                },
              }}
            />

            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: { xs: "18px", sm: "20px" },
                fontWeight: 700,
                lineHeight: { xs: "26px", sm: "28px" },
              }}
            >
              {promo.title}
            </Typography>
          </Box>

          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: { xs: 2, sm: 2.5, md: 3 },
              "&:last-child": { pb: { xs: 2, sm: 2.5, md: 3 } },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ pb: 1.25, flexWrap: "wrap" }}
            >
              {promo.icon}
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "20px",
                  color: "#b4463c",
                }}
              >
                {promo.subtitle}
              </Typography>
            </Stack>

            <Typography
              sx={{
                flex: 1,
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                color: "#475569",
                whiteSpace: "pre-line",
                mb: 2,
              }}
            >
              {promo.description}
            </Typography>

            <Box>
              <Divider sx={{ borderColor: "#cbd5e1", mb: 2 }} />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={{ xs: 1.5, sm: 2 }}
              >
                <Stack spacing={0}>
                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#94a3b8",
                    }}
                  >
                    {promo.metaLabel}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      color: "#334155",
                    }}
                  >
                    {promo.metaValue}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth={false}
                  sx={{
                    alignSelf: { xs: "stretch", sm: "center" },
                    bgcolor: "#b4463c",
                    color: "#ffffff",
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    borderRadius: "8px",
                    px: 2.5,
                    py: 1,
                    textTransform: "none",
                    boxShadow: "none",
                    minWidth: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      bgcolor: "#9e3c33",
                      boxShadow: "none",
                    },
                  }}
                >
                  {promo.buttonText}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PromotionsCardsSection;