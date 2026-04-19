import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const OrderStatusFilterTabsSection = ({ onChange, counts }) => {
    const [activeTab, setActiveTab] = useState(0);
    const STATUS_MAP = [null, "ordering", "paid"];

    // Cấu hình nhãn dựa trên prop counts truyền từ cha vào
    const tabs = [
        { label: "Tất cả", count: counts?.all || 0 },
        { label: "Đang phục vụ", count: counts?.ordering || 0 },
        { label: "Đã thanh toán", count: counts?.paid || 0 },
    ];

    const handleTabChange = (_event, newValue) => {
        setActiveTab(newValue);
        onChange(STATUS_MAP[newValue]);
    };

    return (
        <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
                borderBottom: "1px solid #eee",
                "& .MuiTabs-indicator": { backgroundColor: "#A21A16", height: "2px" },
                "& .MuiTabs-flexContainer": { gap: 4 },
            }}
        >
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    label={`${tab.label} (${tab.count})`}
                    disableRipple
                    sx={{
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: activeTab === index ? 700 : 600,
                        color: activeTab === index ? "#A21A16" : "gray",
                        "&.Mui-selected": { color: "#A21A16" },
                    }}
                />
            ))}
        </Tabs>
    );
};