import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarStaff from '../staff_components/MenuStaff.jsx';
import HeaderStaff from '../staff_components/HeaderStaff.jsx';
import { Box } from '@mui/material'; 

const StaffLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh' 
      }}
    >

      <HeaderStaff /> 
      <Box 
        sx={{ 
          display: 'flex', 
          flex: 1, 
          overflow: 'hidden' 
        }}
      >
        
        <SidebarStaff />

        <Box 
          component="main" 
          sx={{ 
            flex: 1,                 
            overflowY: 'auto',    
            bgcolor: '#f5f5f5'   
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
};

export default StaffLayout;