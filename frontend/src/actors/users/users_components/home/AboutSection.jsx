import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AboutOus from "../../../../assets/img/AboutOus.png"
const features = [
  {
    icon: <RestaurantMenuIcon sx={{ fontSize: 20, color: "#B14135" }} />,
    title: "Chất lượng thượng hạng",
    desc: "Nguyên liệu được tuyển chọn khắt khe, nhập khẩu trực tiếp và bảo quản theo tiêu chuẩn quốc tế.",
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 20, color: "#B14135" }} />,
    title: "Không gian ấm cúng",
    desc: "Thiết kế hiện đại kết hợp nét truyền thống, phù hợp cho cả tiệc gia đình và gặp gỡ đối tác.",
  },
  {
    icon: <HeadsetMicIcon sx={{ fontSize: 20, color: "#B14135" }} />,
    title: "Dịch vụ tận tâm",
    desc: "Đội ngũ nhân viên chuyên nghiệp, luôn sẵn sàng phục vụ với nụ cười và sự chu đáo nhất.",
  },
];

export default function AboutSection() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 9 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            px: { xs: 2, sm: 4, md: 9 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              minHeight: { xs: "auto", md: 640 },
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 600,
                height: { xs: 250, sm: 300, md: 640 },
              }}
            >
              <Box
                component="img"
                src={AboutOus}
                alt="Chef"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  right: { xs: 16, md: -24 },
                  bottom: { xs: 16, md: -24 },
                  width: { xs: 110, md: 130 },
                  height: { xs: 110, md: 130 },
                  borderRadius: "50%",
                  backgroundColor: "#D4A923",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "20px", md: "24px" },
                    fontWeight: 800,
                    color: "#1A1A1A",
                    lineHeight: 1,
                  }}
                >
                  10+
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    lineHeight: 1.2,
                  }}
                >
                  Năm Kinh Nghiệm
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: { xs: 3, sm: 2, md: 2 },
                py: { xs: 4, md: 2 },
              }}
            >
              <Box sx={{ maxWidth: 520 }}>
                <Typography
                  sx={{
                    color: "#B14135",
                    fontSize: "14px",
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Về chúng tôi
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "24px", md: "40px" },
                    fontWeight: 800,
                    color: "#18213C",
                    lineHeight: 1.1,
                    mb: 4,
                  }}
                >
                  Nơi Tinh Hoa Ẩm Thực
                  <br />
                  Gặp Gỡ Sự Tận Tâm
                </Typography>

                <Stack spacing={3}>
                  {features.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 36,
                          height: 36,
                          backgroundColor: "#F2DFD8",
                          borderRadius: "10px",
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#18213C",
                            mb: 0.5,
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#6E7485",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}