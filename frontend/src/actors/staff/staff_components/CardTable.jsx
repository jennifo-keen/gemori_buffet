import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function CardTable({ table }) {
  return (
    <Box
      sx={{
        width: "167px",
        display: "flex",
        alignItems: "center",
        p: "20px 12px",
        bgcolor: "white",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
        {/* Circle number */}
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
            {table.id}
          </Typography>
        </Box>

        {/* Table info */}
        <Stack ml={2}>
          <Typography
            sx={{
              fontWeight: 500,
              color: "#0F172A",
              fontSize: "14px",
            }}
          >
            {table.name}
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              color: "#64748B",
              fontSize: "12px",
            }}
          >
            {table.status}
          </Typography>
        </Stack>

        {/* Status dot */}
        {table.dot && (
          <Box
            sx={{
              width: 10,
              height: 10,
              ml: "auto",
              bgcolor: table.dot,
              borderRadius: "50%",
            }}
          />
        )}
      </Stack>
    </Box>
  );
}