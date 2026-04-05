import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";

export const OrdCard = () => {
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
              Bàn số 05
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: "#b4463c" }}
            >
              Ưu tiên cao
            </Typography>
          </Stack>

          {/* Right: Time + relative time */}
          <Stack spacing={0.25} alignItems="flex-end">
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "#b4463c", fontSize: "1.1rem" }}
            >
              12:45
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              12 phút trước
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
              x2
            </Typography>
            <Stack spacing={0.25}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#0f172a" }}
              >
                Ba chỉ bò Mỹ
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Ghi chú: Cắt mỏng
              </Typography>
            </Stack>
          </Stack>

          {/* Status badge */}
          <Chip
            icon={
              <FiberManualRecordIcon
                sx={{ fontSize: 10, color: "#f4ca66 !important" }}
              />
            }
            label="Đang chế biến"
           
            sx={{
              bgcolor: "#ffeed1",
              border: "1px solid #f4ca66",
              borderRadius: "999px",
              color: "#b4463c",
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
          ... và 3 món khác đang chờ
        </Typography>
      </Box>

      {/* Footer with action button */}
      <Box sx={{ bgcolor: "grey.50", p: 1.5 }}>
        <Button
          variant="contained"
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