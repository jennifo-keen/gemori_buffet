import React from 'react';
import { Box, Stack, Divider, Container } from "@mui/material";

import Navbar from "../order_component/Navbar";       
import CardOrd from "../order_component/CartOrd";
import HeaderOrd from "../order_component/HeaderOrd"
import ListOrd from "../order_component/ListCategory"
import ItemMenu from "../order_component/MenuItems"

export const Order_Menu_Layout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", 
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative", 
        overflow: "hidden", 
      }}
    >

      <Stack sx={{ zIndex: 10, bgcolor: "white" }}>
        <Navbar />
        <Divider />
        <HeaderOrd></HeaderOrd>
      </Stack>


      <Box
        sx={{
          flex: 1,
          display: "flex",
          overflowY: "auto", 
          backgroundColor: "white",
        }}
      >
        
        <Box
          sx={{
            width: {xs:'15vh', md:'20vh'}, 
            borderRight: "1px solid",
            borderColor: "grey.100",
            backgroundColor: "#fffdfa", 
            // overflowY: "auto", 
            position: "sticky",
            top: 0,
            height: "100%", 
          }}
        >
          <ListOrd></ListOrd>
        </Box>

        {/* 4. Khu vực Danh sách món ăn (Bên phải) */}
        <Box
          sx={{
            flex: 1,
            p: 2, 
            overflowY: "auto", 
            height: "100%", 
          }}
        >
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
        </Box>
      </Box>

      <CardOrd />
    </Box>
  );
};

export default Order_Menu_Layout;