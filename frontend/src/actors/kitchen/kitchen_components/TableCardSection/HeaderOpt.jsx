import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const HeaderOpt = () => {
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
              Bàn số 01
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: 600 }}
            >
              Order #8821
            </Typography>
          </Stack>

          {/* "Lâu nhất" badge */}
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
        </Stack>

        {/* Bottom row: clock icon + time ago */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <AccessTimeIcon sx={{ color: "white", width: 18, height: 18 }} />
          <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
            18 Phút trước
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};