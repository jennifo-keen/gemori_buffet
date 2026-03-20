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
    <Box component="section" sx={{ pt: 6, width: "100%" }}>
      <Box
        sx={{
          gap: 2,
          p: 4,
          backgroundColor: "#b141351a",
          borderRadius: 2,
          border: "1px solid #b4463c",
          width: "100%",
        }}
      >
        {/* Section title with info icon */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <InfoOutlinedIcon sx={{ color: "#b4463c", width: 20, height: 20 }} />
          <Typography variant="h6" sx={{ color: "#b4463c" }}>
            Điều khoản chung
          </Typography>
        </Stack>

        {/* Bullet point list */}
        <Stack spacing={1.5}>
          {terms.map((term, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="flex-start"
              spacing={1.5}
            >
              {/* Bullet dot */}
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
                variant="labelLabel2Regular"
                sx={{ color: "#b4463c" }}
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
