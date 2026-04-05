import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

export const OrdStatusHeader = () => {
  return (
    <Paper
      variant="outlined"
      sx={{ 
        borderRadius: 3, 
        p: 3,
        // width: "1114px",
    }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* Left section: title, badge, subtitle */}
        <Stack spacing={0.5}>
          {/* Title row with badge */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              variant="h5"
              component="h3"
              fontWeight="bold"
              sx={{ color: "#b14135", lineHeight: 1.2 }}
            >
              Bàn 05
            </Typography>
            <Chip
              label="Ưu tiên"
              size="small"
              sx={{
                backgroundColor: "#b141351a",
                color: "#b4463c",
                border: "1px solid #b4463c",
                borderRadius: "999px",
                fontWeight: "bold",
                fontSize: "0.75rem",
                height: 28,
              }}
            />
          </Stack>

          {/* Subtitle */}
          <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
            Mã đơn: #GM-8829 • 12 món 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
            • Nhân viên: Nguyễn Văn A
          </Typography>
        </Stack>

        {/* Right section: time box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 4,
            py: 2,
            backgroundColor: "#b141350d",
            borderRadius: 3,
            border: "1px solid #b141351a",
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            Giờ đặt
          </Typography>
          <Typography
            variant="h4"
            component="span"
            fontWeight="bold"
            color="text.primary"
            sx={{ lineHeight: 1.2 }}
          >
            12:45
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrdStatusHeader;