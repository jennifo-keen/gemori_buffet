import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const MonthPicker = ({ selectedMonth, onChange }) => {
    return (
        <FormControl size="small">
            <Select
                value={selectedMonth}
                onChange={(e) => onChange(e.target.value)}
                sx={{
                    borderRadius: '10px',
                    bgcolor: '#FCECEC',
                    color: '#6C0D0A',
                    fontWeight: 600,
                    minWidth: '120px',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }}
            >
                {[...Array(12)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                        Tháng {i + 1}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MonthPicker;