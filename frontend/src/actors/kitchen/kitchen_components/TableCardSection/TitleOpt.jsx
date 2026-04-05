import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export const TitleOpt = () => {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: "2px solid #ffe5df",
        px: 3,
        py: 0,
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ minHeight: 40 }}
      >
        {/* Left group: STT + Tên món */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {/* STT column */}
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              textAlign="center"
              noWrap
            >
              STT
            </Typography>
          </Box>

          {/* Tên món column */}
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
            textAlign="center"
            noWrap
            sx={{ width: 161 }}
          >
            Tên món
          </Typography>
        </Stack>

        {/* SL column */}
        <Box
          sx={{
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
            textAlign="center"
            noWrap
          >
            SL
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default TitleOpt;