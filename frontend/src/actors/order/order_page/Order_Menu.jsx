import React , { useEffect } from 'react';
import { Box, Stack, Divider, Container, CircularProgress, Typography } from "@mui/material";

import { useOrder } from '../order_context/OrderContext';

import Navbar from "../order_component/Navbar";       
import CardOrd from "../order_component/CartOrd";
import HeaderOrd from "../order_component/HeaderOrd"
import ListOrd from "../order_component/ListCategory"
import ItemMenu from "../order_component/MenuItems"

const OrderContent = () => {
  const { menu, selectedCategory, loading, error, loadMenuAndOrder } = useOrder();
  useEffect(() => { loadMenuAndOrder(); }, [loadMenuAndOrder]);
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#a21a16" }} />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={4}>
      <Typography color="error" textAlign="center">{error}</Typography>
    </Box>
  );

  // Lấy items của category đang chọn
  const currentItems = menu.categories.find(c => c.name === selectedCategory)?.items || [];

  return (
    <Box sx={{ flex: 1, display: "flex", overflowY: "auto", backgroundColor: "white" }}>

      {/* Sidebar category */}
      <Box sx={{
        width: { xs: '15vh', md: '20vh' },
        borderRight: "1px solid",
        borderColor: "grey.100",
        backgroundColor: "#fffdfa",
        position: "sticky",
        top: 0,
        height: "100%",
      }}>
        <ListOrd />
      </Box>

      {/* Danh sách món */}
      <Box sx={{ flex: 1, p: 2, overflowY: "auto", height: "100%" }}>
        <Typography variant="body2" fontWeight="bold" color="text.primary" noWrap>
                {selectedCategory?.charAt(0).toUpperCase() + selectedCategory?.slice(1)}
        </Typography>
              
        {currentItems.map(item => (
          <ItemMenu key={item.id} item={item} />
        ))}
           
        {currentItems.length === 0 && (
          <Typography color="text.secondary" textAlign="center" mt={4}>
            Không có món trong danh mục này
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export const Order_Menu_Layout = () => {
  return (
      <Box sx={{
        width: "100%", height: "100vh",
        display: "flex", flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative", overflow: "hidden",
      }}>
        <Stack sx={{ zIndex: 10, bgcolor: "white" }}>
          <Navbar />
          <Divider />
          <HeaderOrd />
        </Stack>

        <OrderContent />

        <CardOrd />
      </Box>
  );
};

export default Order_Menu_Layout;