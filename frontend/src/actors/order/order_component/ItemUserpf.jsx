import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import {
  Box,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const ItemUserpf = () => {
  return (
    <ListItem
      sx={{ 
        minWidth: 350,
        maxWidth:"100vh", 
        gap: 2, 
        px: 0, 
        py: 0.5 
      }}
      secondaryAction={
        <ChevronRightIcon sx={{ color: "text.secondary", fontSize: 18 }} />
      }
    >
      {/* Icon container with light red background */}
      <ListItemIcon sx={{ minWidth: 48 }}>
        <Box
          sx={{
            width: 48,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(138, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
          <ManageAccountsOutlinedIcon sx={{ color: "#8a0000", fontSize: 32 }} />
        </Box>
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography variant="subtitle2" fontWeight="600" color="text.primary">
            Thông tin cá nhân
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            Quản lý hồ sơ và bảo mật
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ItemUserpf;