import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Stack, Typography } from "@mui/material";

const terms = [
  "Các chương trình khuyến mãi không áp dụng đồng thời với nhau và các chương trình ưu đãi đối tác khác.",
  "Ưu đãi không có giá trị quy đổi thành tiền mặt.",
  "Vui lòng thông báo cho nhân viên về mã ưu đãi trước khi tiến hành thanh toán.",
  "Nhà hàng có quyền thay đổi nội dung chương trình mà không cần báo trước tùy theo tình hình thực tế.",
];

export const FooterTermsSection = () => {
  return (
    <Box component="section" sx={{ pt: { xs: 4, sm: 5, md: 6 }, width: "100%" }}>
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "#b141351a",
          borderRadius: 2,
          border: "1px solid #b4463c",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={{ xs: 1.5, sm: 2 }}
        >
          <InfoOutlinedIcon
            sx={{ color: "#b4463c", width: 20, height: 20, flexShrink: 0 }}
          />
          <Typography
            sx={{
              color: "#b4463c",
              fontSize: { xs: "18px", sm: "20px" },
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            Điều khoản chung
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 1.25, sm: 1.5 }}>
          {terms.map((term, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="flex-start"
              spacing={{ xs: 1, sm: 1.5 }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#b4463c",
                  mt: "8px",
                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  color: "#b4463c",
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: 400,
                  lineHeight: { xs: 1.7, sm: 1.8 },
                }}
              >
                {term}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default FooterTermsSection;