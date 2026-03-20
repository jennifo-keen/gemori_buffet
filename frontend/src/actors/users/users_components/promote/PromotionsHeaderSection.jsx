import React from "react";
import { Stack, Typography } from "@mui/material";

export const PromotionsHeaderSection = () => {
  return (
    <Stack spacing={2} component="section" pb={10} width="100%">
      <Typography
        variant="h2"
        color="slate.900"
        sx={{ lineHeight: "var(--heading-h2-bold-line-height)" }}
      >
        Chương Trình Khuyến Mãi
      </Typography>

      <Typography variant="body1" color="text.secondary" maxWidth="672px">
        Khám phá thế giới ẩm thực nướng &amp; lẩu không giới hạn với những ưu
        đãi
        <br />
        hấp dẫn nhất dành riêng cho thực khách của Gemori Buffet.
      </Typography>
    </Stack>
  );
};
