import React from "react";
import UsersFourIcon from "@mui/icons-material/Groups";
import HandsClappingIcon from "@mui/icons-material/WavingHand";
import { Box, Button, Stack, Typography } from "@mui/material";

export const Card = () => {
  return (
    <Box
      sx={{
        width: 280, // Thêm độ rộng cố định để không bị méo khi nội dung ngắn
        height: 180, // Tăng nhẹ chiều cao để các phần tử "thở" được
        bgcolor: "white",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200", // Màu viền nhẹ nhàng hơn
        p: 2.5,
        display: "inline-block", // Để Card không chiếm hết chiều ngang màn hình
        boxShadow: "0px 2px 8px rgba(0,0,0,0.04)" // Thêm đổ bóng nhẹ cho nổi khối
      }}
    >
      {/* Sử dụng justifyContent: "space-between" để đẩy 
        Header lên đầu và Button xuống cuối cùng 
      */}
      <Stack sx={{ height: "100%" }} justifyContent="space-between">
        
        {/* Phần Header (Khu vực) */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <UsersFourIcon sx={{ width: 20, height: 20, color: "#ef4444" }} />
          <Typography
            sx={{
              color: "grey.600",
              fontWeight: 700,
              fontSize: "13px", // Cỡ chữ chuyên nghiệp cho heading
              textTransform: "uppercase", // Viết hoa cho giống Label
              letterSpacing: "0.5px"
            }}
          >
            Heading
          </Typography>
        </Stack>

        {/* Phần Title & Subtitle */}
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="h6"
              sx={{
                color: "grey.900",
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              Title
            </Typography>
            <Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: "#22c55e",
                borderRadius: "50%",
                flexShrink: 0 // Đảm bảo chấm xanh không bị bóp méo
              }}
            />
          </Stack>

          <Typography
            sx={{
              color: "grey.500",
              fontWeight: 400,
              fontSize: "14px"
            }}
          >
            Subtitle
          </Typography>
        </Stack>

        {/* Phần Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#22c55e",
            borderRadius: 2.5, // Bo góc đồng bộ với Card
            py: 1, // Padding dọc vừa phải
            textTransform: "none",
            boxShadow: "none", // Xóa bóng đổ mặc định của Button cho hiện đại
            "&:hover": {
              bgcolor: "#16a34a",
              boxShadow: "none"
            },
          }}
          startIcon={<HandsClappingIcon sx={{ width: 20, height: 20 }} />}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: "15px"
            }}
          >
            Mở bàn
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Card;