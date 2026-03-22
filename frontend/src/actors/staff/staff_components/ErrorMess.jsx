import React from "react";
import WarningIcon from "../../../assets/icon/Warning.svg?react";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";

export const ErrorMess = ({ title, subtitle, onConfirm, confirmText = "Tiếp tục" })=> {
  return (
    <Paper
      elevation={0}
      sx={{
        width:"494px",
        p:"24px",
        gap: "16px",
        backgroundColor: "white",
        borderRadius: "12px",
        border: "1px solid rgba(177, 65, 53, 0.05)",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Stack spacing={1} alignItems="center" width="100%">
          <Box
           component="img" 
           src={WarningIcon}
            sx={{
              width: 60,
              height: 60,
              color: "#B4463C",

            }}
          />
           <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#0F172A"
                      textAlign="center"
                      width="100%"
                      sx={{
                        fontSize: "24px", 
                        fontWeight: 700,
                      }}
                    >
                      {title}
                    </Typography>
                  </Stack>
          
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color="#475569"
                    textAlign="center"
                    width="100%"
                     sx={{
                        fontSize: "14px", 
                        fontWeight: 500,
                      }}
                  >
                    {subtitle}
                  </Typography>

        <Box width="100%">
          <Button
            variant="contained"
            onClick={onConfirm}
            fullWidth
            sx={{
              backgroundColor: "#B4463C",
              borderRadius: 3,
              height: 48,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#9a3a32",
              },
            }}
          >
            {confirmText}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ErrorMess;