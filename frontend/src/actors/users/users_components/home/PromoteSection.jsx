import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const promoData = [
  {
    title: "Tiệc Sinh Nhật 0đ",
    desc: "Tặng trang trí & bánh kem cho nhóm từ 10 khách",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Ưu Đãi Hội Viên",
    desc: "Giảm thêm 10% và tích điểm đổi quà mỗi hóa đơn",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Voucher Giờ Vàng",
    desc: "Giảm 15% khi đặt bàn khung giờ 11:00 - 14:00",
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function PromoteSection() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#B141350D",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            px: { xs: 3, sm: 5, md: 9 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "42px" },
                fontWeight: 700,
                color: "#B74B3D",
                lineHeight: 1.2,
              }}
            >
              Ưu đãi độc quyền
            </Typography>

            <Link
              href="#"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "14px",
                fontWeight: 600,
                color: "#C75B4E",
              }}
            >
              Tất cả khuyến mãi
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {promoData.map((item, index) => (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  height: 300,
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.08) 100%)",
                  }}
                />

                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: "#fff",
                    p: 3,
                    zIndex: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", md: "24px" },
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}