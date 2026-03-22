import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";

const Nofi = ({
  title,
  subtitle,
  badges = [],
  onCancel,
  onConfirm,
  confirmText = "Tiếp tục",
  cancelText = "Hủy",
}) => {
  const [reason, setReason] = useState('');

  return (
    <Box
      sx={{
        width:"494px",
        p:"24px",
        gap: "16px",
        backgroundColor: "white",
        borderRadius: "12px",
        border: "1px solid rgba(177, 65, 53, 0.05)",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={1} alignItems="center">
          <NotificationsIcon
            sx={{
              width: 60,
              height: 60,
              color: "#b4463c",
            }}
          />
           <Typography
            variant="h5"
            fontWeight="bold"
            color="#0F172A"
            textAlign="center"
            width="100%"
            sx={{
              fontSize: "24px", 
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="#475569"
          textAlign="center"
          width="100%"
           sx={{
              fontSize: "14px", 
              fontWeight: 500,
            }}
        >
          {subtitle}
        </Typography>

        <Stack spacing={1}>
          {/* Lý do + badges */}
          {badges.length > 0 && (
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%", p: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: 500, color: "#0f172a" }}>
                Lý do
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {badges.map((badge) => (
                  <Chip
                    key={badge.id}
                    label={badge.label}
                    onClick={() => setReason(badge.label)}
                    sx={{
                      bgcolor: reason === badge.label ? "#b4463c" : "#ffe5df",
                      color: reason === badge.label ? "white" : "#166534",
                      fontWeight: 700,
                      fontSize: "10px",
                      height: 28,
                      borderRadius: 50,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          )}

          <TextField
            placeholder="Nhập lý do ..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fafafa",
                borderRadius: "8px",
                border: "1px solid rgba(177, 65, 53, 0.10)",
                "& fieldset": {
                  borderColor: "rgba(177, 65, 53, 0.1)",
                },
                "& input": {
                  color: "#d4d4d4",
                  fontSize: "14px",
                  fontWeight: "500",
                },
              },
            }}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={onCancel}
              fullWidth
              sx={{
                borderWidth: 2,
                borderColor: "#b4463c",
                color: "#b4463c",
                fontWeight: 600,
                fontSize: "1rem",
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: "#b4463c",
                  bgcolor: "rgba(180, 70, 60, 0.04)",
                },
              }}
            >
              {cancelText}
            </Button>

            <Button
              variant="contained"
              onClick={() => onConfirm?.(reason)}
              fullWidth
              sx={{
                bgcolor: "#b4463c",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#9a3a32",
                },
              }}
            >
              {confirmText}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Nofi;