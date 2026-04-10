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
import { useState, useRef, useEffect } from "react";
import axios from "axios";

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
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            content: "Chào Admin, tôi là trợ lý Gemori 🤖"
        }
    ]);
    const [loading, setLoading] = useState(false);

    const chatRef = useRef(null);

    // auto scroll xuống dưới
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: "user",
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:3000/api/admin/chat", {
                question: userMessage.content
            });

            const aiMessage = {
                id: Date.now() + 1,
                sender: "ai",
                content: res.data.answer || "Không có phản hồi"
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error(err);

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 2,
                    sender: "ai",
                    content: "❌ Lỗi khi gọi AI"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack
            direction="column"
            sx={{
                flex: 1,
                position: { lg: "sticky" },
                top: { lg: "24px" },
            }}
        >
            {/* HEADER */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    cursor: "pointer",
                    p: 1,
                    borderRadius: "12px",
                    "&:hover": { bgcolor: "rgba(162, 26, 22, 0.05)" }
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{
                        width: 40, height: 40, borderRadius: "50%",
                        bgcolor: "rgba(162, 26, 22, 0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <SmartToyOutlinedIcon sx={{ color: "#a21a16" }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700 }}>
                        AI Trợ lý
                    </Typography>
                </Stack>

                <KeyboardArrowDownIcon
                    sx={{
                        transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: "0.3s",
                        color: "#a21a16"
                    }}
                />
            </Stack>

            {/* CHAT */}
            <Collapse in={isOpen}>
                <Box sx={{ pt: 2, height: "550px" }}>
                    <Paper sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "16px",
                    }}>
                        {/* STATUS */}
                        <Stack direction="row" justifyContent="space-between" sx={{ p: 1 }}>
                            <Typography sx={{ fontSize: 12, color: "#a21a16" }}>
                                🟢 Online
                            </Typography>
                            <HistoryOutlinedIcon />
                        </Stack>

                        {/* MESSAGES */}
                        <Box
                            ref={chatRef}
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}
                        >
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
                                            maxWidth: "75%",
                                            p: 1.5,
                                            bgcolor: msg.sender === "ai"
                                                ? "rgba(162, 26, 22, 0.05)"
                                                : "#f4f4f5",
                                            borderRadius: "16px",
                                            whiteSpace: "pre-line"
                                        }}
                                    >
                                        {msg.content}
                                    </Box>
                                </Stack>
                            ))}

                            {loading && (
                                <Typography sx={{ fontSize: 12, color: "gray" }}>
                                    AI đang trả lời...
                                </Typography>
                            )}
                        </Box>

                        {/* INPUT */}
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ position: "relative" }}>
                                <InputBase
                                    fullWidth
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Hỏi AI..."
                                    sx={{
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "12px",
                                        px: 2,
                                        py: 1.5,
                                        pr: 6,
                                    }}
                                />

                                <IconButton
                                    onClick={handleSend}
                                    sx={{
                                        position: "absolute",
                                        right: 8,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        bgcolor: "#a21a16",
                                        color: "#fff"
                                    }}
                                >
                                    <SendIcon />
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