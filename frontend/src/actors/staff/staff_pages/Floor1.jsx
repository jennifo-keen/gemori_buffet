import React from 'react';
import { Stack, Box, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SelectFloor from '../staff_components/SelectFloor';
import SquareTable from '../staff_components/SquareTable';
import { useAuthStaff } from '../staff_context/AuthStaffContext';
import { FLOORS, FLOOR1_ROW1, FLOOR1_ROW2 } from '../staff_config/floorConfig';

const Floor1 = () => {
  const {
    tablesLoading, tablesError,
    getTable, getStatus, getTableColor, getChairColor, getFloorTables,
  } = useAuthStaff();

  if (tablesLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  if (tablesError) return (
    <Box p={4}><Typography color="error">{tablesError}</Typography></Box>
  );

  const floorStats = FLOORS.map(f => {
    const t = getFloorTables(f.range[0], f.range[1]);
    return {
      ...f,
      emptyTables: t.filter(t => t.status === 'empty').length,
      pendingTables: t.filter(t => t.status === 'ordering').length,
    };
  });

  const renderRow = (row) => row.map(({ code, chairTop, chairBottom }) => (
    <SquareTable
      key={code}
      table={{
        tableNumber: code,
        capacity: chairTop + chairBottom + ' người',
        foodStatus: 'Món đã ra: 5/7',
        status: getStatus(getTable(code)),
      }}
      tableActiveColor={getTableColor(getTable(code))}
      chairActiveColor={getChairColor(getTable(code))}
      chairTop={chairTop}
      chairBottom={chairBottom}
    />
  ));

  return (
    <Box sx={{ p: "32px", gap: "22px" }}>
      <Stack direction="row" sx={{ gap: '22px' }}>
        {floorStats.map((f, i) => (
          <SelectFloor
            key={f.title}
            title={f.title}
            emptyTables={f.emptyTables}
            pendingTables={f.pendingTables}
            status={i === 0 ? 1 : 0}
            path={f.path}
          />
        ))}
      </Stack>

      <Stack alignItems="flex-start" spacing={1} 
      sx={{
        mt: "12px",
      }}>
        {/* Hàng 1 — bàn 1 đến 5 */}
        <Stack direction="row" 
              spacing={1} 
              justifyContent="space-between" 
              sx={{ width: "100%" }}
        >
        {renderRow(FLOOR1_ROW1)}
        </Stack>

        {/* Lối vào */}
        <Stack direction="row" alignItems="center" justifyContent="center" 
          sx={{ 
            width: 154, 
            bgcolor: "#e5e5e5", 
            borderRadius: 2, 
            padding: 1.25, 
            alignSelf: "flex-end",
            my: "40px",
          }}
        >
          <ArrowBackIcon sx={{ width: 32, height: 32, color: "#3d3d3d" }} />
          <Typography variant="body1" sx={{ color: "black", whiteSpace: "nowrap", fontWeight: 600 }}>
            Lối vào
          </Typography>
        </Stack>

        {/* Hàng 2 — bàn 6 đến 10 */}
        <Stack direction="row" 
              spacing={1} 
              justifyContent="space-between" 
              sx={{ width: "100%" }}
        >{renderRow(FLOOR1_ROW2)}</Stack>
      </Stack>
    </Box>
  );
};

export default Floor1;