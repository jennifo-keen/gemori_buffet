import React from 'react';
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import { Box, Paper, Stack, Typography } from "@mui/material";

export const Order_ItemAcc = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid rgba(138, 0, 0, 0.1)",
        borderRadius: 3,
        p: "8px",
        height: 98,
        width: 240,
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={1}
        height="100%"
      >
        {/* Wallet icon with circular background */}
        <Box
          sx={{
            width: 44,
            height: 47,
            borderRadius: "50%",
            backgroundColor: "rgba(138, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountBalanceWallet sx={{ color: "#8a0000", fontSize: 24 }} />
        </Box>

        {/* Text content */}
        <Stack alignItems="center" spacing={0.5} width="100%">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="slate.900"
            textAlign="center"
            sx={{ color: "#1e293b", lineHeight: 1.2 }}
          >
            Ví Voucher
          </Typography>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ color: "#94a3b8", fontSize: 12, lineHeight: "15px" }}
          >
            12 ưu đãi
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Order_ItemAcc;