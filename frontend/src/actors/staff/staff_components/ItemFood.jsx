import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import rectangle3 from "./rectangle-3.png";

export const ItemFood  = () => {
  return (
    <Box
      sx={{
        width: "190px",
        height: "244px",
        borderRadius: "5px",
        padding: "20px",
        // border: "1px  dashed #8a38f5",
        overflow: "hidden",
        bgcolor: "white",
      }}
    >
       <Card
      sx={{
        width: "150px",
        height: "204px",
        borderRadius: "8px",
        // margin:"20px",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "white",
      }}
    >
      <CardMedia
        component="img"
        image={rectangle3}
        sx={{
          height: "118px",
          alignSelf: "stretch",
          width: "100%",
          objectFit: "cover"
        }}
      />

      <CardContent
      sx={{
          p: "8px",
          "&:last-child": { pb: "8px" },
        }}
      >
          <Stack      
           direction="column"
            >
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "black",
                whiteSpace: "nowrap",
                fontSize: "15px"
              }}
            >
              Tôm hùm ướt lạnh
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#A3A3A3",
                whiteSpace: "nowrap",
                alignSelf: "flex-start",
                fontSize: "15px"
              }}
            >
            100.000 VNĐ
            </Typography>
         

          <IconButton
            sx={{
              bgcolor: "#22C55E",
              color: "white",
              width: 30,
              height: 30,
              padding:"4px",
              alignSelf: "flex-end",
              flexShrink: 0,
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
          >
            <AddIcon 
            sx={{ 
              fontSize: "25px"
             }} />
          </IconButton>
        </Stack>
      </CardContent>
      </Card>
    </Box>
  );
};

export default ItemFood ;
