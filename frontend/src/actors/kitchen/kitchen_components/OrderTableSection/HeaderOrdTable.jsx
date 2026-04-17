import React from "react";
import { Box, Typography } from "@mui/material";
import { columns } from "../../kitchen_config/HeaderColumOrdTable";

export const HeaderOrdTable = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "grey.200",
      }}
    >
      {columns.map((col) => (
        <Box
          key={col.label}
          sx={{
            flex: col.flex || "none",
            width: col.width || undefined,
            display: "flex",
            alignItems: "center",
            justifyContent:
              col.align === "center"
                ? "center"
                : col.align === "right"
                  ? "flex-end"
                  : "flex-start",
            px: 3,
            py: "26px",
          }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            color="text.secondary"
            noWrap
            textAlign={col.align}
          >
            {col.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HeaderOrdTable;