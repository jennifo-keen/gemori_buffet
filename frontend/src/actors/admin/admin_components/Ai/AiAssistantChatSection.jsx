import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SendIcon from "@mui/icons-material/Send";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Box,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography,
    Collapse,
} from "@mui/material";
import { useState } from "react";

// Dữ liệu mẫu cho tin nhắn
const messages = [
    {
        id: 1,
        sender: "ai",
        content: "Chào Admin, tôi là trợ lý Gemori. Tôi có thể giúp gì cho việc quản lý nhà hàng hôm nay?",
    },
    {
        id: 2,
        sender: "user",
        content: "Doanh thu hôm nay thế nào so với cùng kỳ tháng trước?",
    },
    {
        id: 3,
        sender: "ai",
        content: (
            <>
                <Typography component="p" variant="body2" sx={{ mb: 0.5 }}>
                    Doanh thu hôm nay đạt <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>128.4M VNĐ</Box>.
                </Typography>
                <Typography variant="body2">Tăng trưởng 8.4% so với trung bình trước.</Typography>
            </>
        ),
    },
];

const AiAvatar = () => (
    <Box
        sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "#a21a16",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        }}
    >
        <Typography sx={{ color: "#fff", fontSize: "10px", fontWeight: 700 }}>AI</Typography>
    </Box>
);

export const AiAssistantChatSection = () => {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Stack
            direction="column"
            sx={{
                flex: 1,
                alignSelf: "stretch",
                position: { lg: "sticky" },
                top: { lg: "24px" },
                height: "fit-content",
                zIndex: 10,
            }}
        >
            {/* Header điều khiển đóng mở */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    cursor: "pointer",
                    p: 1,
                    borderRadius: "12px",
                    transition: "0.2s",
                    "&:hover": { bgcolor: "rgba(162, 26, 22, 0.05)" }
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                        sx={{
                            width: 40, height: 40, borderRadius: "50%",
                            bgcolor: "rgba(162, 26, 22, 0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <SmartToyOutlinedIcon sx={{ width: 24, height: 24, color: "#a21a16" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#230f0f" }}>
                        AI Trợ lý
                    </Typography>
                </Stack>

                <IconButton size="small">
                    <KeyboardArrowDownIcon
                        sx={{
                            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                            transition: "0.3s",
                            color: "#a21a16"
                        }}
                    />
                </IconButton>
            </Stack>

            {/* Nội dung cửa sổ Chat */}
            <Collapse in={isOpen}>
                <Box sx={{ pt: 2, display: "flex", flexDirection: "column", height: "550px" }}>
                    <Paper
                        elevation={5}
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid rgba(162, 26, 22, 0.1)",
                            bgcolor: "#fff",
                        }}
                    >
                        {/* Status Bar */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                px: 2, py: 1.5,
                                bgcolor: "rgba(162, 26, 22, 0.03)",
                                borderBottom: "1px solid rgba(0,0,0,0.05)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#2e7d32" }} />
                                <Typography sx={{ color: "#a21a16", fontWeight: 700, fontSize: "12px" }}>
                                    TRỰC TUYẾN
                                </Typography>
                            </Stack>
                            <IconButton size="small"><HistoryOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
                        </Stack>

                        {/* Vùng hiển thị tin nhắn */}
                        <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                            {messages.map((msg) => (
                                <Stack
                                    key={msg.id}
                                    direction="row"
                                    justifyContent={msg.sender === "ai" ? "flex-start" : "flex-end"}
                                    spacing={1}
                                >
                                    {msg.sender === "ai" && <AiAvatar />}
                                    <Box
                                        sx={{
                                            maxWidth: "80%",
                                            p: 1.5,
                                            bgcolor: msg.sender === "ai" ? "rgba(162, 26, 22, 0.05)" : "#f4f4f5",
                                            borderRadius: msg.sender === "ai" ? "0px 16px 16px 16px" : "16px 0px 16px 16px",
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                                            {msg.content}
                                        </Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Box>

                        {/* Ô nhập liệu */}
                        <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                            <Box sx={{ position: "relative" }}>
                                <InputBase
                                    fullWidth
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Đặt câu hỏi cho AI..."
                                    sx={{
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "12px",
                                        px: 2, py: 1.5, pr: 6,
                                        fontSize: "14px",
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: "absolute", right: 8, top: "50%",
                                        transform: "translateY(-50%)",
                                        bgcolor: "#a21a16",
                                        color: "#fff",
                                        "&:hover": { bgcolor: "#801512" }
                                    }}
                                >
                                    <SendIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Collapse>
        </Stack>
    );
};

export default AiAssistantChatSection;