import React from "react";
import { Stack, Typography } from "@mui/material";

export const PromotionsHeaderSection = () => {
  return (
    <Stack
      spacing={{ xs: 1.5, sm: 2 }}
      component="section"
      pb={{ xs: 4, sm: 5, md: 7, lg: 8 }}
      width="100%"
    >
      <Typography
        color="slate.900"
        sx={{
          fontSize: { xs: "28px", sm: "36px", md: "44px" },
          fontWeight: 700,
          lineHeight: { xs: 1.25, sm: 1.2, md: 1.15 },
        }}
      >
        Chương Trình Khuyến Mãi
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          maxWidth: "672px",
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
          lineHeight: { xs: 1.7, md: 1.8 },
        }}
      >
        Khám phá thế giới ẩm thực nướng &amp; lẩu không giới hạn với những ưu đãi
        hấp dẫn nhất dành riêng cho thực khách của Gemori Buffet.
      </Typography>
    </Stack>
  );
};

export default PromotionsHeaderSection;