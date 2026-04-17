import React from 'react';

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import image from "../../../assets/img/Image.png"

export const Order_HistoryCart = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#8a00000d",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Product image */}
          <Box
            component="img"
            src={image}
            alt="Bò Wagyu Thượng Hạng"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          {/* Product details */}
          <Stack spacing={0.5} flex={1}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
              sx={{ lineHeight: "20px" }}
            >
              Bò Wagyu Thượng Hạng
            </Typography>

            <Typography
              variant="body2"
              fontWeight="medium"
              color="#8a0000"
              sx={{
                lineHeight: "20px",
                minHeight: 32,
                display: "flex",
                alignItems: "center",
              }}
            >
              Số lượng: 02
            </Typography>

            {/* Status indicator */}
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: "green" }} />
              <Typography
                variant="body2"
                fontWeight="bold"
                color="green"
                sx={{ lineHeight: "20px" }}
              >
                Đã phục vụ
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Order_HistoryCart;