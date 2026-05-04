import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { Box, Button, Stack, Typography } from "@mui/material";

const UserManagementHeaderSection = () => {
    const handleAddUser = () => {
        // Logic mở Modal thêm user ở đây
        alert("Chức năng thêm người dùng đang được phát triển!");
    };

    return (
        <Box component="section" sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 900 }}>QUẢN LÝ NGƯỜI DÙNG</Typography>
                <Button
                    variant="contained"
                    startIcon={<PersonAddAlt1OutlinedIcon />}
                    onClick={handleAddUser}
                    sx={{ borderRadius: 2, px: 4 }}
                >
                    THÊM NGƯỜI DÙNG MỚI
                </Button>
            </Stack>
        </Box>
    );
};

export default UserManagementHeaderSection;
