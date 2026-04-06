import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../kitchen_components/OrderCard";
import { Box, Container, Grid, Typography, CircularProgress, Chip, Stack } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TableBarIcon from "@mui/icons-material/TableBar";
import { fetchPendingItems, fetchStats } from '../kitchen_api/kitchenApi';
import { useKitchenSocket } from '../kitchen_hook/useKitchenSocket';

export default function Kitchen_OrdAll() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [stats, setStats] = useState({ pending_count: 0, cooking_count: 0, active_tables: 0 });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [itemsRes, statsRes] = await Promise.all([
        fetchPendingItems(),
        fetchStats(),
      ]);
      setTables(itemsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Không thể tải dữ liệu bếp:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Sử dụng custom hook cho Socket
  useKitchenSocket(loadData, setTables);

  const handleViewDetail = (tableData) => {
    navigate(`/kitchen/${tableData.table_code}/ord_ord`);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );
  return (
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", pb: 4 }}>

      {/* Stats bar */}
      <Box sx={{ bgcolor: "white", borderBottom: "1px solid #f1f5f9", px: 3, py: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" fontWeight={700} color="#0f172a" sx={{ mr: 2 }}>
            Bếp
          </Typography>

          <Chip icon={<HourglassEmptyIcon sx={{ fontSize: 16 }} />}
            label={`Chờ: ${stats.pending_count}`}
            sx={{ bgcolor: "#fff7ed", color: "#c2410c", fontWeight: 700, border: "1px solid #fdba74" }}
          />
          <Chip icon={<RestaurantIcon sx={{ fontSize: 16 }} />}
            label={`Đang làm: ${stats.cooking_count}`}
            sx={{ bgcolor: "#ffeed1", color: "#b4463c", fontWeight: 700, border: "1px solid #f4ca66" }}
          />
          <Chip icon={<TableBarIcon sx={{ fontSize: 16 }} />}
            label={`Bàn: ${stats.active_tables}`}
            sx={{ bgcolor: "#f0fdf4", color: "#166534", fontWeight: 700, border: "1px solid #86efac" }}
          />
        </Stack>
      </Box>

      <Container maxWidth="lg">
        {tables.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <RestaurantIcon sx={{ fontSize: 64, color: "#e2e8f0" }} />
            <Typography variant="h6" color="text.secondary" mt={2}>
              Không có món nào đang chờ
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {tables.map((tableData) => (
              <Grid item xs={12} sm={6} md={6} key={tableData.table_code}>
                <Card
                  tableData={tableData}
                  onViewDetail={handleViewDetail}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}