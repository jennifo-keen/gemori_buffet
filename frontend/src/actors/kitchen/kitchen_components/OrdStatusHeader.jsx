import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import {getPriorityLabel, formatOrderTime} from "../kitchen_utils/Component/OrdCardUntil"

import useAuthStaff from '../../staff/staff_hook/useAuthStaff';

export const OrdStatusHeader = ({ tableData }) => {
  const { admin } = useAuthStaff();
  const items         = tableData?.items || [];
  const priorityLabel = getPriorityLabel(items);
  const firstTime     =formatOrderTime(items[0]?.item_order_time);
  return (
    <Paper
      variant="outlined"
      sx={{ 
        borderRadius: 3, 
        p: 3,
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
              Bàn {tableData?.table_code}
            </Typography>
            {priorityLabel && (
            <Chip
              label={priorityLabel}
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
            )}
          </Stack>

          {/* Subtitle */}
          <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
            Mã đơn: #{items[0]?.order_id?.slice(0, 8) || '---'} • {items.length} món
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
            • Nhân viên: {admin?.full_name || '---'}
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
            {firstTime}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrdStatusHeader;