import React from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import defaultImage from "../../../assets/img/Image.png"
import { useOrder } from '../order_context/OrderContext';
import RemoveIcon from "@mui/icons-material/Remove";

export const MenuItems = ({ item }) => {
  const { addToCart, removeFromCart, getCartQty } = useOrder();
  const qty = getCartQty(item.id);
  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      spacing={1}
      sx={{
        width:"230px",
        my:"12px",
      }}
      >
      <Box
        component="img"
        src={item.image_url || defaultImage}
        alt={item.name}
        sx={{
          width: 88,
          height: 88,
          bgcolor: "grey.200",
          borderRadius: 2,
          flexShrink: 0,
        }}
      />

      {/* Content area */}
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-end"
        flexGrow={1}
        alignSelf="stretch"
        sx={{ py: 0.5, pr: 0.5 }}
      >
        {/* Text block */}
        <Stack
          direction="column"
          alignItems="flex-start"
          width="100%"
          flexGrow={1}
        >
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "0.75rem",
              lineHeight: "1.5rem",
              color: "#0f172a",
            }}
          >
            {item.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#94a3b8",
              fontStyle: "italic",
              fontSize: "0.75rem",
              lineHeight: "1.25rem",
            }}
          >
            {item.category}
          </Typography>
        </Stack>

        {/* Add button */}
        {qty === 0 ? (
          <IconButton size="small" onClick={() => addToCart(item)}
            sx={{ bgcolor: "#a21a16", color: "white", borderRadius: "999px", p: 0.5, "&:hover": { bgcolor: "#8b1512" } }}
          >
            <AddIcon sx={{ width: 18, height: 18 }} />
          </IconButton>
        ) : (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton size="small" onClick={() => removeFromCart(item.id)}
              sx={{ bgcolor: "grey.200", borderRadius: "999px", p: 0.5 }}
            >
              <RemoveIcon sx={{ width: 16, height: 16 }} />
            </IconButton>
            <Typography sx={{ fontWeight: 700, fontSize: 13, minWidth: 16, textAlign: 'center' }}>
              {qty}
            </Typography>
            <IconButton size="small" onClick={() => addToCart(item)}
              sx={{ bgcolor: "#a21a16", color: "white", borderRadius: "999px", p: 0.5, "&:hover": { bgcolor: "#8b1512" } }}
            >
              <AddIcon sx={{ width: 16, height: 16 }} />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default MenuItems;