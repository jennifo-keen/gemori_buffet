import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import Money from "../../../assets/Money.svg?react";

export const BtnPayment = () => {
  return (
    <Box
      sx={{
        width: 334,
        backgroundColor: "white",
        borderRadius: "12px",
        border: "2px solid rgba(177, 65, 53, 0.1)",
        p: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component="img" src={Money} sx={{ width: 28 }} />
        </Box>

        <Stack spacing={0}
          sx={{ 
            alignItems: "flex-start",
          }}>
          <Typography 
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#0f172a",
            }}>
            Tiền mặt
          </Typography>

          <Typography variant="body2"
           sx={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#64748B",
            }}>
            Cash Payment
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BtnPayment;