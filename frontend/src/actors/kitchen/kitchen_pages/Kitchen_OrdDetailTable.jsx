import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Button, Stack } from "@mui/material";
import OrdStatusHeader  from "../kitchen_components/OrdStatusHeader"
import OrderTable from '../kitchen_components/OrderTable';

export default function Kitchen_OrdDetailTable() {
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
                pt: 4,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {/* Back to table map button */}
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    backgroundColor: "grey.100",
                    borderRadius: 3,
                    px: 4,
                    py: 2,
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
                  Quay lại sơ đồ bàn
                </Button>
        
                {/* Complete order button */}
                <Button
                  variant="contained"
                  startIcon={<CheckBoxIcon sx={{ width: 32, height: 32 }} />}
                  sx={{
                    backgroundColor: "#b14135",
                    borderRadius: 3,
                    px: 6,
                    py: 2,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#8f3329",
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