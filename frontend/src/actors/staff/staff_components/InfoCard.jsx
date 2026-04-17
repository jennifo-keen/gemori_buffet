import React from "react";

import { Box, Stack, Typography } from "@mui/material";

export default function InfoCard({
  icon,
  label,
  title,
  subtitle,
  statusColor
}) {
  return (
    <Box
      sx={{
        width: 280,
        height: 164,
        minHeight: 164,
        flexShrink: 0,
        bgcolor: "#FFF",
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        p: 2.5,
        overflow: "hidden"
      }}
    >
      <Stack 
        spacing={2}
        justifyContent="space-between"
        sx={{
            height: "100%"
        }}
      >
        
        {/* Header */}
        <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center"
            fontSize= "24px"
        >
          {icon}
          <Typography 
            fontSize= "12px"
            fontWeight={700} 
            color="#64748B"
          >
            {label}
          </Typography>
        </Stack>

        {/* Title */}
        <Stack>
        <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center"
        >
          <Typography 
            fontSize={20} 
            fontWeight={700}
          >
            {title}
          </Typography>

          {statusColor && (
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: statusColor,
                borderRadius: "50%"
              }}
            />
          )}
        </Stack>

        {subtitle && (
          <Typography 
            color="#64748B"
            fontSize={12} 
            fontWeight={400}
          >
            {subtitle}
          </Typography>
        )}
        </Stack>
      </Stack>
    </Box>
  );
}