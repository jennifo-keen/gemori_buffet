import React from "react";
import { Box, TextField, Typography } from "@mui/material";

export default function TextBox({
  title,
  value,
  placeholder,
  onChange,
  width = 180,
}) {
  return (
    <Box
      sx={{
        width,
        p: 2.5,
        borderRadius: 1,
        border: "1px dashed #8a38f5",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 14,
          color: "#070707",
        }}
      >
        {title}
      </Typography>

      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: 14,
            fontWeight: 500,
            "& fieldset": {
              borderColor: "#a3a3a3",
            },
          },
          "& .MuiInputBase-input": {
            padding: "6px",
          },
        }}
      />
    </Box>
  );
}