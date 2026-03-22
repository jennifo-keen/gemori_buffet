import React from "react";
import Favorite from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const MemberShip_Inf = ({ customer, onReset }) => {
  return (
    <Box>
      <Stack
        spacing={1.5}
        sx={{
          px: 1.25,
          py: 2.5,
          border: "1px ",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "384px",
            p: "24px",
            gap:" 16px",
            border: "1px solid rgba(177, 65, 53, 0.05)",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            borderRadius: "12px",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Favorite sx={{ width: 20, height: 20, color: "#B4463C" }} />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#0F172A",
                }}
              >
                Khách hàng thân thiết
              </Typography>
            </Stack>

            <Box
              sx={{
                p: "16px",
                gap: "12px",
                backgroundColor: "rgba(177, 65, 53, 0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(177, 65, 53, 0.1)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Stack 
                    spacing={0.25}
                    alignItems="flex-start">
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#64748B",
                    }}
                  >
                    Hội viên
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0F172A",
                    }}
                  >
                    {customer?.full_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#94A3B8",
                    }}
                  >
                    SĐT: {customer?.phone}
                  </Typography>
                </Stack>
                <Button
                  onClick={onReset}
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#B4463C",
                    textTransform: "none",
                    minWidth: "auto",
                    p: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Thay đổi
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default MemberShip_Inf;