import { Box, Chip, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";

// Màu sắc thương hiệu
const BRAND_RED = "#A21A16";
const BRAND_RED_LIGHT = "#A21A161a";

const labelTypographySx = {
    fontFamily: '"Be Vietnam Pro", sans-serif',
    fontSize: "13px", // Giảm nhẹ size chữ
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0px",
};

const filterOptions = ["Tất cả", "Còn hàng", "Sắp hết", "Hết hàng"];

export default function InventoryQuickFiltersSection({ selectedFilter, onFilterChange }) {
    const filters = useMemo(
        () =>
            filterOptions.map((label) => ({
                label,
                selected: label === selectedFilter,
            })),
        [selectedFilter]
    );

    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2, // Giảm gap để nhỏ gọn hơn
                py: 1,  // Giảm padding dọc
                px: 0.5,
                bgcolor: "transparent", // Không có màu nền
                borderRadius: 0,
                borderBottom: `1px solid ${BRAND_RED_LIGHT}`, // Chỉ để lại viền dưới nhẹ
                overflowX: "auto",
                "&::-webkit-scrollbar": { height: "4px" },
                "&::-webkit-scrollbar-thumb": { bgcolor: BRAND_RED_LIGHT, borderRadius: 10 }
            }}
        >
            <Typography
                component="h2"
                variant="subtitle2"
                sx={{
                    ...labelTypographySx,
                    color: "#5a403c",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    opacity: 0.6
                }}
            >
                LỌC NHANH:
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="nowrap">
                {filters.map((filter) => (
                    <Chip
                        key={filter.label}
                        label={filter.label}
                        clickable
                        onClick={() => onFilterChange(filter.label)}
                        sx={{
                            height: 28, // Thu nhỏ chiều cao Chip
                            px: 0.5,
                            borderRadius: "8px", // Bo góc nhẹ cho hiện đại
                            bgcolor: filter.selected ? BRAND_RED : "transparent",
                            color: filter.selected ? "#fff" : BRAND_RED,
                            border: `1px solid ${filter.selected ? BRAND_RED : BRAND_RED_LIGHT}`,
                            transition: "all 0.2s ease",
                            "& .MuiChip-label": {
                                px: 1,
                                ...labelTypographySx,
                            },
                            "&:hover": {
                                bgcolor: filter.selected ? BRAND_RED : BRAND_RED_LIGHT,
                                transform: "translateY(-1px)"
                            },
                            flexShrink: 0,
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}