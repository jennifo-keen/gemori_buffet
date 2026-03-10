import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

// Component Ghế nằm ngang (cho hàng Trên & Dưới)
const ChairVertical = ({ color }) => (
  <Stack alignItems="center" spacing="3px">
    <Box sx={{ width: 38, height: 8, backgroundColor: color, borderRadius: "5px" }} />
    <Box sx={{ width: 44, height: 34, backgroundColor: color, borderRadius: "6px" }} />
  </Stack>
);

// Component Ghế nằm dọc (cho hàng Trái & Phải)
const ChairHorizontal = ({ color, flip = false }) => (
  <Stack direction={flip ? "row-reverse" : "row"} alignItems="center" spacing="3px">
    <Box sx={{ width: 8, height: 38, backgroundColor: color, borderRadius: "5px" }} />
    <Box sx={{ width: 34, height: 44, backgroundColor: color, borderRadius: "6px" }} />
  </Stack>
);

const TableComponent = ({ 
  table, 
  tableActiveColor = "#c2863d",
  tableEmptyColor = "#64748b",
  chairActiveColor = "#e6a84a",
  chairEmptyColor = "#94a3b8",
  chairTop = 5,
  chairBottom = 5,
  chairLeft = 0, 
  chairRight = 0  
}) => {
  const isActive = table.status === 1;
  const currentTableColor = isActive ? tableActiveColor : tableEmptyColor;
  const currentChairColor = isActive ? chairActiveColor : chairEmptyColor;

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      
      {/* 1. Hàng ghế TRÊN */}
      <Stack direction="row" spacing={1}>
        {Array.from({ length: chairTop }).map((_, i) => (
          <Box key={`top-${i}`} sx={{ transform: "rotate(0deg)" }}>
            <ChairVertical color={currentChairColor} />
          </Box>
        ))}
      </Stack>

      <Stack direction="row" alignItems="center" spacing="6px">
        {/* 2. Cột ghế BÊN TRÁI */}
        <Stack spacing={1}>
          {Array.from({ length: chairLeft }).map((_, i) => (
            <ChairHorizontal key={`left-${i}`} color={currentChairColor} />
          ))}
        </Stack>

        {/* 3. MẶT BÀN CHÍNH */}
        <Paper
          elevation={0}
          sx={{
            minWidth: Math.max(chairTop, chairBottom, 2) * 52,
            minHeight: Math.max(chairLeft, chairRight, 1) * 52, // Chiều cao tự giãn theo số ghế hai bên
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
             {isActive ? (
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

        {/* 4. Cột ghế BÊN PHẢI */}
        <Stack spacing={1}>
          {Array.from({ length: chairRight }).map((_, i) => (
            <ChairHorizontal key={`right-${i}`} color={currentChairColor} flip />
          ))}
        </Stack>
      </Stack>

      {/* 5. Hàng ghế DƯỚI */}
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

// Component sử dụng
const UltimateTable = (props) => (
  <Box sx={{ p: 5, display: "inline-block" }}>
    <TableComponent {...props} />
  </Box>
);

export default UltimateTable;