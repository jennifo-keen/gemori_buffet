import React from 'react';
import Card from "../kitchen_components/OrderCard"
import { Container, Grid } from "@mui/material";

const tables = [
  {
    id: 1,
    number: "01",
    quantity: 2,
    name: "Ba chỉ bò Mỹ",
    note: "Cắt mỏng",
    time: "12:45",
    waiting: 3,
  },
  {
    id: 2,
    number: "02",
    quantity: 3,
    name: "Ba chỉ bò Mỹ",
    note: "Cắt mỏng",
    time: "12:5",
    waiting: 3,
  },
  {
    id: 3,
    number: "03",
    quantity: 4,
    name: "Ba chỉ bò Mỹ",
    note: "Cắt mỏng",
    time: "12:45",
    waiting: 3,
  },
  {
    id: 4,
    number: "04",
    quantity: 2,
    name: "Ba chỉ bò Mỹ",
    note: "Cắt mỏng",
    time: "12:46",
    waiting: 3,
  },
];

export default function Kitchen_OrdAll() {
  return (
     <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {tables.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}