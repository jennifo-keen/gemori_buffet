import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Stack, Typography } from "@mui/material";

const SuccessNofi = ({ title, subtitle, onConfirm, confirmText = "Tiếp tục" }) => {
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
      <Stack 
      alignItems="center"
      sx={{
        display: "flex",
        gap: "16px",
      }}
      >
        <Stack alignItems="center" width="100%">
          <CheckCircleIcon
            sx={{
              width: 60,
              height: 60,
              color: "#B4463C",
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
          fontWeight="medium"
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

        <Stack width="100%">
          <Button
            variant="contained"
            onClick={onConfirm}
            fullWidth
            sx={{
              backgroundColor: "#B4463C",
              borderRadius: 3,
              height: 48,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#9A3A32",
              },
            }}
          >
            {confirmText}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SuccessNofi;