import React from "react";

import AddIcon    from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import DeleteIcon from "../../../assets/TrashLine.svg?react";

export default function Bill2() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "white",
        borderBottom: 1,
        borderColor: "#E5E5E5",
        py: "9px",
        px: 0,
        width: "410px",
        margin:"16px",
      }}
    >
      <Stack 
      direction="row" 
      alignItems="center"
      sx={{ 
        gap: "12px", 
        }}
        >
        <IconButton
          size="small"
          sx={{
            width: 24,
            height: 24,
            border: "1px solid #E5E5E5",
            borderRadius: "4px",
            p: "10px",
          }}
        >
          <RemoveIcon sx={{ fontSize: 16 }} />
        </IconButton>

        <Box
          sx={{
            width: 36,
            height: 24,
            p: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #E5E5E5",
            borderRadius: "4px",
            bgcolor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#343330",
            }}
          >
            5
          </Typography>
        </Box>

        <IconButton
          size="small"
          sx={{
            width: 24,
            height: 24,
            border: 1,
            borderColor: "grey.300",
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>

      <Stack
      sx={{
        gap: "2px",  
        alignItems: "flex-start",      
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#343330",
            whiteSpace: "nowrap",
          }}
        >
          Cơm gà Siêu ngon
        </Typography>

        <Typography
          sx={{
            fontSize: "9px",
            fontWeight: 500,
            color: "#D4D4D4",
            whiteSpace: "nowrap",
           
          }}
        >
          Giờ order: 13:00
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          color: "#343330",
          width: "46px",
          textAlign: "center",
        }}
      >
        400
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ width: "79px", justifyContent: "space-between" }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#343330",
            whiteSpace: "nowrap",
          }}
        >
          1.200
        </Typography>

        <IconButton size="small" sx={{ p: 0 }}>
          <Box
                     component="img" 
                     src={DeleteIcon}
                      sx={{
                        width: 20,
                        height: 20,
                        color: "#B4463C",
          
                      }}
                    />
        </IconButton>
      </Stack>
    </Box>
  );
}