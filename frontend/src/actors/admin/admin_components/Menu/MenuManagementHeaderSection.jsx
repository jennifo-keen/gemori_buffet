import React from "react";
import { Stack, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const MenuManagementHeaderSection = ({ onAddClick }) => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", fontSize: "24px" }}>
                    Quản lý thực đơn
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Cập nhật thông tin và trạng thái phục vụ của các món ăn
                </Typography>
            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddClick} // Gọi hàm mở Modal
                sx={{
                    backgroundColor: "#b14135",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#8a332a" },
                }}
            >
                Thêm món mới
            </Button>
        </Stack>
    );
};