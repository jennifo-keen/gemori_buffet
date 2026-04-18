import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";

export const FloorMapHeaderSection = ({ onAdd }) => {
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
        onClick={onAdd}
        sx={{
          backgroundColor: "#A21A16",
          borderRadius: "8px",
          fontWeight: 700,
          "&:hover": { backgroundColor: "#7f1410" },
        }}
      >
        Thêm bàn mới
      </Button>
    </Stack>
  );
};