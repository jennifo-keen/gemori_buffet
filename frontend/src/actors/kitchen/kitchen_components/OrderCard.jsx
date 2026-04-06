import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import { STATUS_CONFIG } from "../kitchen_config/StatusOrdConfig";
import { getRelativeTime, getPriorityStatus, 
        getPriorityLabel, formatOrderTime 
      } from "../kitchen_utils/Component/OrdCardUntil";

export const OrdCard = ({ tableData, onViewDetail }) => {
  if (!tableData) return null;

  const { table_code, items } = tableData;
  const firstItem      = items[0];
  const otherCount     = items.length - 1;
  const priorityStatus = getPriorityStatus(items);
  const priorityLabel  = getPriorityLabel(items);
  const statusCfg      = STATUS_CONFIG[priorityStatus] || STATUS_CONFIG.pending;
  
  const relTime        = getRelativeTime(firstItem?.item_order_time);
  const orderTime      = formatOrderTime(firstItem?.item_order_time);
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: "#b141351a",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        width: 550,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#b141350d",
          borderBottom: "1px solid #b141351a",
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Left: Table name + priority */}
          <Stack spacing={0.25}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              color="slate.900"
              sx={{ color: "#0f172a", lineHeight: 1.3 }}
            >
              Bàn {table_code}
            </Typography>
            {priorityLabel && (
              <Typography variant="body2" fontWeight={600} sx={{ color: "#b4463c" }}>
                {priorityLabel}
              </Typography>
            )}
          </Stack>

          {/* Right: Time + relative time */}
          <Stack spacing={0.25} alignItems="flex-end">
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "#b4463c", fontSize: "1.1rem" }}
            >
              {orderTime}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {relTime}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Order item row */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px dashed #b141351a",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Quantity + Item details */}
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#b4463c", lineHeight: "2rem" }}
            >
              x{firstItem?.quantity}
            </Typography>
            <Stack spacing={0.25}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#0f172a" }}
              >
                {firstItem?.menu_name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {firstItem?.category}
              </Typography>
            </Stack>
          </Stack>

          {/* Status badge */}
          <Chip
            icon={
              <FiberManualRecordIcon
                sx={{ fontSize: 10, color: `${STATUS_CONFIG[firstItem?.status]?.dot || statusCfg.dot} !important` }} />}
            label={STATUS_CONFIG[firstItem?.status]?.label || 'Đang chờ'}
            sx={{
              bgcolor: STATUS_CONFIG[firstItem?.status]?.bg || statusCfg.bg,
              border: `1px solid ${STATUS_CONFIG[firstItem?.status]?.border || statusCfg.border}`,
              borderRadius: "999px",
              color: STATUS_CONFIG[firstItem?.status]?.color || statusCfg.color,
              fontWeight: 700,
              fontSize: "12px",
              px: 0.5,
              py: 1,
              "& .MuiChip-icon": {
                ml: 0.5,
              },
            }}
          />
        </Stack>
      </Box>

      {/* "... and 3 more items waiting" */}
      {otherCount > 0 && (
      <Box
        sx={{
          py: 1,
          px: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          ... và {otherCount} món khác đang chờ
        </Typography>
      </Box>
    )}
      {/* Footer with action button */}
      <Box sx={{ bgcolor: "grey.50", p: 1.5 }}>
        <Button
          variant="contained"
          onClick={() => onViewDetail?.(tableData)}
          fullWidth
          sx={{
            bgcolor: "#b4463c",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 1.5,
            py: 1.5,
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#9e3b32",
            },
          }}
        >
          Xem chi tiết
        </Button>
      </Box>
    </Card>
  );
};

export default OrdCard;