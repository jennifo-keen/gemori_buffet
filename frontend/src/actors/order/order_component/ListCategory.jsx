import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";

const categories = [
  "THỊT NHÚNG LẦU",
  "HẢI SẢN",
  "NỘI TẠNG",
  "MÌ - VIÊN THẢ LẦU",
  "RAU - NẤM",
  "CAO CẤP",
];

export const ListCategory = () => {
  const [selected, setSelected] = useState(null);

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
        minHeight: 734,
        width: 130,
      }}
    >
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
      >
        {categories.map((category) => {
          const isSelected = selected === category;
          return (
            <ListItem
              key={category}
              onClick={() => setSelected(category)}
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
                  bgcolor: isSelected ? "#bc4d42" : "#fff7f4",
                  borderRadius: "10px",
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
                  bgcolor: isSelected ? "#fce8e2" : "#fff7f4",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#334155",
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 400,
                    lineHeight: 1.4,
                    flex: 1,
                    alignSelf: "stretch",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {category}
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