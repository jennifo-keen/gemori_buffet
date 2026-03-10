import React from "react";
import { Box, Typography } from "@mui/material";

const CENTER = 145;
const RADIUS = 94;
const CHAIR_W = 50;
const CHAIR_H = 39;

// 4 ghế, mỗi ghế cách nhau 90 độ
const CHAIR_ANGLES = [0, 90, 180, 270];

const TableComponent = ({ table }) => {
  const isActive = table.status === 1;
  const backgroundColor = isActive ? "#2563EB" : "#64748B";
  const chairColor = isActive ? "#93C5FD" : "#64748B";

  return (
    <Box sx={{ position: "relative", width: 290, height: 290 }}>
      {/* Bàn tròn */}
      <Box
        sx={{
          width: 118,
          height: 118,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor,
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "white", textAlign: "center" }}>
          Bàn số: {table.tableNumber}
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
      </Box>

      {/* Ghế */}
      {CHAIR_ANGLES.map((angleDeg, index) => {
        const angleRad = (angleDeg - 90) * (Math.PI / 180);
        const cx = CENTER + RADIUS * Math.cos(angleRad) - CHAIR_W / 2;
        const cy = CENTER + RADIUS * Math.sin(angleRad) - CHAIR_H / 2;

        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: cx,
              top: cy,
              width: CHAIR_W,
              height: CHAIR_H,
              transform: `rotate(${angleDeg}deg)`,
              transformOrigin: "center center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {/* Lưng ghế */}
            <Box sx={{ width: 34, height: 6, backgroundColor: chairColor, borderRadius: "6px", flexShrink: 0 }} />
            {/* Mặt ghế */}
            <Box sx={{ width: "100%", flex: 1, backgroundColor: chairColor, borderRadius: "4px" }} />
          </Box>
        );
      })}
    </Box>
  );
};

const Table_4 = ({ table }) => {
  return <TableComponent table={table} />;
};

export default Table_4;