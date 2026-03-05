import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";

const statusBadges = [
  { id: 1, label: "Đã phục vụ" },
  { id: 2, label: "Đã phục vụ" },
  { id: 3, label: "Đã phục vụ" },
  { id: 4, label: "Đã phục vụ" },
];

const Nofi = () => {
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
            Tiêu đề thông báo.
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
          Tiêu đề phụ của thông báo
        </Typography>

        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%",p: 0.5, bgcolor: "white" }}
          >
            <Typography
              variant="body2"
              color="#0f172a"
              sx={{ 
                fontSize: "14px", 
                fontWeight: 500,
                alignItems: "center",
              }}
            >
          
              Lý do
            </Typography>

            <Stack direction="row" spacing={1}>
              {statusBadges.map((badge) => (
                <Chip
                  key={badge.id}
                  label={badge.label}
                  sx={{
                    bgcolor: "#ffe5df",
                    color: "#166534",
                    fontWeight: "700",
                    fontSize: "10px",
                    height: 28,
                    borderRadius: 50,
                    
                  }}
                />
              ))}
            </Stack>
          </Stack>

          <TextField
            placeholder="Nhập lý do ..."
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
              Hủy
            </Button>

            <Button
              variant="contained"
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
              Tiếp tục
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Nofi;