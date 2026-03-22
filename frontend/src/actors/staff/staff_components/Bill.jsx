import React from "react";
import DeleteOutlineIcon from "../../../assets/icon/Trash.svg?reach";

import { ORDER_ITEM_STATUS } from '../staff_config/staticConfig';

import { Box, Chip, Stack, Typography } from "@mui/material";


const Bill = ({ item }) => {
  if (!item) return null;
  const status = ORDER_ITEM_STATUS[item.status] || ORDER_ITEM_STATUS.pending;

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
            <Box
              key={item.id}
              sx={{
                backgroundColor: "white",
                px: 2,
                height: "64px",
                display: "flex",
                alignItems: "center",
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
      </Stack>
    </Box>
  );
};

export default Bill;