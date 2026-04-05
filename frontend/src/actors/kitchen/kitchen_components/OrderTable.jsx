import React from "react";
import { Paper, Stack } from "@mui/material";
import  ItemOrdTable from "./OrderTableSection/ItemListOrdTable";
import  HeaderOrdTable from "./OrderTableSection/HeaderOrdTable";

const OrderTable = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        borderColor: "grey.300",
        // width: "1114px",
      }}
    >
      <Stack direction="column" width="100%">
        <HeaderOrdTable/>
        <ItemOrdTable/>
      </Stack>
    </Paper>
  );
};

export default OrderTable;