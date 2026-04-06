import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SendIcon from "@mui/icons-material/Send";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import {
    Box,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";

const messages = [
    {
        id: 1,
        sender: "ai",
        content: (
            <>
                Chào Admin, tôi là trợ lý Gemori. Tôi có thể
                <br />
                giúp gì cho việc quản lý
                <br />
                nhà hàng hôm nay?
            </>
        ),
    },
    {
        id: 2,
        sender: "user",
        content: (
            <>
                Doanh thu hôm nay thế nào
                <br />
                so với cùng kỳ tháng trước?
            </>
        ),
    },
    {
        id: 3,
        sender: "ai",
        content: (
            <>
                <Typography
                    component="p"
                    variant="body2"
                    sx={{ color: "slate.900", mb: 0.5 }}
                >
                    <Box component="span" sx={{ color: "text.primary" }}>
                        Doanh thu hôm nay (đến 14:00) đạt{" "}
                    </Box>
                    <Box component="span" sx={{ color: "primary.main" }}>
                        128.4M VNĐ
                    </Box>
                    <Box component="span" sx={{ color: "text.primary" }}>
                        .
                    </Box>
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                    Tăng trưởng 8.4% so với
                    <br />
                    trung bình trước.
                </Typography>
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
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        }}
    >
        <Typography
            sx={{
                fontFamily: "'Epilogue-Regular', Helvetica",
                fontWeight: 400,
                color: "#fff",
                fontSize: "10px",
                lineHeight: "15px",
            }}
        >
            AI
        </Typography>
    </Box>
);

export const AiAssistantChatSection = () => {
    const [inputValue, setInputValue] = useState("");

    return (
        <Stack direction="column" sx={{ flex: 1, alignSelf: "stretch" }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "rgba(177, 65, 53, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <SmartToyOutlinedIcon
                        sx={{ width: 24, height: 24, color: "primary.main" }}
                    />
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        color: "#230f0f",
                        lineHeight: "28px",
                        whiteSpace: "nowrap",
                    }}
                >
                    AI Trợ lý
                </Typography>
            </Stack>

            {/* Chat Card */}
            <Box sx={{ flex: 1, pt: 2, display: "flex", flexDirection: "column" }}>
                <Paper
                    elevation={5}
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid rgba(138, 0, 0, 0.1)",
                        boxShadow:
                            "0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)",
                        bgcolor: "background.paper",
                    }}
                >
                    {/* Chat Header */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            px: 2,
                            py: 2,
                            bgcolor: "rgba(177, 65, 53, 0.05)",
                            borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                            flexShrink: 0,
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: "success.main",
                                }}
                            />
                            <Typography
                                variant="labelLabel3Bold"
                                sx={{
                                    color: "primary.main",
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    lineHeight: "20px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                TRỰC TUYẾN
                            </Typography>
                        </Stack>
                        <IconButton size="small" sx={{ p: 0 }}>
                            <HistoryOutlinedIcon
                                sx={{ width: 16, height: 16, color: "text.secondary" }}
                            />
                        </IconButton>
                    </Stack>

                    {/* Messages Area */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {messages.map((msg) =>
                            msg.sender === "ai" ? (
                                <Stack
                                    key={msg.id}
                                    direction="row"
                                    alignItems="flex-start"
                                    spacing={1}
                                    sx={{ maxWidth: "calc(100% - 40px)" }}
                                >
                                    <AiAvatar />
                                    <Box
                                        sx={{
                                            flex: 1,
                                            p: 1.5,
                                            bgcolor: "rgba(177, 65, 53, 0.05)",
                                            borderRadius: "0px 16px 16px 16px",
                                        }}
                                    >
                                        {typeof msg.content === "string" ? (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "text.primary" }}
                                            >
                                                {msg.content}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                sx={{ color: "text.primary" }}
                                            >
                                                {msg.content}
                                            </Typography>
                                        )}
                                    </Box>
                                </Stack>
                            ) : (
                                <Stack key={msg.id} direction="row" justifyContent="flex-end">
                                    <Box
                                        sx={{
                                            maxWidth: "calc(100% - 40px)",
                                            px: 1.5,
                                            py: 1.5,
                                            bgcolor: "#e2e8f0",
                                            borderRadius: "16px 0px 16px 16px",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "text.primary",
                                                fontFamily: "'Epilogue-Regular', Helvetica",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                lineHeight: "20px",
                                            }}
                                        >
                                            {msg.content}
                                        </Typography>
                                    </Box>
                                </Stack>
                            ),
                        )}
                    </Box>

                    {/* Input Area */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "background.paper",
                            borderTop: "1px solid rgba(138, 0, 0, 0.1)",
                            flexShrink: 0,
                        }}
                    >
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Đặt câu hỏi cho AI..."
                                fullWidth
                                sx={{
                                    bgcolor: "#e5e5e5",
                                    borderRadius: "12px",
                                    px: 2,
                                    py: "15px",
                                    pr: 6,
                                    fontSize: "14px",
                                    fontFamily: "'Epilogue-Regular', Helvetica",
                                    color: "#737373",
                                    lineHeight: "normal",
                                    "& input::placeholder": {
                                        color: "#737373",
                                        opacity: 1,
                                    },
                                }}
                            />
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: 32,
                                    height: 32,
                                    bgcolor: "primary.main",
                                    borderRadius: "8px",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                }}
                            >
                                <SendIcon sx={{ width: 16, height: 16, color: "#fff" }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Stack>
    );
};

export default AiAssistantChatSection;
