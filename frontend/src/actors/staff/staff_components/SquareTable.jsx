import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

const ChairVertical = ({ color }) => (
  <Stack alignItems="center" spacing="3px">
    <Box sx={{ width: 38, height: 8, backgroundColor: color, borderRadius: "5px" }} />
    <Box sx={{ width: 44, height: 34, backgroundColor: color, borderRadius: "6px" }} />
  </Stack>
);

const ChairHorizontal = ({ color, flip = false }) => (
  <Stack direction={flip ? "row-reverse" : "row"} alignItems="center" spacing="3px">
    <Box sx={{ width: 8, height: 38, backgroundColor: color, borderRadius: "5px" }} />
    <Box sx={{ width: 34, height: 44, backgroundColor: color, borderRadius: "6px" }} />
  </Stack>
);

const TableComponent = ({
  table,
  tableActiveColor = "#2563EB",
  tableEmptyColor  = "#64748b",
  chairActiveColor = "#60A5FA",
  chairEmptyColor  = "#94a3b8",
  chairTop    = 2,
  chairBottom = 2,
  chairLeft   = 0,
  chairRight  = 0,
}) => {
  const isActive      = table.status === 1;
  const isMaintenance = table.status === 2;

  const currentTableColor = isMaintenance
    ? "#B4463C"
    : isActive
    ? tableActiveColor
    : tableEmptyColor;

  const currentChairColor = isMaintenance
    ? "#FCA5A5"
    : isActive
    ? chairActiveColor
    : chairEmptyColor;

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>

      {/* Ghế trên */}
      <Stack direction="row" spacing={1}>
        {Array.from({ length: chairTop }).map((_, i) => (
          <Box key={`top-${i}`}>
            <ChairVertical color={currentChairColor} />
          </Box>
        ))}
      </Stack>

      <Stack direction="row" alignItems="center" spacing="6px">
        {/* Ghế trái */}
        <Stack spacing={1}>
          {Array.from({ length: chairLeft }).map((_, i) => (
            <ChairHorizontal key={`left-${i}`} color={currentChairColor} />
          ))}
        </Stack>

        {/* Mặt bàn */}
        <Paper
          elevation={0}
          sx={{
            minWidth: 178,
            minHeight: Math.max(chairLeft, chairRight, 1) * 52,
            backgroundColor: currentTableColor,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 3,
            py: 2,
            transition: "all 0.3s ease",
          }}
        >
          <Stack spacing={0.5} alignItems="center">
            <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "white", whiteSpace: "nowrap" }}>
              Bàn {table.tableNumber}
            </Typography>

            {isMaintenance ? (
              <Typography sx={{ fontWeight: 600, fontSize: "13px", color: "white", textAlign: "center" }}>
                 Bảo trì
              </Typography>
            ) : isActive ? (
              <>
                <Typography sx={{ fontWeight: 500, fontSize: "12px", color: "white", textAlign: "center" }}>
                  {table.capacity}
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: "12px", color: "white", textAlign: "center" }}>
                  {table.foodStatus}
                </Typography>
              </>
            ) : (
              <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "white", textAlign: "center" }}>
                OFF
              </Typography>
            )}
          </Stack>
        </Paper>

        {/* Ghế phải */}
        <Stack spacing={1}>
          {Array.from({ length: chairRight }).map((_, i) => (
            <ChairHorizontal key={`right-${i}`} color={currentChairColor} flip />
          ))}
        </Stack>
      </Stack>

      {/* Ghế dưới */}
      <Stack direction="row" spacing={1}>
        {Array.from({ length: chairBottom }).map((_, i) => (
          <Box key={`bottom-${i}`} sx={{ transform: "rotate(180deg)" }}>
            <ChairVertical color={currentChairColor} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const SquareTable = (props) => (
  <Box sx={{ display: "inline-block" }}>
    <TableComponent {...props} />
  </Box>
);

export default SquareTable;