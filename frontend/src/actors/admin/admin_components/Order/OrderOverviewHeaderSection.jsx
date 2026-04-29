import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Stack, Typography, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import để chuyển trang

export const OrderOverviewHeaderSection = ({ onDateChange }) => {
    const navigate = useNavigate();

    // State cho bộ lọc
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const open = Boolean(anchorEl);

    // Xử lý mở/đóng menu lọc
    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleDateSelect = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        if (onDateChange) onDateChange(date); // Gửi ngày lên component cha để fetch lại data
    };

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Stack spacing={0.5}>
                <Typography fontFamily="Be Vietnam Pro" fontWeight={900} fontSize="24px">
                    Danh sách đơn hàng
                </Typography>
                <Typography fontFamily="Be Vietnam Pro" fontSize="14px" color="#78716c">
                    Giám sát và quản lý trạng thái phục vụ
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
                {/* NÚT BỘ LỌC */}
                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={handleFilterClick}
                    sx={{ textTransform: 'none', borderRadius: '8px' }}
                >
                    Lọc theo ngày: {selectedDate}
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleFilterClose}
                    PaperProps={{ sx: { p: 2, mt: 1 } }}
                >
                    <Typography fontSize="14px" fontWeight={600} mb={1}>Chọn ngày xem đơn</Typography>
                    <TextField
                        type="date"
                        size="small"
                        value={selectedDate}
                        onChange={handleDateSelect}
                        fullWidth
                    />
                    <Stack direction="row" spacing={1} mt={2}>
                        {/* Nút Xóa Lọc */}
                        <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                setSelectedDate(""); // Xóa trắng ngày
                                onDateChange("");    // Gửi lên cha để báo là xem ALL
                                handleFilterClose();
                            }}
                        >
                            Xem tất cả
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            onClick={handleFilterClose}
                            sx={{ bgcolor: "#A21A16" }}
                        >
                            Áp dụng
                        </Button>
                    </Stack>
                </Menu>

                {/* NÚT TẠO ĐƠN MỚI */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/staff")} // Chuyển sang trang /staff
                    sx={{
                        bgcolor: "#A21A16",
                        textTransform: 'none',
                        borderRadius: '8px',
                        '&:hover': { bgcolor: "#801512" }
                    }}
                >
                    Tạo đơn mới
                </Button>
            </Stack>
        </Stack>
    );
};