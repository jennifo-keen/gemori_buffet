export const TABLES_PER_FLOOR = 10;

// Tính danh sách tầng từ mảng tables
export const getFloors = (tables, basePath = '/staff') => {
  if (!tables?.length) return [];

  // Sort theo số trong table_code
  const sorted = [...tables].sort((a, b) => {
    const numA = parseInt(a.table_code.replace(/\D/g, ''));
    const numB = parseInt(b.table_code.replace(/\D/g, ''));
    return numA - numB;
  });

  const floors = [];
  let floorIndex = 0;

  while (floorIndex * TABLES_PER_FLOOR < sorted.length) {
    const start = floorIndex * TABLES_PER_FLOOR;
    const end   = Math.min(start + TABLES_PER_FLOOR, sorted.length);
    const floorTables = sorted.slice(start, end);

    floors.push({
      title:      `Tầng ${floorIndex + 1}`,
      path:       floorIndex === 0 ? basePath : `${basePath}/f${floorIndex + 1}`,
      tables:     floorTables,
      tableStart: floorTables[0]?.table_code,
      tableEnd:   floorTables[floorTables.length - 1]?.table_code,
    });

    floorIndex++;
  }

  return floors;
};

// Lấy bàn của 1 tầng cụ thể (dùng trong Floor component)
export const getFloorTables = (tables, floorIndex) => {
  if (!tables?.length) return [];

  const sorted = [...tables].sort((a, b) => {
    const numA = parseInt(a.table_code.replace(/\D/g, ''));
    const numB = parseInt(b.table_code.replace(/\D/g, ''));
    return numA - numB;
  });

  const start = floorIndex * TABLES_PER_FLOOR;
  return sorted.slice(start, start + TABLES_PER_FLOOR);
};

// Bàn 4 ghế mặc định cho bàn mới thêm
export const DEFAULT_CHAIR_CONFIG = { chairTop: 2, chairBottom: 2 };

// Config ghế theo table_code — bàn không có config thì dùng default
export const CHAIR_CONFIG = {
  'B01': { chairTop: 1, chairBottom: 1 },
  'B02': { chairTop: 2, chairBottom: 2 },
  'B03': { chairTop: 2, chairBottom: 2 },
  'B04': { chairTop: 2, chairBottom: 2 },
  'B05': { chairTop: 1, chairBottom: 1 },
  'B06': { chairTop: 2, chairBottom: 2 },
  'B07': { chairTop: 1, chairBottom: 1 },
  'B08': { chairTop: 2, chairBottom: 2 },
  'B09': { chairTop: 1, chairBottom: 1 },
  'B10': { chairTop: 2, chairBottom: 2 },
  'B11': { type: 'Table_8' },
  'B12': { type: 'SquareTable', chairTop: 2, chairBottom: 2, chairLeft: 2, chairRight: 2 },
  'B13': { type: 'Table_8' },
  'B14': { type: 'SquareTable', chairTop: 5, chairBottom: 5, tableColor: '#C2863D', chairColor: '#F4CA66' },
  'B15': { type: 'Table_4' },
  'B16': { type: 'Table_4' },
  // Bàn mới thêm không có entry → dùng DEFAULT_CHAIR_CONFIG
};

export const getChairConfig = (tableCode) =>
  CHAIR_CONFIG[tableCode] || DEFAULT_CHAIR_CONFIG;
