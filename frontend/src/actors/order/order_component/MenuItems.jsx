import React from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import image from "../../../assets/img/Image.png"

export const MenuItems = () => {
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
        src={image}
        component="img"
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
            Thịt nhúng lẩu
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
            Buffet
          </Typography>
        </Stack>

        {/* Add button */}
        <IconButton
          size="small"
          sx={{
            bgcolor: "#a21a16",
            color: "white",
            borderRadius: "999px",
            p: 0.5,
            "&:hover": {
              bgcolor: "#8b1512",
            },
          }}
        >
          <AddIcon sx={{ width: 18, height: 18 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MenuItems;