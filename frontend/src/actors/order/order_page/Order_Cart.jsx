import React, { useState } from "react";
import Header from "../order_component/Navbar";
import FooterCart from "../order_component/Btn_FooterCart";
import ItemMenu from "../order_component/ItemSelect";
import { Box, Tabs as MuiTabs, Tab, Typography, Stack } from "@mui/material";

export const Order_Cart = () => {
  // Danh sách tab
  const tabData = [
    { label: "GIỎ HÀNG" },     
    { label: "MÓN ĐÃ GỌI" }, 
  ];

  const stats = [
    { label: "Tổng số món đã gọi:", value: "07 món", valueColor: "#8a0000" },
    {
        label: "Thời gian gọi món gần nhất:",
        value: "19:42",
        valueColor: "slate700",
    },
        ];
            

  // State lưu tab đang chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* ================== TAB ================== */}
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <MuiTabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{
            style: { backgroundColor: "#6c0d0a", height: 3 },
          }}
          sx={{
            minHeight: 53,
            "& .MuiTab-root": {
              color: "neutral.500",
              fontWeight: "bold",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              minHeight: 53,
            },
            "& .Mui-selected": {
              color: "#6c0d0a !important",
              fontWeight: "bold",
            },
          }}
        >
          {tabData.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </MuiTabs>
      </Box>

      {/* ================== CONTENT ================== */}

      {activeTab === 0 && (
        <>
          {/* Danh sách món trong giỏ */}
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />

          <FooterCart />
        </>
      )}

      {/* TAB 2: MÓN ĐÃ GỌI */}
      {activeTab === 1 && (
        <>
          {/* Danh sách món đã gọi (có thể dùng component khác) */}
          <ItemMenu />
          <ItemMenu />
          <ItemMenu />
<ItemMenu />
          <ItemMenu />
          <ItemMenu /><ItemMenu />
          <ItemMenu />
          <ItemMenu /><ItemMenu />
          <ItemMenu />
          <ItemMenu /><ItemMenu />
          <ItemMenu />
          <ItemMenu />
          {/* 👉 Thông tin tổng kết */}
          <Box 
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)", 
            zIndex: 1100, 
            maxWidth: 430,
            width: "100%",
            borderTop: "1px solid rgba(138, 0, 0, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.9)", 
            backdropFilter: "blur(8px)", 
            p: 2,
            pb: 3,
        }}>
          
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#fff7f3",
                    px: 2,
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 358,
                      border: "2px dashed #c5a05980",
                      borderRadius: 3,
                      bgcolor: "#c5a0590d",
                      p: 2,
                    }}
                  >
                    <Stack spacing={1}>
                      {stats.map((stat, index) => (
                        <Stack
                          key={index}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={500}
                          >
                            {stat.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{
                        
                              color: index === 1 ? "#334155" : "#8a0000",
                            }}
                          >
                            {stat.value}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Order_Cart;