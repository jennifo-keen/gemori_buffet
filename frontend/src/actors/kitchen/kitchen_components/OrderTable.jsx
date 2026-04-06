import React from "react";
import { Paper, Stack } from "@mui/material";
import  ItemOrdTable from "./OrderTableSection/ItemListOrdTable";
import  HeaderOrdTable from "./OrderTableSection/HeaderOrdTable";

const OrderTable = ({ items, onUpdateItem }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        borderColor: "grey.300",
      }}
    >
      <Stack direction="column" width="100%">
        <HeaderOrdTable/>
        <ItemOrdTable items={items} onUpdateItem={onUpdateItem} />
      </Stack>
    </Paper>
  );
};

export default OrderTable;