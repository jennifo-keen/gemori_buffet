import React from "react";
import Ticket from "../../../assets/Ticket.png"
import { Box, Stack, Typography } from "@mui/material";

export default function PropertyImage() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "628px",
        alignItems: "center",
        justifyContent: "space-between",
        p: "16px",
        m: "20px 24px 24px 24px",
        bgcolor: "white",
        borderBottom: "1px solid rgba(177, 65, 53, 0.05)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
        src={Ticket}
        component="img"
          sx={{
            width: 72,
            height: 72,
            borderRadius: "4px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Stack spacing={0}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              color: "#0F172A",
            }}
          >
            Buffet Adult x2
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: "12px",
              fontWeight: 400,

            }}
          >
            399.000 VNĐ/người
          </Typography>
        </Stack>
      </Stack>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          color: "#0F172A",
        }}
      >
        798.000 VNĐ
      </Typography>
    </Box>
  );
}