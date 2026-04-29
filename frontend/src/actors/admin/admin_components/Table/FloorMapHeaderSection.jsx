import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";

export const FloorMapHeaderSection = ({ onAdd }) => { // <--- Chắc chắn có onAdd ở đây
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Stack spacing={0.5}>
        <Typography fontWeight={700} fontSize="24px">
          Sơ đồ bàn nhà hàng
        </Typography>
        <Typography fontSize="14px" color="#64748b">
          Trạng thái phục vụ tại các tầng
        </Typography>
      </Stack>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd} // <--- Sự kiện gắn vào đây
        sx={{
          backgroundColor: "#A21A16",
          borderRadius: "8px",
          px: 3, // Thêm chút padding cho đẹp
          fontWeight: 700,
          textTransform: "none", // Để chữ không bị tự động viết hoa hết
          "&:hover": { backgroundColor: "#7f1410" },
          "&:active": { transform: "scale(0.95)" }, // Hiệu ứng nhấn nút cho sướng tay
        }}
      >
        Thêm bàn mới
      </Button>
    </Stack>
  );
};