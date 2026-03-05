import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

const CHAIR_COUNT_TOP = 5;
const CHAIR_COUNT_BOTTOM = 5;

const Chair = ({ color }) => (
  <Stack alignItems="center" spacing="3px">
    {/* Lưng ghế */}
    <Box sx={{ width: 38, height: 8, backgroundColor: color, borderRadius: "5px" }} />
    {/* Mặt ghế */}
    <Box sx={{ width: 44, height: 34, backgroundColor: color, borderRadius: "6px" }} />
  </Stack>
);

const ChairFlipped = ({ color }) => (
  <Stack alignItems="center" spacing="3px">
    {/* Mặt ghế */}
    <Box sx={{ width: 44, height: 34, backgroundColor: color, borderRadius: "6px" }} />
    {/* Lưng ghế */}
    <Box sx={{ width: 38, height: 8, backgroundColor: color, borderRadius: "5px" }} />
  </Stack>
);

const TableComponent = ({ table }) => {
  const isActive = table.status !== "OFF";
  const tableColor = isActive ? "#c2863d" : "#64748b";
  const chairColor = isActive ? "#e6a84a" : "#94a3b8";

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      {/* Hàng ghế trên */}
      <Stack direction="row" spacing={1}>
        {Array.from({ length: CHAIR_COUNT_TOP }).map((_, i) => (
          <Chair key={i} color={chairColor} />
        ))}
      </Stack>

      {/* Bàn */}
      <Paper
        elevation={0}
        sx={{
          width: 340,
          heigh:92,
          backgroundColor: tableColor,
          borderRadius: "12px",
          py: 2.5,
          px: 3,
        }}
      >
        <Stack spacing={0.5} alignItems="center">
          <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "white", textAlign: "center" }}>
            Bàn số: {table.tableNumber}
          </Typography>
          {table.people && (
            <Typography sx={{ fontWeight: 400, fontSize: "14px", color: "white", textAlign: "center" }}>
              {table.people}
            </Typography>
          )}
          {table.dishes && (
            <Typography sx={{ fontWeight: 400, fontSize: "14px", color: "white", textAlign: "center" }}>
              {table.dishes}
            </Typography>
          )}
          {table.status === "OFF" && (
            <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "white", textAlign: "center" }}>
              OFF
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Hàng ghế dưới */}
      <Stack direction="row" spacing={1}>
        {Array.from({ length: CHAIR_COUNT_BOTTOM }).map((_, i) => (
          <ChairFlipped key={i} color={chairColor} />
        ))}
      </Stack>
    </Box>
  );
};


const Table_10 = ({ table }) => {
  return (
    <Box sx={{ p: 4, background: "#f8fafc", display: "inline-block", border: "1px dashed #8a38f5", borderRadius: 2 }}>
      <TableComponent table={table} />
    </Box>
  );
};

export default Table_10;