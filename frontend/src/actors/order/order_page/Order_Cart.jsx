import React, { useState, useEffect } from "react";
import Header from "../order_component/Navbar";
import FooterCart from "../order_component/Btn_FooterCart";
import ItemSelect from "../order_component/ItemSelect";
import { Box, Tabs as MuiTabs, Tab, Typography, Stack, CircularProgress, Chip  } from "@mui/material";
import { useOrder } from '../order_context/OrderContext';
import Cheers from "../../../assets/icon/Cheers.svg?react";

export const Order_Cart = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {tableCode, cart, order, loading, loadMenuAndOrder  } = useOrder();
  
  // Danh sách tab
  const tabData = [
    { label: "GIỎ HÀNG" },     
    { label: "MÓN ĐÃ GỌI" }, 
  ];
useEffect(() => { loadMenuAndOrder(); }, [loadMenuAndOrder]);
  const orderedItems = order?.items || [];

 // Thống kê món đã gọi
  const lastOrderTime = orderedItems.length > 0
    ? new Date(orderedItems[orderedItems.length - 1].item_order_time)
        .toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  const stats = [
    { label: "Tổng số món đã gọi:", value: `${orderedItems.length} món` },
    { label: "Thời gian gọi món gần nhất:", value: lastOrderTime },
  ];

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress sx={{ color: "#a21a16" }} />
    </Box>
  );
  
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* ================== TAB ================== */}
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <MuiTabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
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
         {tabData.map((tab, i) => <Tab key={i} label={tab.label} />)}
        </MuiTabs>
      </Box>

      {/* ================== CONTENT ================== */}

      {activeTab === 0 && (
         <>
         <Stack sx={{
          bgcolor: "#fff7f3",
          height: "100vh"
         }}>
            <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1}
            padding={"16px"} 
            
        >
              <Cheers></Cheers>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600,fontSize:"16px" , color: "#1e293b" }}
              >
                Bàn  {tableCode || '...'}
              </Typography>
            </Stack>

            <Stack spacing={1} mt={2}>
              {cart.map(item => (
                <ItemSelect key={item.id} item={item} mode="cart" />
              ))}
            </Stack>
          </Stack>
        </>
      )}
      {cart.length > 0 && <FooterCart />}

      {/* TAB 2: MÓN ĐÃ GỌI */}
      {activeTab === 1 && (
        <>
          {orderedItems.length === 0 ? (
            <Box p={4} textAlign="center">
              <Typography color="text.secondary">Chưa có món nào được gọi</Typography>
            </Box>
          ) : (

            <Box
              component="header"
              py={1}
              sx={{ 
                width: "100%", 
                height: "100%",
                maxWidth: 430, 
                bgcolor: "#fff7f3",
              }}
            >
              <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                spacing={1}
                sx={{ px: 2 }}
              >
                <Typography
                  component="h1"
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "#a21a16", letterSpacing: 0.5 }}
                >
                  DANH SÁCH MÓN ĂN
                </Typography>
              
                <Chip
                  label= {tableCode || '...'}
                  size="small"
                  sx={{
                    backgroundColor: "#e8d2a3",
                    color: "#502800",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    borderRadius: 1,
                    height: "auto",
                    px: 0.5,
                      "& .MuiChip-label": {
                        px: 1,
                        py: 0.25,
                        },
                      }}
                    />
                </Stack>
                <Stack spacing={1} mt={2}>
                  {orderedItems.map(item => 
                    <ItemSelect key={item.id} item={item} mode="ordered" />)
                  }
                </Stack>
              </Box>
          )}

          {/* Thống kê */}
          <Box sx={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            zIndex: 1100, maxWidth: 430, width: "100%",
            borderTop: "1px solid rgba(138,0,0,0.1)",
            backgroundColor: "#FFF7F3", backdropFilter: "blur(8px)",
            p: 2, pb: 3,
          }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",px: 2, py: 1 }}>
              <Box sx={{ width: "100%", maxWidth: 358, border: "2px dashed #c5a05980", borderRadius: 3, bgcolor: "#c5a0590d", p: 2 }}>            
                <Stack spacing={1}>
                  {stats.map((stat, i) => (
                    <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>{stat.label}</Typography>
                      <Typography variant="body2" fontWeight={700} sx={{ color: i === 1 ? "#334155" : "#8a0000" }}>
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