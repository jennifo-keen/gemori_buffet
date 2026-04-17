import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

export const ItemListOpt = ({ items = [] }) => {
  return (
    <List disablePadding sx={{ width: "100%", overflow: "hidden" }}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
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
                {index + 1}
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
              {item.menu_name}
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
              x{item.quantity}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemListOpt;