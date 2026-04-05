import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const orderItems = [
  {
    id: 1,
    name: "Bò Mỹ sốt Gemori",
    subtitle: "Bò Mỹ sốt Gemori",
    quantity: 2,
    status: "Đang chế biến",
  },
  {
    id: 2,
    name: "Bò Mỹ sốt Gemori",
    subtitle: "Bò Mỹ sốt Gemori",
    quantity: 2,
    status: "Đang chế biến",
  },
  {
    id: 3,
    name: "Bò Mỹ sốt Gemori",
    subtitle: "Bò Mỹ sốt Gemori",
    quantity: 2,
    status: "Đang chế biến",
  },
  {
    id: 4,
    name: "Bò Mỹ sốt Gemori",
    subtitle: "Bò Mỹ sốt Gemori",
    quantity: 2,
    status: "Đang chế biến",
  },
  {
    id: 5,
    name: "Bò Mỹ sốt Gemori",
    subtitle: "Bò Mỹ sốt Gemori",
    quantity: 2,
    status: "Đang chế biến",
  },
];

export const ItemListOrdTable = () => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxHeight: 468,
        overflowY: "auto",
        position: "relative",
      }}
    >
      {orderItems.map((item) => (
        <Stack
          key={item.id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pl: 3,
            borderBottom: "1px dashed rgba(177, 65, 53, 0.05)",
            width: "100%",
          }}
        >
          {/* Item name and subtitle */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
              sx={{ lineHeight: 1.5 }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ lineHeight: 1.5 }}
            >
              {item.subtitle}
            </Typography>
          </Box>

          {/* Quantity badge */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                py: 1,
                bgcolor: "rgba(177, 65, 53, 0.1)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
                textAlign="center"
              >
                {item.quantity}
              </Typography>
            </Box>
          </Box>

          {/* Status chip */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Chip
              label={item.status}
              size="small"
              icon={
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#f4ca66",
                    flexShrink: 0,
                    ml: "8px !important",
                    mr: "-4px !important",
                  }}
                />
              }
              sx={{
                bgcolor: "#ffeed1",
                border: "1px solid #f4ca66",
                borderRadius: "999px",
                color: "#b4463c",
                fontWeight: "bold",
                fontSize: "0.75rem",
                px: 0.5,
                "& .MuiChip-label": {
                  color: "#b4463c",
                  fontWeight: "bold",
                },
              }}
            />
          </Box>

          {/* Action button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 3,
              py: "26.5px",
              minWidth: 168,
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#b14135",
                borderRadius: 2,
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                fontWeight: "bold",
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#9a3830",
                },
              }}
            >
              Xong món
            </Button>
          </Box>
        </Stack>
      ))}

      {/* Caret down indicator */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
        }}
      >
        <KeyboardArrowDownIcon
          sx={{ width: 32, height: 32, color: "text.secondary" }}
        />
      </Box>
    </Box>
  );
};

export default ItemListOrdTable;