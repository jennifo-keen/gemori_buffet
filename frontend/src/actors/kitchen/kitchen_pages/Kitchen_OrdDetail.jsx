import React from 'react';
import { Box } from "@mui/material";
import TableCard from '../kitchen_components/TableCardOpt';

const tables = [
  {
    id: 1,
    tableNumber: "01",
    priority: "normal", // normal | high
    time: "18:05",
    createdAt: "5 phút trước",
    items: [
      {
        id: 1,
        name: "Ba chỉ bò Mỹ",
        quantity: 2,
        note: "Cắt mỏng",
        status: "cooking", // waiting | cooking | done
      },
      {
        id: 2,
        name: "Nạc vai heo",
        quantity: 1,
        note: "",
        status: "waiting",
      },
    ],
  },
  {
    id: 2,
    tableNumber: "02",
    priority: "high",
    time: "18:00",
    createdAt: "10 phút trước",
    items: [
      {
        id: 1,
        name: "Thịt bò hảo hạng",
        quantity: 3,
        note: "Ít mỡ",
        status: "cooking",
      },
      {
        id: 2,
        name: "Hải sản tổng hợp",
        quantity: 1,
        note: "",
        status: "waiting",
      },
      {
        id: 3,
        name: "Kim chi",
        quantity: 2,
        note: "",
        status: "waiting",
      },
    ],
  },
  {
    id: 3,
    tableNumber: "03",
    priority: "normal",
    time: "18:10",
    createdAt: "2 phút trước",
    items: [
      {
        id: 1,
        name: "Ba chỉ bò Mỹ",
        quantity: 1,
        note: "",
        status: "done",
      },
      {
        id: 2,
        name: "Sườn heo",
        quantity: 2,
        note: "Nướng kỹ",
        status: "cooking",
      },
    ],
  },
  {
    id: 4,
    tableNumber: "04",
    priority: "high",
    time: "17:55",
    createdAt: "20 phút trước",
    items: [
      {
        id: 1,
        name: "Thịt bò Wagyu",
        quantity: 1,
        note: "Medium rare",
        status: "cooking",
      },
      {
        id: 2,
        name: "Nấm nướng",
        quantity: 2,
        note: "",
        status: "waiting",
      },
      {
        id: 3,
        name: "Rau tổng hợp",
        quantity: 1,
        note: "",
        status: "waiting",
      },
      {
        id: 4,
        name: "Cơm trắng",
        quantity: 2,
        note: "",
        status: "waiting",
      },
    ],
  },
];

export default function Kitchen_OrdDetail() {
  return (
    <Box
      sx={{
        zoom: 0.75,
        display: "flex",
        gap: 2,
        overflowX: "auto",
        padding: 2,
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",

        // scroll đẹp hơn
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: 4,
        },
      }}
    >
      {tables.map((item, index) => (
        <Box key={index} sx={{ flex: "0 0 auto" }}>
          <TableCard data={item} />
        </Box>
      ))}
    </Box>
  );
};