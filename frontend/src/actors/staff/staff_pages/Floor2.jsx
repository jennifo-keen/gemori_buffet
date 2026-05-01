import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SelectFloor from '../staff_components/SelectFloor';
import SquareTable from '../staff_components/SquareTable';
import Table_8     from '../staff_components/Table_8';
import Table_4     from '../staff_components/Table_4';

import useAuthStaff from '../staff_hook/useAuthStaff';
import useDialog    from '../staff_hook/useDialog';

import { handleTableAction }                    from '../staff_config/tablesActions';
import { getFloors, getFloorTables, getChairConfig } from '../staff_config/floorConfig';

const Floor2 = ({ onTableClick, basePath = '/staff' }) => {
  const navigate = useNavigate();
  const { showError } = useDialog();
  const {
    tables,                         // ✅ thêm tables
    tablesLoading, tablesError,
    getTable, getStatus, getTableColor, getChairColor,
    // ❌ xóa getFloorTables — dùng từ floorConfig thay vì context
  } = useAuthStaff();

  if (tablesLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );
  if (tablesError) return (
    <Box p={4}><Typography color="error">{tablesError}</Typography></Box>
  );

  const handleClick = (code) => {
    const table = getTable(code);
    if (onTableClick) onTableClick(table);
    else handleTableAction({ table, navigate, showError });
  };

  // ✅ Dùng getFloors/getFloorTables từ floorConfig
  const floors     = getFloors(tables, basePath);
  const floorStats = floors.map(f => ({
    ...f,
    emptyTables:   f.tables.filter(t => t.status === 'empty').length,
    pendingTables: f.tables.filter(t => t.status === 'ordering').length,
  }));

  // ✅ Lấy bàn tầng 2 (index = 1)
  const floorTables = getFloorTables(tables, 1);
  const half        = Math.ceil(floorTables.length / 2);
  const row1        = floorTables.slice(0, half);
  const row2        = floorTables.slice(half);

  // ✅ Render bàn — hỗ trợ Table_8, Table_4, SquareTable theo CHAIR_CONFIG
  const renderTable = (table) => {
    const config      = getChairConfig(table.table_code);
    const status      = getStatus(table);
    const tableNum    = table.table_code;

    const wrapper = (children) => (
      <Box key={tableNum} onClick={() => handleClick(tableNum)} sx={{ cursor: 'pointer' }}>
        {children}
      </Box>
    );

    if (config.type === 'Table_8') return wrapper(
      <Table_8 table={{ tableNumber: tableNum, capacity: '8 người', foodStatus: '', status }} />
    );

    if (config.type === 'Table_4') return wrapper(
      <Table_4 table={{ tableNumber: tableNum, capacity: '4 người', foodStatus: '', status }} />
    );

    const chairTop    = config.chairTop    ?? 2;
    const chairBottom = config.chairBottom ?? 2;
    const chairLeft   = config.chairLeft;
    const chairRight  = config.chairRight;

    return wrapper(
      <SquareTable
        table={{
          tableNumber: tableNum,
          capacity:    `${chairTop + chairBottom} người`,
          foodStatus:  '',
          status,
        }}
        tableActiveColor={config.tableColor || getTableColor(table)}
        chairActiveColor={config.chairColor || getChairColor(table)}
        chairTop={chairTop}
        chairBottom={chairBottom}
        chairLeft={chairLeft}
        chairRight={chairRight}
      />
    );
  };

  return (
    <Box sx={{ p: "32px", gap: "22px" }}>
      {/* SelectFloor tabs */}
      <Stack direction="row" sx={{ gap: '22px' }}>
        {floorStats.map((f, i) => (
          <SelectFloor
            key={f.title}
            title={f.title}
            emptyTables={f.emptyTables}
            pendingTables={f.pendingTables}
            status={i === 1 ? 1 : 0}  // ✅ tầng 2 active
            path={f.path}
          />
        ))}
      </Stack>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="space-between"
          sx={{ width: "100%", pt: "24px" }}
        >
          {row1.map(renderTable)}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}
          sx={{ width: 154, bgcolor: '#e5e5e5', borderRadius: 2, padding: 1.25, alignSelf: 'flex-end' }}
        >
          <ArrowBackIcon sx={{ width: 32, height: 32, color: '#3d3d3d' }} />
          <Typography variant="body1" sx={{ color: 'black', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Lối vào
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ width: "100%" }}>
          {row2.map(renderTable)}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Floor2;