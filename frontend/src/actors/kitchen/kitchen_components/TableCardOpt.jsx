import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Paper, Stack } from "@mui/material";
import { HeaderOpt } from "./TableCardSection/HeaderOpt";
import { ItemListOpt } from "./TableCardSection/ItemListOpt";
import { TitleOpt } from "./TableCardSection/TitleOpt";

const TableCard = ({ data, onComplete, onUpdateItem }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        minHeight: 850,
        backgroundColor: "white",
        borderRadius: 3,
        overflow: "hidden",
        border: "2px solid #ffe5df",
      }}
    >
      {/* Order Header Section */}
      <HeaderOpt tableData={data}/>

      {/* Order Table Header Section */}
      <TitleOpt />

      {/* Order Item List Section */}
      <Box sx={{ flex: 1 }}>
        <ItemListOpt items={data?.items || []} onUpdateItem={onUpdateItem} />
      </Box>

      {/* Caret Down Icon */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ px: 0, py: 0.75, width: "100%" }}
      >
        <KeyboardArrowDownIcon sx={{ width: 24, height: 24 }} />
      </Stack>

      {/* Bottom Action Bar */}
      <Box
        sx={{
          p: 2,
          borderTop: "2px solid #ffe5df",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={onComplete}
          startIcon={<CheckCircleIcon sx={{ width: 20, height: 20 }} />}
          sx={{
            backgroundColor: "#b4463c",
            borderRadius: 3,
            height: 65,
            fontSize: "var(--heading-h6-semi-bold-font-size, 1rem)",
            fontWeight: "var(--heading-h6-semi-bold-font-weight, 600)",
            letterSpacing: "var(--heading-h6-semi-bold-letter-spacing, normal)",
            lineHeight: "var(--heading-h6-semi-bold-line-height, 1.5)",
            textTransform: "none",
            color: "white",
            "&:hover": {
              backgroundColor: "#9a3b32",
            },
          }}
        >
          Hoàn thành đơn
        </Button>
      </Box>
    </Paper>
  );
};

export default TableCard;