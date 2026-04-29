import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    Box,
    Typography,
    Chip,
    Stack,
    IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const MenuItemsTableSection = ({ items, onToggle, onDelete, onEdit }) => {
    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: "1px solid #b141351a",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            <Table stickyHeader>
                {/* HEADER */}
                <TableHead>
                    <TableRow>
                        {["ẢNH", "TÊN MÓN", "DANH MỤC", "TRẠNG THÁI", "HÀNH ĐỘNG"].map(
                            (text, index) => (
                                <TableCell
                                    key={text}
                                    align={index === 1 ? "left" : "center"}
                                    sx={{
                                        backgroundColor: "#6C0D0A",
                                        color: "#FFF7F4",
                                        fontWeight: 700,
                                        borderBottom: "none",
                                    }}
                                >
                                    {text}
                                </TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>

                {/* BODY */}
                <TableBody>
                    {items.map((item) => {
                        // Xác định màu sắc chủ đạo dựa trên trạng thái
                        const statusColor = item.status ? "#A21A16" : "#9e9e9e";

                        return (
                            <TableRow
                                key={item.id}
                                hover
                                sx={{
                                    height: 84,
                                    "& td": {
                                        borderBottom: "1px solid #eee",
                                        verticalAlign: "middle",
                                    },
                                    // Làm mờ ảnh một chút nếu ngưng bán (tùy chọn)
                                    opacity: item.status ? 1 : 0.8,
                                }}
                            >
                                {/* IMAGE */}
                                <TableCell align="center">
                                    <Box
                                        component="img"
                                        src={item.image_url}
                                        alt={item.name}
                                        sx={{
                                            width: 64,
                                            height: 48,
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                            boxShadow: 2,
                                            display: "block",
                                            margin: "0 auto",
                                            filter: item.status ? "none" : "grayscale(100%)", // Ảnh cũng xám luôn cho đồng bộ
                                        }}
                                    />
                                </TableCell>

                                {/* NAME + CODE */}
                                <TableCell>
                                    <Stack justifyContent="center">
                                        <Typography
                                            fontWeight={700}
                                            fontSize={14}
                                            sx={{ color: item.status ? "text.primary" : "text.disabled" }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography fontSize={10} color="text.secondary">
                                            Mã: {item.code}
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                {/* CATEGORY */}
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center">
                                        <Chip
                                            label={item.category}
                                            size="small"
                                            sx={{
                                                backgroundColor: item.status ? "#334155" : "#e0e0e0",
                                                color: item.status ? "#fff" : "#9e9e9e",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Box>
                                </TableCell>

                                {/* STATUS */}
                                <TableCell align="center">
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={1}
                                    >
                                        <Switch
                                            checked={item.status}
                                            onChange={() => onToggle(item.id, item.status)}
                                            size="small"
                                            sx={{
                                                width: 36,
                                                height: 20,
                                                padding: 0,
                                                "& .MuiSwitch-switchBase": {
                                                    padding: 0,
                                                    margin: "2px",
                                                    "&.Mui-checked": {
                                                        transform: "translateX(16px)",
                                                        color: "#fff",
                                                        "& + .MuiSwitch-track": {
                                                            backgroundColor: "#A21A16",
                                                            opacity: 1,
                                                        },
                                                    },
                                                },
                                                "& .MuiSwitch-thumb": { width: 16, height: 16 },
                                                "& .MuiSwitch-track": {
                                                    borderRadius: 10,
                                                    backgroundColor: item.status ? "#A21A16" : "#bdbdbd",
                                                    opacity: item.status ? 0.3 : 1,
                                                },
                                            }}
                                        />

                                        <Typography
                                            fontSize={11}
                                            fontWeight={700}
                                            sx={{ color: statusColor }} // Chuyển màu chữ trạng thái
                                        >
                                            {item.status ? "Đang bán" : "Ngưng bán"}
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                {/* ACTION */}
                                <TableCell>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={1}
                                        sx={{ height: "84px" }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{ p: "4px" }}
                                            onClick={() => onEdit(item)} // Gọi hàm khi bấm nút sửa
                                        >
                                            <EditOutlinedIcon sx={{ fontSize: 18, color: statusColor }} />
                                        </IconButton>

                                        <IconButton size="small" sx={{ p: "4px" }} onClick={() => onDelete(item.id)}>
                                            <DeleteOutlineIcon
                                                sx={{ fontSize: 18, color: "#b14135", "&:hover": { color: "red" } }}
                                            />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};