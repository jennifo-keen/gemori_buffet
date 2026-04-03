import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
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
    // Màu đỏ đô gốc
    const mainRed = "#8A0000";
    // Màu đỏ đô 10% (Alpha 0.1)
    const lightRed = "rgba(138, 0, 0, 0.1)";
    // Màu xám theo yêu cầu
    const greyText = "#94A3B8";
    // Màu trắng 98%
    const white98 = "#FAFAFA";

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: white98, // Cập nhật nền trắng 98%
                borderBottom: `1px solid ${lightRed}`, // Viền 10% màu đỏ
            }}
        >
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
                                            sx={{
                                                color: greyText,
                                                mr: 1,
                                                fontSize: 24
                                            }}
                                        />
                                    ),
                                    sx: {
                                        backgroundColor: lightRed, // Khung search vẫn giữ đỏ đô 10% để nổi bật trên nền trắng 98%
                                        borderRadius: "8px",
                                        "& fieldset": { border: "none" },
                                        "& input": {
                                            fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            lineHeight: "22px",
                                            color: greyText,
                                            py: "11px",
                                            "&::placeholder": {
                                                color: greyText,
                                                opacity: 1,
                                            }
                                        },
                                        py: 0,
                                    },
                                }}
                            />
                        )}
                    />
                </Box>

                {/* Notification icon */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ p: 1 }}>
                        <Badge
                            variant="dot"
                            sx={{
                                "& .MuiBadge-dot": {
                                    backgroundColor: mainRed,
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    border: `2px solid ${white98}`, // Viền của chấm đỏ tiệp màu nền mới
                                    minWidth: "unset",
                                    top: 2,
                                    right: 2,
                                },
                            }}
                        >
                            <NotificationsNoneOutlinedIcon
                                sx={{ color: mainRed, fontSize: 20 }}
                            />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;