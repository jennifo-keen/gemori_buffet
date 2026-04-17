import React from "react";

import { Box, List, ListItem, Typography } from "@mui/material";

import { useOrder } from '../order_context/OrderContext';

export const ListCategory = () => {
  const { menu, selectedCategory, setSelectedCategory } = useOrder();

  return (
    <Box
      component="nav"
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 1.25,
        p: 1.25,
        bgcolor: "#fff7f4",
        border: "0.5px solid #bc4d42",
        minHeight: "100%",
        width: 130,
      }}
    >
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
      >
        {menu.categories.map(({ name }) => {
          const isSelected = selectedCategory === name;
          return (
            <ListItem
              key={name}
              onClick={() => setSelectedCategory(name)}
              disablePadding
              sx={{
                width: 110,
                height: 48,
                bgcolor: isSelected ? "#fce8e2" : "#fff7f4",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* Left accent bar */}
              <Box
                sx={{
                  width: 4,
                  alignSelf: "stretch",
                  bgcolor: isSelected ? "#EAB308" : "#fff7f4",
                  flexShrink: 0,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  flex: 1,
                  alignSelf: "stretch",
                  bgcolor: isSelected ? "#A21A16" : "#fff7f4",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color:  isSelected ? "#ffffff" : "#000000",
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: 1.4,
                    flex: 1,
                    alignSelf: "stretch",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ListCategory;