import React from "react";
import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon        from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import { useOrder } from '../order_context/OrderContext';

export const OrdMenus = () => {
  const { cartTotal, submitOrder, cart, tableCode } = useOrder();
  const navigate = useNavigate();


  if (cartTotal === 0) return null; // ẩn khi giỏ trống

  const handleSubmit = async () => {
    try {
      await submitOrder();
    } catch (err) {
      console.error('Gọi món thất bại:', err);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb:"15px", mt:"10px" }}>
      <Stack
        direction="column"
        spacing={4}
        sx={{ width: 430, alignItems: "center" }} 
      >

      {/* Bottom action bar */}
      <Box
        sx={{
          
          display: "flex",
          alignItems: "center",
          p: 1.5,
          bgcolor: "white",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "grey.100",
          boxShadow:
            "0px 10px 15px -3px rgba(0,0,0,0.1), 0px -4px 20px -5px rgba(0,0,0,0.1)",
          width: 358,
        }}
      >
        {/* Left: icon + label */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ flex: 1 }}
        >
          {/* Shopping bag icon with badge */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(138,0,0,0.05)",
                borderRadius: "12px",
              }}
            >
              <ShoppingBagOutlinedIcon
                sx={{ width: 24, height: 24, color: "#a21a16" }}
              />
            </Box>
            {/* Badge */}
            <Box
              sx={{
                position: "absolute",
                top: -6,
                right: -6,
                minWidth: 18,
                height: 18,
                bgcolor: "error.main",
                borderRadius: "50%",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 0.25,
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Epilogue', Helvetica",
                  fontWeight: 700,
                  fontSize: 9,
                  color: "white",
                  lineHeight: "13.5px",
                }}
              >
                {cartTotal}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "grey.900", fontSize: 14 }}
          >
            {cartTotal} Món
          </Typography>
        </Stack>

        {/* Xem giỏ hàng button */}
        <Button
          variant="contained"
          onClick={() => navigate(`/order/${tableCode}/cart`)}
          endIcon={<ArrowForwardIcon sx={{ width: 14, height: 14 }} />}
          sx={{
            bgcolor: "#ca9600",
            color: "white",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 11,
            px: 1.5,
            py: 1,
            mr: 1,
            whiteSpace: "nowrap",
            boxShadow:
              "0px 2px 4px -2px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "#b38400" },
          }}
        >
          Xem giỏ hàng
        </Button>

        {/* Gọi món button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#a21a16",
            color: "white",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 13,
            px: 2,
            py: 1,
            alignSelf: "stretch",
            boxShadow:
              "0px 2px 4px -2px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "#8a1512" },
          }}
        >
          Gọi món
        </Button>
      </Box>
    </Stack>
    </Box>
  );
};

export default OrdMenus;
