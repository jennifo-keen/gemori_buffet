import React from "react";
import { Box, IconButton, Stack, Typography, Chip } from "@mui/material";

import { useOrder } from '../order_context/OrderContext';

import image from "../../../assets/img/Image.png"

import { STATUS_CONFIG } from '../order_config/statusConfig';

// Quantity counter component for reusability
const QuantityCounter = ({ value, onDecrement, onIncrement, maxQuantity }) => (
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
      disabled={maxQuantity !== null && value >= maxQuantity}
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
        "&:disabled": { color: "#cbd5e1", cursor: "not-allowed" },
      }}
    >
      +
    </IconButton>
  </Stack>
);

const Order_ItemSelect = ({ item, mode = 'cart' }) => {
  const { addToCart, removeFromCart, getCartQty } = useOrder();
  const qty = mode === 'cart' ? (item.quantity || getCartQty(item.id)) : item.quantity;
  const status = STATUS_CONFIG[item.status];

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
          src={item.image_url || image}
          alt={item.menu_name || item.name}
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
            {item.menu_name || item.name}
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
            {item.category || 'Buffet'}
          </Typography>
        </Stack>
      </Stack>

      {/* Right section: quantity counter */}
      <Stack justifyContent="center" alignSelf="stretch" sx={{ width: 101 }}>
        {mode === 'cart' ? (
          // Giỏ hàng — cho chỉnh số lượng
          <QuantityCounter
            value={qty}
            onDecrement={() => removeFromCart(item.id)}
            onIncrement={() => addToCart(item)}
            maxQuantity={item.stock_quantity}
          />
        ) : (
          // Món đã gọi — hiện trạng thái
          <Stack alignItems="flex-end" spacing={0.5}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>
              x{qty}
            </Typography>
            {status && (
              <Chip label={status.label} size="small"
                sx={{ bgcolor: status.bg, color: status.color, fontWeight: 600, fontSize: 11, height: 22 }}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Order_ItemSelect;