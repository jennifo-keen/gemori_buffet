import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

// Tab data with labels and counts
const STATUS_TABS = [
    { label: "Tất cả", count: 24 },
    { label: "Đang phục vụ", count: 12 },
    { label: "Chờ thanh toán", count: 5 },
    { label: "Đã hoàn thành", count: 7 },
];

export const OrderStatusFilterTabsSection = ({ onChange }) => {
    const [activeTab, setActiveTab] = useState(0);

    const STATUS_MAP = [null, "serving", "pending", "completed"];

    const handleTabChange = (_event, newValue) => {
        setActiveTab(newValue);
        onChange(STATUS_MAP[newValue]);
    };

    return (
        <Tabs
            value={activeTab}
            onChange={handleTabChange}
            component="nav"
            sx={{
                borderBottom: "1px solid",
                borderColor: "brand.primaryBorder",
                minHeight: "unset",
                "& .MuiTabs-indicator": {
                    backgroundColor: "primary.main",
                    height: "2px",
                },
                "& .MuiTabs-flexContainer": {
                    gap: 4,
                },
            }}
        >
            {STATUS_TABS.map((tab, index) => (
                <Tab
                    key={index}
                    label={`${tab.label} (${tab.count})`}
                    disableRipple
                    sx={{
                        padding: "0 0 12px 0",
                        minWidth: "unset",
                        minHeight: "unset",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: 0,
                        fontFamily: '"Be Vietnam Pro", Helvetica, sans-serif',
                        fontWeight: activeTab === index ? 700 : 600,
                        color: activeTab === index ? "primary.main" : "stone.400",
                        "&.Mui-selected": {
                            color: "primary.main",
                            fontWeight: 700,
                        },
                    }}
                />
            ))}
        </Tabs>
    );
};

export default OrderStatusFilterTabsSection;
