import React from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";

const BtnCheckTitle = ({
  variant = 0,
  label = "Title",
  onClick,
}) => {
  const styles = {
    0: {
      backgroundColor: "#B4463C",
      color: "white",
      iconColor: "white",
      borderStyle: "none",
      hover: { backgroundColor: "#9A3A32" },
    },
    1: {
      backgroundColor: "white",
      color: "#B4463C",
      iconColor: "#B4463C",
      borderStyle: "solid",
      hover: { backgroundColor: "white" },
    },
    2: {
      backgroundColor: "white",
      color: "#B4463C",
      iconColor: "#B4463C",
      borderStyle: "dashed",
      hover: { backgroundColor: "white" },
    },
  };

  const s = styles[variant] ?? styles[0];
  const isOutlined = variant !== 0;

  return (
    <Button
      variant={isOutlined ? "outlined" : "contained"}
      onClick={onClick}
      startIcon={<CheckCircleIcon sx={{ color: s.iconColor }} />}
      sx={{
        width: 334,
        height: 41,
        backgroundColor: s.backgroundColor,
        color: s.color,
        borderColor: isOutlined ? "#B4463C" : undefined,
        borderWidth: isOutlined ? "2px" : undefined,
        borderStyle: s.borderStyle !== "none" ? s.borderStyle : undefined,
        borderRadius: "12px",
        padding: "20px 0",
        gap: "12px",
        margin: "10px 10px 12px 10px",
        textTransform: "none",
        fontWeight: 600,
        fontSize: "16px",
        "&:hover": {
          ...s.hover,
          borderColor: isOutlined ? "#B4463C" : undefined,
          borderWidth: isOutlined ? "2px" : undefined,
          borderStyle: s.borderStyle !== "none" ? s.borderStyle : undefined,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default BtnCheckTitle;