import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function CardTable() {
  return (
    <Box
      sx={{
        width: "267px",
        display: "flex",
        alignItems: "center",
        p: "20px",
        bgcolor: "white",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#FFE6D3",
            borderRadius: "50%",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#b54900",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            01
          </Typography>
        </Box>

        <Stack
          sx={{
            ml: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              color: "#0F172A",
              fontSize: "14px",
            }}
          >
            Bàn 01
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              color: "#64748B",
              fontSize: "12px",
            }}
          >
            Có khách
          </Typography>
        </Stack>

        <Box
          sx={{
            width: 10,
            height: 10,
            ml: 'auto',
            bgcolor: "#22c55e",
            borderRadius: "50%",
          }}
        />
      </Stack>
    </Box>
  );
}