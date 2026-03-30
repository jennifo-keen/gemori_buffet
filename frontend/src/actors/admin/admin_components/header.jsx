import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { ThemeProvider } from "../../users/users_components/layout/ThemeProvider";
import SearchIcon from "@mui/icons-material/Search";
import {
    AppBar,
    Autocomplete,
    Badge,
    Box,
    IconButton,
    TextField,
    Toolbar,
} from "@mui/material";

export const AdminHeader = () => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar
                sx={{
                    height: 64,
                    px: 2,
                    py: 1,
                    justifyContent: "space-between",
                    minHeight: "64px !important",
                }}
            >
                {/* Search bar */}
                <Box sx={{ maxWidth: 560, flex: 1 }}>
                    <Autocomplete
                        options={[]}
                        freeSolo
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Tìm kiếm đơn hàng, khách hàng, bàn..."
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <SearchIcon
                                            sx={{ color: "text.secondary", mr: 1, fontSize: 24 }}
                                        />
                                    ),
                                    sx: {
                                        backgroundColor: "background.search",
                                        borderRadius: "8px",
                                        "& fieldset": { border: "none" },
                                        "& input": {
                                            fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            lineHeight: "22px",
                                            color: "text.secondary",
                                            py: "11px",
                                        },
                                        py: 0,
                                    },
                                }}
                            />
                        )}
                    />
                </Box>

                {/* Notification icon with badge */}
                <IconButton sx={{ p: 1 }}>
                    <Badge
                        variant="dot"
                        sx={{
                            "& .MuiBadge-dot": {
                                backgroundColor: "primary.main",
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                border: "2px solid white",
                                minWidth: "unset",
                                top: 2,
                                right: 2,
                            },
                        }}
                    >
                        <NotificationsNoneOutlinedIcon
                            sx={{ color: "text.primary", fontSize: 20 }}
                        />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
