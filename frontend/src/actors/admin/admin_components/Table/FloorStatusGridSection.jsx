import { Box, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// 🎯 map BE -> UI
const mapStatus = (status) => {
    if (status === "ordering") return "occupied";
    if (status === "closed") return "maintenance";
    return "empty";
};

// 🎨 style config
const statusConfig = {
    occupied: {
        borderColor: "#8a000033",
        numberColor: "#a21a16",
        label: "CÓ KHÁCH",
        color: "#a21a16",
    },
    empty: {
        borderColor: "#e2e8f0",
        numberColor: "#475569",
        label: "TRỐNG",
        color: "#475569",
    },
    maintenance: {
        borderColor: "#edcf8f",
        numberColor: "#eab308",
        label: "BẢO TRÌ",
        color: "#eab308",
    },
};

// 🧱 CARD
const TableCard = ({ table, onClick }) => {
    const uiStatus = mapStatus(table.status);
    const config = statusConfig[uiStatus];

    return (
        <Paper
            onClick={onClick}
            sx={{
                width: 180,
                height: 150,
                borderRadius: "16px",
                border: `3px solid ${config.borderColor}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
            }}
        >
            <Box
                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    border: `4px solid ${config.borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography fontWeight={900} color={config.numberColor}>
                    {table.table_code.replace("TB", "")}
                </Typography>
            </Box>

            <Typography fontSize={12} fontWeight={700} color={config.color}>
                {config.label}
            </Typography>
        </Paper>
    );
};

// 🧩 GRID
export const FloorStatusGridSection = ({ tables, onChangeStatus }) => {
    const navigate = useNavigate();

    const handleClick = (table) => {

        // ✅ bàn có khách → vào checkout
        if (table.status === "ordering") {
            // Không cần set bypass nữa vì mình sẽ dùng token admin đã lưu khi login
            navigate(`/staff/checkout?tableId=${table.id}&tableCode=${table.table_code}`);
            return;
        }
        // ✅ bảo trì → trống
        if (table.status === "closed") {
            onChangeStatus(table.id, "empty");
            return;
        }

        // ✅ trống → bảo trì
        if (table.status === "empty") {
            onChangeStatus(table.id, "closed");
            return;
        }
    };
    return (
        <Stack spacing={3}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {tables.map((table) => (
                    <TableCard
                        key={table.id}
                        table={table}
                        onClick={() => handleClick(table)}
                    />
                ))}
            </Box>
        </Stack>
    );
};