import React from "react";
import Favorite from "@mui/icons-material/Favorite";
import PersonAdd from "../../../assets/UserCirclePlus.svg?react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const MemberShip_Input = () => {
  return (
    <Box>
      <Stack
        spacing={1.5}
        sx={{
          px: 1.25,
          py: 2.5,
          border: "1px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "384px",
            p: "24px",
            gap: "16px",
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

            <Stack spacing={2} alignItems="flex-start">
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#64748B",
                }}
              >
                Kiểm tra thông tin hội viên bằng số điện thoại
              </Typography>

              <Stack direction="row" spacing={1}>
                <TextField
                  placeholder="Nhập số điện thoại..."
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                      backgroundColor: "#F5F5F5",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "rgba(177, 65, 53, 0.2)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                      color: "#6B7280",
                      padding: "16px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#B4463C",
                    color: "white",
                    fontSize: 14,
                    textTransform: "none",
                    px: 2,
                    py: 1.5,
                    borderRadius: "8px",
                    border: "1px solid rgba(177, 65, 53, 0.2)",
                    whiteSpace: "nowrap",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "#9A3A32",
                    },
                  }}
                >
                  Kiểm tra
                </Button>
              </Stack>
            </Stack>

            <Button
              variant="outlined"
              startIcon={
                <Box
                  component="img"
                  src={PersonAdd}
                  sx={{ 
                      width: 20, 
                      height: 20 
                    }} 
                  />
                }
              sx={{
                height: 50,
                border: "2px dashed #B4463C",
                borderRadius: "12px",
                color: "#B4463C",
                fontSize: 14,
                fontWeight: 700,
                textTransform: "none",
                backgroundColor: "white",
                "&:hover": {
                  border: "2px dashed #B4463C",
                  backgroundColor: "rgba(180, 70, 60, 0.04)",
                },
              }}
            >
              Thêm hội viên mới
            </Button>
          </Stack>
        </Paper>

        
      </Stack>
    </Box>
  );
};

export default MemberShip_Input;