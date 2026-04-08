import React from "react";
import { Box, List, ListItem, Typography, Chip, Button   } from "@mui/material";

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

                    {/* Nút hành động */}
          {/* <Box sx={{ flexShrink: 0 }}>
            {item.status === 'pending' && (
              <Button size="small" variant="contained"
                onClick={() => onUpdateItem?.(item.id, 'cooking')}
                sx={{ bgcolor: "#f59e0b", borderRadius: 2, textTransform: "none", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", "&:hover": { bgcolor: "#d97706" } }}
              >
                Bắt đầu
              </Button>
            )}
            {item.status === 'cooking' && (
              <Button size="small" variant="contained"
                onClick={() => onUpdateItem?.(item.id, 'done')}
                sx={{ bgcolor: "#b4463c", borderRadius: 2, textTransform: "none", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", "&:hover": { bgcolor: "#9a3830" } }}
              >
                Xong món
              </Button>
            )}
            {item.status === 'done' && (
              <Typography variant="body2" color="success.main" fontWeight={600} sx={{ whiteSpace: "nowrap" }}>
                ✓ Xong
              </Typography>
            )}
          </Box> */}
        </ListItem>
      ))}
    </List>
  );
};

export default ItemListOpt;