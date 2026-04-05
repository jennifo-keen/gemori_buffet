import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

// Order items data
const orderItems = [
  { id: 1, index: 1, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 2, index: 1, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 3, index: 2, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 4, index: 3, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 5, index: 4, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 6, index: 5, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 7, index: 6, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 8, index: 7, name: "Thịt bò hảo hạn", quantity: "x1" },
  { id: 9, index: 8, name: "Thịt bò hảo hạn", quantity: "x1" },
];

export const ItemListOpt = () => {
  return (
    <List disablePadding sx={{ width: "100%", overflow: "hidden" }}>
      {orderItems.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => {}}
          sx={{
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
            gap: 1.5,
          }}
        >
          {/* Left side: index + name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Index number */}
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                flexShrink: 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {item.index}
              </Typography>
            </Box>

            {/* Item name */}
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </Typography>
          </Box>

          {/* Right side: quantity badge */}
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              backgroundColor: "rgba(177, 65, 53, 0.1)",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {item.quantity}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemListOpt;