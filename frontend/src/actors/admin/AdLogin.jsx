import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography,
    CircularProgress
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const AdLogin = () => {
    // --- STATE UI ---
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // --- STATE DATA ---
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // --- HANDLERS ---
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const handleLogin = async () => {
        if (!username || !password) {
            return alert("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const result = await response.json(); // Chuyển response sang JSON

            // Với fetch, bạn phải check response.ok (status 200-299)
            if (response.ok && result.success) {
                const { token, user } = result.data; // Lấy từ result.data theo cấu trúc Postman của bạn

                // Lưu thông tin dựa trên Remember Me
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem("token", token);
                storage.setItem("user", JSON.stringify(user));

                // Điều hướng dựa trên role
                const roleRedirects = {
                    admin: "/admin",
                    staff: "/staff",
                    kitchen: "/kitchen"
                };

                navigate(roleRedirects[user.role] || "/");
            } else {
                // Hiển thị message lỗi từ backend nếu có
                alert(result.message || "Đăng nhập thất bại. Vui lòng thử lại.");
            }

        } catch (err) {
            console.error("Login Error:", err);
            alert("Lỗi kết nối đến server. Vui lòng kiểm tra lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5", // Background xám nhạt bên ngoài
                p: 2
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    maxWidth: "1200px",
                    width: "100%",
                    bgcolor: "background.paper",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
                }}
            >
                {/* Left panel - hero image with overlay */}
                <Box
                    sx={{
                        position: "relative",
                        minHeight: "727px",
                        display: { xs: "none", md: "block" },
                    }}
                >
                    <Box
                        component="img"
                        src="../../../public/login_bgr.png" // ảnh đã có chữ sẵn
                        alt="Manwah Heritage"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",     // giống background-size: cover
                            objectPosition: "center", // giống background-position: center
                        }}
                    />
                </Box>

                {/* Right panel - login form */}
                <Stack
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ p: 8, height: "727px" }}
                >
                    <Box pb={5} width="100%">
                        <Box pb={3}>
                            <Typography
                                sx={{
                                    fontFamily: '"Be Vietnam Pro", Helvetica',
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "#A21A16", // Màu đỏ Manwah
                                }}
                            >
                                GEMORI
                            </Typography>
                        </Box>
                        <Box pb={1}>
                            <Typography
                                sx={{
                                    fontFamily: '"Epilogue-Bold", Helvetica',
                                    fontWeight: 700,
                                    fontSize: "24px",
                                    color: "text.primary",
                                }}
                            >
                                Đăng nhập hệ thống
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: '"Epilogue-Regular", Helvetica',
                                fontSize: "14px",
                                color: "text.secondary",
                            }}
                        >
                            Vui lòng nhập thông tin để tiếp tục.
                        </Typography>
                    </Box>

                    <Box pb={2} width="100%">
                        <Stack spacing={3} width="100%">
                            {/* Username field */}
                            <Stack spacing={1} width="100%">
                                <Typography
                                    sx={{
                                        fontFamily: '"Epilogue-Bold", Helvetica',
                                        fontWeight: 700,
                                        fontSize: "10px",
                                        letterSpacing: "1px",
                                        color: "#5A403C", // textBrown
                                    }}
                                >
                                    TÀI KHOẢN
                                </Typography>
                                <OutlinedInput
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin_username"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonOutlineIcon sx={{ color: "#5A403C", width: 18 }} />
                                        </InputAdornment>
                                    }
                                    sx={{
                                        bgcolor: "rgba(177,65,53,0.05)",
                                        borderRadius: "8px",
                                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    }}
                                />
                            </Stack>

                            {/* Password field */}
                            <Stack spacing={1} width="100%">
                                <Typography
                                    sx={{
                                        fontFamily: '"Epilogue-Bold", Helvetica',
                                        fontWeight: 700,
                                        fontSize: "10px",
                                        letterSpacing: "1px",
                                        color: "#5A403C",
                                    }}
                                >
                                    MẬT KHẨU
                                </Typography>
                                <OutlinedInput
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: "#5A403C", width: 18 }} />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {showPassword ? <VisibilityOffOutlinedIcon sx={{ width: 18 }} /> : <VisibilityOutlinedIcon sx={{ width: 18 }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    sx={{
                                        bgcolor: "rgba(177,65,53,0.05)",
                                        borderRadius: "8px",
                                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    }}
                                />
                            </Stack>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        size="small"
                                        sx={{ color: "#A21A16", "&.Mui-checked": { color: "#A21A16" } }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: "14px", color: "#5A403C" }}>Ghi nhớ đăng nhập</Typography>}
                            />

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleLogin}
                                disabled={loading}
                                endIcon={!loading && <ExitToAppIcon />}
                                sx={{
                                    bgcolor: "#6c0d0a",
                                    color: "white",
                                    borderRadius: "8px",
                                    py: 1.5,
                                    fontWeight: 700,
                                    "&:hover": { bgcolor: "#8a1a16" },
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "ĐĂNG NHẬP"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default AdLogin;