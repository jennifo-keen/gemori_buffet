import React from "react";
import { Paper, Typography } from "@mui/material";

const SelectFloor = ({
  title,
  emptyTables,
  pendingTables,
  status,
}) => {
  const isActive = status === 1;

  const backgroundColor = isActive ? "#b4463c" : "#e5e7eb";
  const textColor = isActive ? "#fff7f3" : "#6b7280";

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor,
        width:223,
        padding: "16px 12px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <Typography fontWeight={700} fontSize={16} color={textColor}>
        {title}
      </Typography>

          <Typography fontSize={14} color={textColor}>
            Bàn trống: {emptyTables}
          </Typography>
          <Typography fontSize={14} color={textColor}>
            Bàn còn món chưa lên: {pendingTables}
          </Typography>
          
    </Paper>
  );
};

export default SelectFloor;