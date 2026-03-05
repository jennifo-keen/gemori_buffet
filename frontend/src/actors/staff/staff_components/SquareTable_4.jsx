import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const chairColor = "#64B5F6";

const ChairTop = () => (
  <Stack alignItems="center" spacing="3px">
    <Box sx={{ width: 38, height: 8, backgroundColor: chairColor, borderRadius: "5px" }} />
    <Box sx={{ width: 44, height: 34, backgroundColor: chairColor, borderRadius: "6px" }} />
  </Stack>
);

const ChairBottom = () => (
  <Stack alignItems="center" spacing="3px">
    <Box sx={{ width: 44, height: 34, backgroundColor: chairColor, borderRadius: "6px" }} />
    <Box sx={{ width: 38, height: 8, backgroundColor: chairColor, borderRadius: "5px" }} />
  </Stack>
);


const SquareTable_4 = ({ table = { tableNumber: 1, people: "3 người", dishes: "Món đã ra: 5/7" } }) => {
  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>

      {/* 2 ghế trên */}
      <Stack direction="row" spacing={1}>
        <ChairTop />
        <ChairTop />
      </Stack>

      {/* Hàng giữa: 2 ghế trái + bàn + 2 ghế phải */}
      <Stack direction="row" spacing={1} alignItems="center">

        <Stack
          spacing={0.5}
          sx={{
            width: 180,
            backgroundColor: "#1976D2",
            borderRadius: "12px",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
            Bàn số: {table.tableNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: "white", textAlign: "center", fontWeight: 500 }}>
            {table.people}
          </Typography>
          <Typography variant="body2" sx={{ color: "white", textAlign: "center", fontWeight: 500 }}>
            {table.dishes}
          </Typography>
        </Stack>

      </Stack>

      {/* 2 ghế dưới */}
      <Stack direction="row" spacing={1}>
        <ChairBottom />
        <ChairBottom />
      </Stack>

    </Box>
  );
};

export default SquareTable_4;