import React from 'react';

import ItemSet from "../order_component/ItemUserpf"
import Header from "../order_component/HeaderUser"

import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

export const OrderSetting = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFF7F4",
        pb: 4, 
      }}
    >
        <Header title="Cài đặt" />
      <Stack sx={{ width: "100%", p: 2 }}>
        <Typography 
          variant="OrderSetting2"
          sx={{
            fontWeight: 800,
            color: "#bc4d42",
            mb: 1.5, 
            letterSpacing: 1.2,
            fontSize: "0.75rem",
            px: 0.5, 
          }}
        >
          TÀI KHOẢN & ĐỊA CHỈ
        </Typography>

        <Box
          sx={{
            bgcolor: "#fff",
            px: 2,
            borderRadius: "12px", 
            boxShadow: "0px 2px 4px rgba(0,0,0,0.02)", 
            overflow: "hidden", 
          }}
        >
          <ItemSet title="Thông tin cá nhân" />
          <Divider sx={{ mx: 2 }} /> 
          <ItemSet title="Địa chỉ của tôi" />
        </Box>
      </Stack>
      
      <Stack sx={{ width: "100%", p: 2, pt: 0 }}> 
        <Typography 
          variant="body2"
          sx={{
            fontWeight: 800,
            color: "#bc4d42",
            mb: 1.5,
            letterSpacing: 1.2,
            fontSize: "0.75rem",
            px: 0.5,
          }}
        >
          HỖ TRỢ & PHÁP LÝ
        </Typography>

        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.02)",
            overflow: "hidden",
            px: 2,
          }}
        >
          <ItemSet title="Trung tâm hỗ trợ" />
          <Divider sx={{ mx: 2 }} />
          <ItemSet title="Chính sách bảo mật" />
          <Divider sx={{ mx: 2 }} />
          <ItemSet title="Điều khoản sử dụng" />
        </Box>
      </Stack>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)", 
            width: "100%",
            maxWidth: 430, 
            p: 2,          
            backdropFilter: "blur(8px)",
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            startIcon={<LogoutOutlined sx={{ width: 20, height: 20 }} />}
            sx={{
              backgroundColor: "#a21a16",
              borderRadius: "12px",
              px: 2,
              py: 1.5,
              width: "100%", // Chiếm hết chiều rộng của Box bọc ngoài (430px)
              fontWeight: "bold",
              fontSize: "0.875rem",
              textTransform: "none",
              color: "#fff",
              boxShadow: "0px 4px 6px -4px #8a000033, 0px 10px 15px -3px #8a000033",
              "&:hover": {
                backgroundColor: "#8a1512",
              },
            }}
          >
            Đăng xuất
          </Button>
        </Box>
    </Box>
  );
};

export default OrderSetting;