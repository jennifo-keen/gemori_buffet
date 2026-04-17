import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Stack, Typography, CircularProgress } from "@mui/material";

import { useOrder } from '../order_context/OrderContext';

export const BtOrdCart = () => {
  const navigate = useNavigate();
    const { cart, order, submitOrder, cartTotal, tableCode } = useOrder();
    const [loading, setLoading] = useState(false);
  
   const handleSubmit = async () => {
    try {
      setLoading(true);
      await submitOrder();
      navigate(`/order/${tableCode}/menu`);
    } catch (err) {
      console.error('Gọi món thất bại:', err);
    } finally {
      setLoading(false);
    }
  };
    return (
    <Box
      component="section"
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)", 
        zIndex: 1100, 
        maxWidth: 430,
        width: "100%",
        borderTop: "1px solid rgba(138, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        backdropFilter: "blur(8px)", 
        p: 2,
        pb: 3,
      }}
    >
      <Stack spacing={1.5}>
        {/* Summary row */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={0.5}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            Tạm tính ({cartTotal} món):
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: "#8a0000" }}
          >
            {order?.ticket_name || '---'}
          </Typography>
        </Stack>

        {/* Order button */}
        <Button
          variant="contained"
          fullWidth
          endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          onClick={handleSubmit}
          disabled={loading || cart.length === 0}
          sx={{
            backgroundColor: "#a21a16",
            borderRadius: "12px",
            py: 1.75,
            fontFamily: "'Be Vietnam Pro', Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "1.6px",
            color: "#fff",
            textTransform: "none",
            boxShadow:
              "0px 4px 6px -4px rgba(138,0,0,0.3), 0px 10px 15px -3px rgba(138,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#8a0000",
            },
          }}
        >
          {loading ? 'ĐANG GỬI...' : 'GỌI MÓN NGAY'}
        </Button>
      </Stack>
    </Box>
  );
};

export default BtOrdCart;
