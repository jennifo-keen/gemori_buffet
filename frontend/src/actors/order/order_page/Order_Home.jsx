import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Img from '../../../assets/img/ord_intro.png'

import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";

export const Order_Home= () => {
  const navigate = useNavigate();
  const { tableCode } = useParams();

const handleOrderNow = () => {
  navigate(`/order/${tableCode}/menu`);
};

const handleLogin = () => {
  navigate(`/order/${tableCode}/login`);
};

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", 
        position: "relative",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <Box
        src={Img}
        component="img"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover", //ảnh không bị méo khi full màn hình
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: "24px 24px 0 0",
          px: 3,
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        {/* Text content */}
        <Stack spacing={1} alignItems="center">
            <Typography
              sx={{
                fontWeight: 700, 
                fontSize: 18,
                color: "#0f172a",
                textAlign: "center"
              }}
            >
              Gemori hân hạnh được phục vụ Quý khách!
            </Typography>
            
            <Typography
              sx={{
                color: "#64748b",
                fontWeight: 400,
                fontSize: 14,
                textAlign: "center"
              }}
            >
              Hương vị tuyệt vời đang chờ bạn, gọi món ngay thôi.
            </Typography>
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* Gọi món ngay button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleOrderNow}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: 3,
            height: 54, 
            fontWeight: 700,
            fontSize: 16,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#222",
            },
          }}
        >
          Gọi món ngay
        </Button>

        {/* Đăng nhập button */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "transparent",
            color: "#000",
            borderColor: "#000",
            borderRadius: 3,
            height: 54, 
            fontWeight: 700,
            fontSize: 16,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "#000",
            },
          }}
        >
          Đăng nhập thành viên
        </Button>
      </Paper>
    </Box>
  );
};

export default Order_Home;