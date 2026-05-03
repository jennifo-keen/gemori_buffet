import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    IconButton,
    Stack,
    CircularProgress,
    Typography,
    Pagination,
    Tooltip,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField,
} from "@mui/material";
import React, { useState } from "react";

const BRAND_RED = "#A21A16";
const BRAND_RED_LIGHT = "#A21A161a";

const commonFontSx = {
    fontFamily: '"Be Vietnam Pro", sans-serif',
};

const headerLabelSx = {
    fontSize: "12px",
    fontWeight: 700,
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    ...commonFontSx,
};

export const IngredientsCatalogSection = ({ data = [], isLoading, onEditClick }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    if (isLoading) {
        return (
            <Stack alignItems="center" sx={{ py: 10 }}>
                <CircularProgress size={32} thickness={5} sx={{ color: BRAND_RED }} />
            </Stack>
        );
    }



    // --- FIX LỖI ESLINT: TÍNH TOÁN TRANG HIỆN TẠI AN TOÀN ---
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Nếu trang hiện tại (ví dụ trang 5) lớn hơn tổng số trang mới sau khi filter (ví dụ chỉ còn 1 trang)
    // thì mình sẽ lấy trang cuối cùng khả dụng thay vì báo "Không có dữ liệu"
    const currentPage = page > totalPages ? 1 : page;

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

    return (
        <Box component="section" sx={{ width: "100%" }}>
            <Card
                sx={(theme) => ({
                    width: "100%",
                    borderRadius: 3,
                    border: `1px solid ${BRAND_RED_LIGHT}`,
                    boxShadow: theme.shadows[1],
                    overflow: "hidden",
                    bgcolor: "background.paper",
                })}
            >
                {/* Header */}
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        px: 4,
                        py: 2,
                        bgcolor: "#fcf9f8",
                        borderBottom: `1px solid ${BRAND_RED_LIGHT}`,
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
                        <WidgetsOutlinedIcon sx={{ fontSize: 18, color: BRAND_RED }} />
                        <Typography sx={headerLabelSx}>Nguyên liệu ({data.length})</Typography>
                    </Stack>
                    <Typography sx={{ ...headerLabelSx, width: 100, textAlign: "center" }}>Loại</Typography>
                    <Typography sx={{ ...headerLabelSx, width: 100, textAlign: "right", pr: 2 }}>Số lượng</Typography>
                    <Box sx={{ width: 48 }} />
                </Stack>

                {/* Danh sách món */}
                <Box component="main" sx={{ minHeight: paginatedData.length > 0 ? "auto" : 200 }}>
                    {paginatedData.length === 0 ? (
                        <Typography sx={{ p: 4, textAlign: 'center', ...commonFontSx, color: 'text.secondary' }}>
                            Không tìm thấy dữ liệu phù hợp.
                        </Typography>
                    ) : (
                        paginatedData.map((item, index) => {
                            const isOutOfStock = item.stock_quantity === 0;
                            const isLowStock = item.stock_quantity <= item.min_quantity && item.stock_quantity > 0;

                            return (
                                <React.Fragment key={item.id || index}>
                                    {index > 0 && <Divider sx={{ borderColor: "#A21A160d" }} />}
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            px: 4,
                                            py: 2.2,
                                            "&:hover": { bgcolor: "#fcf9f8" },
                                            transition: "background 0.2s",
                                        }}
                                    >
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    bgcolor: isOutOfStock ? "#fee2e2" : BRAND_RED_LIGHT,
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {isOutOfStock ? (
                                                    <WarningAmberRoundedIcon sx={{ color: "error.main", fontSize: 20 }} />
                                                ) : (
                                                    <Typography sx={{ fontWeight: 700, color: BRAND_RED }}>
                                                        {item.menu_name?.charAt(0)}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Stack spacing={0.5}>
                                                <Typography sx={{ fontSize: "14px", fontWeight: 700, ...commonFontSx }}>
                                                    {item.menu_name}
                                                </Typography>
                                                {(isOutOfStock || isLowStock) && (
                                                    <Typography
                                                        sx={{
                                                            fontSize: "10px",
                                                            fontWeight: 800,
                                                            color: isOutOfStock ? "error.main" : "#d97706",
                                                            ...commonFontSx,
                                                        }}
                                                    >
                                                        {isOutOfStock ? "HẾT HÀNG" : "SẮP HẾT"}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Stack>

                                        <Stack alignItems="center" sx={{ width: 100 }}>
                                            <Chip
                                                label={item.type || "N/A"}
                                                size="small"
                                                sx={{
                                                    height: 24,
                                                    fontSize: "11px",
                                                    fontWeight: 600,
                                                    bgcolor: BRAND_RED_LIGHT,
                                                    color: BRAND_RED,
                                                    ...commonFontSx,
                                                }}
                                            />
                                        </Stack>

                                        <Stack alignItems="flex-end" sx={{ width: 100, pr: 2 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: 800,
                                                    color: isOutOfStock ? "error.main" : isLowStock ? "#d97706" : "text.primary",
                                                    ...commonFontSx,
                                                }}
                                            >
                                                {item.stock_quantity}
                                            </Typography>
                                            <Typography sx={{ fontSize: "10px", color: "text.secondary", ...commonFontSx }}>
                                                Min: {item.min_quantity || 0}
                                            </Typography>
                                        </Stack>

                                        <Tooltip title="Chỉnh sửa định mức">
                                            <IconButton
                                                size="small"
                                                onClick={() => onEditClick?.(item)}
                                                sx={{ color: BRAND_RED, "&:hover": { bgcolor: BRAND_RED_LIGHT } }}
                                            >
                                                <EditOutlinedIcon sx={{ fontSize: 20 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </React.Fragment>
                            );
                        })
                    )}
                </Box>

                {/* Footer */}
                <Divider sx={{ borderColor: BRAND_RED_LIGHT }} />
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 2, bgcolor: "#fcf9f8", gap: 2 }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage} // Sử dụng giá trị đã được kiểm tra an toàn
                        onChange={handleChangePage}
                        size="small"
                        sx={{
                            "& .MuiPaginationItem-root": { ...commonFontSx, fontWeight: 600 },
                            "& .Mui-selected": { bgcolor: `${BRAND_RED_LIGHT} !important`, color: BRAND_RED },
                        }}
                    />
                </Stack>
            </Card>
        </Box>
    );
};

export default IngredientsCatalogSection;