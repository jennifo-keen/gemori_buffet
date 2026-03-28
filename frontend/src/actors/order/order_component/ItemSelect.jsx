import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import image from "../../../assets/img/Image.png"

// Quantity counter component for reusability
const QuantityCounter = ({ value, onDecrement, onIncrement }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    sx={{
      bgcolor: "white",
      borderRadius: "999px",
      px: 1,
      py: 0.5,
    }}
  >
    <IconButton
      onClick={onDecrement}
      size="small"
      disableRipple
      sx={{
        width: 24,
        height: 24,
        p: 0,
        color: "#8a0000",
        fontFamily: "'Epilogue-Bold', Helvetica",
        fontWeight: "bold",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        "&:hover": { bgcolor: "transparent" },
      }}
    >
      −
    </IconButton>

    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        textAlign: "center",
        minWidth: 12,
        color: "#1e293b",
      }}
    >
      {value}
    </Typography>

    <IconButton
      onClick={onIncrement}
      size="small"
      disableRipple
      sx={{
        width: 24,
        height: 24,
        p: 0,
        color: "#8a0000",
        fontFamily: "'Epilogue-Bold', Helvetica",
        fontWeight: "bold",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        "&:hover": { bgcolor: "transparent" },
      }}
    >
      +
    </IconButton>
  </Stack>
);

const Order_ItemSelect= () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <Stack
      component="article"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: 108,
        px: 2,
        py: 1,
        bgcolor: "white",
        position: "relative",
      }}
    >
      {/* Left section: image + text info */}
      <Stack direction="row" alignItems="center" spacing={2} flex={1}>
        <Box
          component="img"
          src={image}
          alt="Thịt bò Wagyu"
          sx={{
            width: 72,
            height: 72,
            objectFit: "cover",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />

        {/* Product name and category */}
        <Stack justifyContent="center" flex={1} alignSelf="stretch">
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#1e293b",
              lineHeight: 1.4,
            }}
          >
            Thịt bò Wagyu
          </Typography>

          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "#c5a059",
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            Buffet
          </Typography>
        </Stack>
      </Stack>

      {/* Right section: quantity counter */}
      <Stack justifyContent="center" alignSelf="stretch" sx={{ width: 101 }}>
        <QuantityCounter
          value={quantity}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      </Stack>
    </Stack>
  );
};

export default Order_ItemSelect;