import React from "react";
import TicketImg from "../../../assets/img/Ticket.png"
import { Box, Stack, Typography } from "@mui/material";

export default function Ticket({ ticket }) {
  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN').format(amount || 0) + ' VNĐ';

  return (
    <Box
      sx={{
        display: "flex",
        width: "628px",
        alignItems: "center",
        justifyContent: "space-between",
        p: "16px",
        // m: "20px 24px 24px 24px",
        bgcolor: "white",
        borderBottom: "1px solid rgba(177, 65, 53, 0.05)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
        src={ticket?.image_url || TicketImg}
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
            {ticket?.ticket_name} × {ticket?.ticket_quantity}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: "12px",
              fontWeight: 400,

            }}
          >
            {formatVND(ticket?.ticket_price)}/người
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
        {formatVND((ticket?.ticket_price || 0) * (ticket?.ticket_quantity || 0))}
      </Typography>
    </Box>
  );
}