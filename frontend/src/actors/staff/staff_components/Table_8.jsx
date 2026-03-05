import React from "react";
import { Box, Typography } from "@mui/material";

// Tâm container: 290/2 = 145
// Bán kính ghế cách tâm bàn: ~115px (bàn r=77, + khoảng cách)
const CENTER = 145;
const RADIUS = 112;
const CHAIR_W = 50;
const CHAIR_H = 39;

// 8 ghế, mỗi ghế cách nhau 45 độ, bắt đầu từ góc trên
const CHAIR_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const TableComponent = ({ table }) => {
  const isActive = table.status === 1;
  const backgroundColor = isActive ? "#16a34a" : "#64748b";
  const chairColor = isActive ? "#22c55e" : "#94a3b8";

  return (
    <Box
      sx={{
        position: "relative",
        width: 290,
        height: 290,
      }}
    >
      {/* Bàn tròn — căn giữa tuyệt đối */}
      <Box
        sx={{
          width: 154,
          height: 154,
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
        <Typography sx={{ fontWeight: 700, fontSize: "20px", color: "white", textAlign: "center" }}>
          Bàn số: {table.tableNumber}
        </Typography>

        {isActive ? (
          <>
            <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "white", textAlign: "center" }}>
              {table.capacity}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "white", textAlign: "center" }}>
              {table.foodStatus}
            </Typography>
          </>
        ) : (
          <Typography sx={{ fontWeight: 500, fontSize: "16px", color: "white", textAlign: "center" }}>
            OFF
          </Typography>
        )}
      </Box>

      {/* Ghế — tính bằng sin/cos từ tâm */}
      {CHAIR_ANGLES.map((angleDeg, index) => {
        const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 để bắt đầu từ trên
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
            <Box
              sx={{
                width: 34,
                height: 6,
                backgroundColor: chairColor,
                borderRadius: "6px",
                flexShrink: 0,
              }}
            />
            {/* Mặt ghế */}
            <Box
              sx={{
                width: "100%",
                flex: 1,
                backgroundColor: chairColor,
                borderRadius: "4px",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const Table_8 = ({ table }) => {
  return <TableComponent table={table} />;
};
export default Table_8;