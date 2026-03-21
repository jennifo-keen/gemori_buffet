import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";

const buffetPackages = [
  {
    name: "Combo 299K",
    price: "299",
    suffix: ".000đ",
    tag: "Tiết kiệm",
    highlighted: false,
    features: [
      "Hơn 60 món nướng & 2 loại lẩu",
      "Hải sản tươi sống (Tôm, Mực, Ngao)",
      "Đồ uống refill & Tráng miệng",
    ],
  },
  {
    name: "Combo 399K",
    price: "399",
    suffix: ".000đ",
    tag: "PHỔ BIẾN NHẤT",
    highlighted: true,
    features: [
      "Hơn 60 món nướng & 2 loại lẩu",
      "Hải sản tươi sống (Tôm, Mực, Ngao)",
      "Đồ uống refill & Tráng miệng",
    ],
  },
  {
    name: "Combo 499K",
    price: "499",
    suffix: ".000đ",
    tag: "Premium",
    highlighted: false,
    premium: true,
    features: [
      "Hơn 60 món nướng & 2 loại lẩu",
      "Hải sản tươi sống (Tôm, Mực, Ngao)",
      "Đồ uống refill & Tráng miệng",
    ],
  },
];

function BuffetSection() {
  return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1296px",
          mx: "auto",
          px: { xs: 3, sm: 4, md: 6 },
          py: "60px",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            sx={{
              color: "#b54331",
              fontSize: { xs: "2rem", md: "2.25rem" },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Gói Buffet Nổi Bật
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Lựa chọn gói ẩm thực phù hợp với sở thích của bạn
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {buffetPackages.map((item, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                position: "relative",
                borderRadius: "16px",
                minHeight: "430px",
                backgroundColor: "#fff",
                border: item.highlighted
                  ? "2px solid #d1503d"
                  : "1px solid #ece7e4",
                boxShadow: item.highlighted
                  ? "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)"
                  : "none",
                overflow: "visible",
              }}
            >
              {item.highlighted && (
                <Chip
                  label={item.tag}
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: 24,
                    backgroundColor: "#c44f3f",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    borderRadius: "999px",
                  }}
                />
              )}

              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: item.highlighted ? "#e5a600" : "#a3a3a3",
                      fontSize: "1rem",
                      fontWeight: 800,
                    }}
                  >
                    {item.name}
                  </Typography>

                  {!item.highlighted && item.tag && (
                    <Chip
                      label={item.tag}
                      size="small"
                      sx={{
                        height: 24,
                        backgroundColor: item.premium ? "#f5d990" : "#f1f1f1",
                        color: item.premium ? "#d09800" : "#8a8a8a",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        borderRadius: "999px",
                      }}
                    />
                  )}

                  {item.highlighted && (
                    <StarIcon sx={{ color: "#e5a600", fontSize: 22 }} />
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 0.5 }}>
                  <Typography
                    sx={{
                      color: "#c24b3d",
                      fontSize: { xs: "2.5rem", md: "3.2rem" },
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    {item.price}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#111827",
                      fontSize: "1.7rem",
                      fontWeight: 800,
                      ml: 0.5,
                      mb: 0.35,
                    }}
                  >
                    {item.suffix}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Giá niêm yết mỗi người
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
                  {item.features.map((feature, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.2,
                      }}
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          color: "#d1503d",
                          fontSize: 20,
                          mt: "2px",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#1f2937",
                          fontSize: "0.98rem",
                          fontWeight: 600,
                          lineHeight: 1.55,
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                  fullWidth
                  variant={item.highlighted ? "contained" : "outlined"}
                  sx={{
                    mt: 4,
                    height: 48,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    borderColor: "#c24b3d",
                    color: item.highlighted ? "#fff" : "#c24b3d",
                    backgroundColor: item.highlighted ? "#c24b3d" : "#fff",
                    "&:hover": {
                      borderColor: "#b54331",
                      backgroundColor: item.highlighted ? "#b54331" : "#fff5f3",
                    },
                  }}
                >
                  Xem ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
  );
}

export default BuffetSection;