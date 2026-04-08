import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {getRelativeTime, isHighPriority } from "../../kitchen_utils/Component/OrdCardUntil";

export const HeaderOpt = ({ tableData }) => {
  const items     = tableData?.items || [];
  const firstItem = items[0];
  const relTime   = getRelativeTime(firstItem?.item_order_time);
  const highPrio  = isHighPriority(items);

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "#b4463c",
        borderRadius: "8px 8px 0px 0px",
        borderBottom: "1px solid #b141351a",
        p: 3,
        width: "100%",
      }}
    >
      <Stack spacing={1.5}>
        {/* Top row: table name + badge */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack spacing={0.5}>
            <Typography
              variant="h6"
              component="h1"
              sx={{ color: "white", fontWeight: "bold", lineHeight: 1.2 }}
            >
              Bàn số {tableData?.table_code}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: 600 }}
            >
              Order #{items[0]?.order_id?.slice(0, 8) || '---'} 
            </Typography>
          </Stack>

          {/* "Lâu nhất" badge */}
          {highPrio && (
          <Chip
            label="Lâu nhất"
            size="small"
            sx={{
              backgroundColor: "#fff1b9",
              color: "#c2863d",
              fontWeight: "bold",
              borderRadius: "999px",
              height: "auto",
              px: 0.5,
              "& .MuiChip-label": {
                px: 1,
                py: 0.5,
                fontSize: "0.75rem",
              },
            }}
          />
          )}
        </Stack>

        {/* Bottom row: clock icon + time ago */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <AccessTimeIcon sx={{ color: "white", width: 18, height: 18 }} />
          <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
            {relTime}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};