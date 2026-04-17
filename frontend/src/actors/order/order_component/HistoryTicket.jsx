import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import image from "../../../assets/img/Image.png";

const Order_HistoryTicket = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid #8a00000d",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between" 
        sx={{ width: "100%" }}
      >
        {/* Left */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            component="img"
            src={image}
            alt="Vé Buffet"
            sx={{ width: 44, height: 44, borderRadius: 2 }}
          />
          <Stack>
            <Typography variant="subtitle2" fontWeight="bold">
              Vé Buffet
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                whiteSpace: "normal", // FIX
              }}
            >
              02/12/2025 - Gemori Buffet
            </Typography>
          </Stack>
        </Stack>

        {/* Right */}
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ color: "#8a0000", ml: 1 }}
        >
          269k
        </Typography>
      </Stack>
    </Box>
  );
};

export default Order_HistoryTicket;