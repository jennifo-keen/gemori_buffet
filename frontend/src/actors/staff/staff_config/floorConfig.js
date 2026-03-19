export const FLOORS = [
  { title: 'Tầng 1', path: '/staff',    range: ['B01', 'B10'] },
  { title: 'Tầng 2', path: '/staff/f2', range: ['B11', 'B16'] },
  { title: 'Tầng 3', path: '/staff/f3', range: ['B17', 'B24'] },
];

// ── Tầng 1 ──────────────────────────────────────────────────────
export const FLOOR1_ROW1 = [
  { code: 'B01', chairTop: 1, chairBottom: 1 },
  { code: 'B02', chairTop: 2, chairBottom: 2 },
  { code: 'B03', chairTop: 2, chairBottom: 2 },
  { code: 'B04', chairTop: 2, chairBottom: 2 },
  { code: 'B05', chairTop: 1, chairBottom: 1 },
];

export const FLOOR1_ROW2 = [
  { code: 'B06', chairTop: 2, chairBottom: 2 },
  { code: 'B07', chairTop: 1, chairBottom: 1 },
  { code: 'B08', chairTop: 2, chairBottom: 2 },
  { code: 'B09', chairTop: 1, chairBottom: 1 },
  { code: 'B10', chairTop: 2, chairBottom: 2 },
];

// ── Tầng 2 ──────────────────────────────────────────────────────
export const FLOOR2_ROW1 = [
  { code: 'B11', type: 'Table_8' },
  { code: 'B12', type: 'SquareTable', chairTop: 2, chairBottom: 2, chairLeft: 2, chairRight: 2 },
  { code: 'B13', type: 'Table_8' },
];

export const FLOOR2_ROW2 = [
  { code: 'B14', type: 'SquareTable', chairTop: 5, chairBottom: 5, tableColor: '#C2863D', chairColor: '#F4CA66' },
  { code: 'B15', type: 'Table_4' },
  { code: 'B16', type: 'Table_4' },
];