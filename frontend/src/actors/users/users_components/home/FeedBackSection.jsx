import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const testimonials = [
  {
    id: 1,
    name: "Anh Minh Tuấn",
    role: "Giám đốc Marketing",
    avatar: "/images/user1.jpg",
    content:
      '"Thịt bò ở đây rất mềm và tươi, nước sốt ướp đậm đà đúng vị Hàn Quốc. Không gian rộng rãi, nhân viên thay vỉ nướng rất nhanh. Chắc chắn sẽ quay lại!"',
  },
  {
    id: 2,
    name: "Chị Thảo Nguyên",
    role: "Nhân viên văn phòng",
    avatar: "/images/user2.jpg",
    content:
      '"Tôi rất ấn tượng với quầy Salad bar và các món tráng miệng. Đồ ăn kèm đa dạng giúp ăn buffet không bị ngấy. Giá cả rất hợp lý so với chất lượng."',
  },
  {
    id: 3,
    name: "Anh Hoàng Nam",
    role: "Freelancer",
    avatar: "/images/user3.jpg",
    content:
      '"Tổ chức sinh nhật cho con trai ở đây thực sự rất tuyệt. Nhà hàng hỗ trợ trang trí rất đẹp và chu đáo. Cả gia đình ai cũng hài lòng về chất lượng đồ ăn."',
  },
];

export default function FeedBackSection() {
  return (
    <Box
      sx={{
        py: { xs: 2, md: 6 },
        px: 2,
        background:
          "linear-gradient(135deg, #6d2f1a 0%, #5a2414 45%, #7a321d 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.2,
            }}
          >
            Khách hàng nói gì về Gemori?
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {testimonials.map((item) => (
            <Card
              key={item.id}
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: "16px",
                p: 4,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.24)",
                },
              }}
            >
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      sx={{ color: "#FFC107", fontSize: 22 }}
                    />
                  ))}
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    minHeight: { xs: "auto", md: 150 },
                    mb: 4,
                  }}
                >
                  {item.content}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{
                      width: 52,
                      height: 52,
                      border: "2px solid rgba(255,255,255,0.15)",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: "1rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.role}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}