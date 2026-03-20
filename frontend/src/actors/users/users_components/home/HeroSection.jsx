    import React from "react";
import { Box, Typography, Chip } from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 6, lg: "72px" },
        py: "24px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1296px",
          height: { xs: 360, sm: 420, md: 500 },
          mx: "auto",
          borderRadius: "32px",
          overflow: "hidden",
          backgroundColor: "#111827",
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80"
          alt="Buffet nướng"
          sx={{
            position: "absolute",
            inset: 0,
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
              "linear-gradient(90deg, rgba(20,14,12,0.88) 0%, rgba(20,14,12,0.62) 42%, rgba(20,14,12,0.18) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            px: { xs: 3, sm: 5, md: 8 },
          }}
        >
          <Box sx={{ maxWidth: "768px" }}>
            <Chip
              label="Ưu đãi giới hạn"
              sx={{
                mb: 3,
                backgroundColor: "#f6c343",
                color: "#2b1d0e",
                fontWeight: 700,
                height: 32,
                borderRadius: "999px",
              }}
            />

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                lineHeight: { xs: 1.1, md: 1.05 },
                letterSpacing: "-0.02em",
              }}
            >
              Buffet nướng giá
              <br />
              chỉ từ{" "}
              <Box component="span" sx={{ color: "#f6c343" }}>
                299k
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                maxWidth: "576px",
                color: "#e2e8f0",
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: 600,
                lineHeight: 1.6,
              }}
            >
              Đi 4 tính tiền 3 - Trải nghiệm ẩm thực nướng thượng hạng
              với hơn 100 món ngon tại Gemori. Đặt chỗ ngay hôm nay!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;