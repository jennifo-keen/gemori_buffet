import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Stack, Typography } from "@mui/material";

export const OrderOverviewHeaderSection = () => {
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
                <Button variant="outlined" startIcon={<FilterListIcon />}>
                    Bộ lọc
                </Button>

                <Button variant="contained" startIcon={<AddIcon />}>
                    Tạo đơn mới
                </Button>
            </Stack>
        </Stack>
    );
};