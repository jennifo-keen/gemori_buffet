import React from "react";
import Temp from "../../../assets/Image.png"
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const comboItems = [
  "Thịt bò Mỹ nhập khẩu",
  "Thịt bò Mỹ nhập khẩu",
  "Thịt bò Mỹ nhập khẩu",
];

export default function TrngThiKhngChn() {
  return (
    <Card
      sx={{
        width: "304px",
        height:"453.6px",
        borderRadius: "16px",
        border: "2px solid #FFF7F3",
        boxShadow: "0px 28px 8px rgba(189, 189, 189, 0.00), 0 18px 7px 0 rgba(189, 189, 189, 0.01), 0 10px 6px 0 rgba(189, 189, 189, 0.05), 0 4px 4px 0 rgba(189, 189, 189, 0.09), 0 1px 2px 0 rgba(189, 189, 189, 0.10)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="192"
          image={Temp}
          alt="Combo 299K"
          sx={{ objectFit: "cover" }}
        />
        <Chip
          label="299.000 VNĐ"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#b14135",
            fontWeight: 700,
            fontSize: "14px",
            height: "auto",
            padding: "4px 12px",
            "& .MuiChip-label": {
              padding: 0,
            },
          }}
        />
      </Box>

      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="h6"
          component="h2"
          align="left"
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#0f172a",
            marginBottom: 2,
          }}
        >
          Combo 299K
        </Typography>

        <Stack spacing={2} sx={{ marginBottom: 3 }}>
          {comboItems.map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon
                sx={{
                  width: 12,
                  height: 12,
                  color: "#22c55e",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 3,
            borderWidth: 2,
            borderColor: "#b4463c",
            color: "#b4463c",
            padding: "12px 0",
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "none",
            "&:hover": {
              borderWidth: 2,
              borderColor: "#b4463c",
              backgroundColor: "rgba(180, 70, 60, 0.04)",
            },
          }}
        >
          Chọn gói này
        </Button>
      </CardContent>
    </Card>
  );
}