import React from "react";
import DeleteOutlineIcon from "../../../assets/icon/Trash.svg?reach";
import { Box, Chip, Stack, Typography } from "@mui/material";

const orderItems = [
  { id: 1, name: "Ba chỉ bò Mỹ", quantity: 2, status: 0 },
  { id: 2, name: "Cá mú đỏ", quantity: 2, status: 1 },
  { id: 3, name: "Bào ngư Hàn Quốc", quantity: 2, status: 0 },
  { id: 4, name: "Rau muống", quantity: 2, status: 1 },
  { id: 5, name: "Sò điệp Nhật", quantity: 2, status: 0 },
  { id: 6, name: "Ba chỉ heo cuộn nấm", quantity: 2, status: 1 },
  { id: 7, name: "Ba chỉ bò Mỹ", quantity: 2, status: 0 },
  { id: 8, name: "Ba chỉ bò Mỹ", quantity: 2, status: 0 },
];
// Map trạng thái
const statusConfig = {
  0: {
    label: "Đã phục vụ",
    bg: "#ffe5df",
    color: "#166534",
  },
  1: {
    label: "Đang làm ...",
    bg: "#22c55e",
    color: "#fff9f4",
  },
};

const Bill = () => {
  return (
    <Box
      sx={{
        width: "434px",
        height:"64px",
        py:"16px",
        border: "1px",
        borderRadius: "5px",
        my:"20px",
      }}
    >
      <Stack spacing={2.5}>
        {orderItems.map((item, index) => {
          const status = statusConfig[item.status];

          return (
            <Box
              key={item.id}
              sx={{
                backgroundColor: "white",
                px: 2,
                height: "64px",
                display: "flex",
                alignItems: "center",
                borderBottom:
                  index === 0 ? "1px solid rgba(177, 65, 53, 0.05)" : "none",
                width: "434px",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Tên món */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "174px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#0f172a",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>

                {/* Số lượng */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "56px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#0f172a",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Box>

                {/* Trạng thái */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "90px",
                  }}
                >
                  <Chip
                    label={status.label}
                    sx={{
                      backgroundColor: status.bg,
                      color: status.color,
                      fontWeight: 600,
                      fontSize: "12px",
                      height: "24px",
                      borderRadius: "12px",
                    }}
                  />
                </Box>

                {/* Delete */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "40px",
                  }}
                >
                  <Box
                    component="img"
                    src={DeleteOutlineIcon}
                    sx={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Bill;