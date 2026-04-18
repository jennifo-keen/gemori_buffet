import React from "react";
import { Stack, Chip } from "@mui/material";

// 🔥 Map category EN -> VI
const categoryMap = {
    all: "Tất cả",
    seafood: "Hải sản",
    meat: "Thịt",
    poultry: "Nội tạng",
    vegetable: "Rau củ",
    side: "Mì - viên thả lẩu",
    luxury: "Cao cấp",
};

// 🔥 Helper lấy label
const getLabel = (cat) => categoryMap[cat] || cat;

export const MenuFilterPillsSection = ({
    categories = [],
    activeTab,
    setActiveTab,
}) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                overflowX: "auto",
                pb: 1,

                // ẩn scrollbar
                "&::-webkit-scrollbar": { display: "none" },

                // tránh xuống dòng
                whiteSpace: "nowrap",
            }}
        >
            {categories.map((cat) => {
                const isActive = activeTab === cat;

                return (
                    <Chip
                        key={cat}
                        label={getLabel(cat)} // 🔥 hiển thị tiếng Việt
                        onClick={() => setActiveTab(cat)} // 🔥 vẫn giữ value EN
                        clickable
                        sx={{
                            px: 1,
                            py: 2,
                            fontWeight: 600,
                            fontSize: 13,

                            backgroundColor: isActive ? "#A21A16" : "#f1f5f9",
                            color: isActive ? "#ffffff" : "#64748b",

                            border: "1px solid",
                            borderColor: isActive ? "#A21A16" : "#e2e8f0",

                            transition: "all 0.2s ease",

                            "&:hover": {
                                backgroundColor: isActive ? "#7f1412" : "#e2e8f0",
                            },

                            // bo tròn đẹp hơn
                            borderRadius: "8px",
                        }}
                    />
                );
            })}
        </Stack>
    );
};