import React from 'react';
import OrdStatusHeader  from "../kitchen_components/OrdStatusHeader"
import OrderTable from '../kitchen_components/OrderTable';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Stack } from "@mui/material";

export default function Kitchen_OrdDetailOrd() {
  return (
    <Box
      sx={{
        p:"32px",
        gap: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zoom: "0.75",
      }}>
        <OrdStatusHeader/>
        <OrderTable/>

        <Box
          component="footer"
          sx={{
            borderTop: "1px solid rgba(177, 65, 53, 0.1)",
            py: "16px",

            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Close details button */}
            <Button
              variant="contained"
              startIcon={<CloseIcon sx={{ width: 24, height: 24 }} />}
              sx={{
                backgroundColor: "grey.100",
                borderRadius: "12px",
                px: "48px",
                py: "16px",
                fontWeight: "bold",
                fontSize: "0.875rem",
                textTransform: "none",
                boxShadow: "none",
                color: "#334155",
                "&:hover": {
                  backgroundColor: "grey.200",
                  boxShadow: "none",
                },
              }}
            >
              Đóng chi tiết
            </Button>

            {/* Complete order button */}
            <Button
              variant="contained"
              startIcon={<CheckBoxIcon sx={{ width: 32, height: 32 }} />}
              sx={{
                backgroundColor: "#b14135",
                borderRadius: "12px",
                px: 6,
                py: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#8f342a",
                  boxShadow: "none",
                },
              }}
            >
              HOÀN TẤT ĐƠN
            </Button>
          </Stack>
        </Box>

    </Box>
  )
}