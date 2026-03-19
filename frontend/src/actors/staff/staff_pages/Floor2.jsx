import React from 'react';
import { Stack, Box, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SelectFloor from '../staff_components/SelectFloor';
import SquareTable from '../staff_components/SquareTable';
import Table_8 from '../staff_components/Table_8';
import Table_4 from '../staff_components/Table_4';
import { useAuthStaff } from '../staff_context/AuthStaffContext';
import { FLOORS, FLOOR2_ROW1, FLOOR2_ROW2 } from '../staff_config/floorConfig';

const Floor2 = () => {
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

  const renderTable = ({ code, type, chairTop, chairBottom, chairLeft, chairRight, tableColor, chairColor }) => {
    const table = getTable(code);
    const status = getStatus(table);

    if (type === 'Table_8') return (
      <Table_8 key={code} table={{ tableNumber: Number(code), capacity: '8 người', foodStatus: 'Món đã ra: 5/7', status }} />
    );

    if (type === 'Table_4') return (
      <Table_4 key={code} table={{ tableNumber: Number(code), capacity: '4 người', foodStatus: 'Món đã ra: 5/7', status }} />
    );
 return (
      <SquareTable
        key={code}
        table={{ tableNumber: code, capacity: (chairTop + chairBottom) + ' người', foodStatus: 'Món đã ra: 5/7', status }}
        tableActiveColor={tableColor || getTableColor(table)}
        chairActiveColor={chairColor || getChairColor(table)}
        chairTop={chairTop} chairBottom={chairBottom}
        chairLeft={chairLeft} chairRight={chairRight}
      />
    );
  };
  return (
    <Box sx={{ p: "32px", gap: "22px" }}>
       {/* Chọn tầng */}
      <Stack direction="row" sx={{ gap: '22px' }}>
        {floorStats.map((f, i) => (
          <SelectFloor
            key={f.title}
            title={f.title}
            emptyTables={f.emptyTables}
            pendingTables={f.pendingTables}
            status={i === 1 ? 1 : 0}
            path={f.path}
          />
        ))}
      </Stack>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" spacing={1}>{FLOOR2_ROW1.map(renderTable)}</Stack>

        {/* Lối vào */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}
          sx={{ width: 154, bgcolor: '#e5e5e5', borderRadius: 2, padding: 1.25, alignSelf: 'flex-end' }}
        >
          <ArrowBackIcon sx={{ width: 32, height: 32, color: '#3d3d3d' }} />
          <Typography variant="body1" sx={{ color: 'black', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Lối vào
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>{FLOOR2_ROW2.map(renderTable)}</Stack>
      </Stack>
    </Box>
  );
};

export default Floor2;
