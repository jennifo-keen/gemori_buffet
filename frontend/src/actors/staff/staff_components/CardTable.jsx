import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function CardTable({ table, isSelected, onClick, disabled  }) {
  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        width: "167px",
        display: "flex",
        alignItems: "center",
        p: "20px 12px",
        bgcolor: disabled ? "#f1f5f9" : isSelected ? "#b4463c" : "#fff",
        borderRadius: "8px",
        border: isSelected ? "1.5px solid #b4463c" : "1px solid #E2E8F0",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s",
        "&:hover": onClick ? { borderColor: "#b4463c"} : {},
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
        {/* Circle number */}
        <Box
          sx={{
            width: 45 ,
            height:45,
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
              color: isSelected ? "#f0eeee" : "#0F172A",
              fontWeight: 500,
              fontSize: "14px",
              transition: "all 0.15s",
            }}
          >
            {table.name}
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              color: isSelected ? "#f0eeee" : "#64748B",
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