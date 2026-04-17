import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from '../kitchen_components/MenuKitchen.jsx';

import Header from '../../staff/staff_components/HeaderStaff.jsx';
 
const KitchenLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh' 
      }}
    >

      <Header /> 
      <Box 
        sx={{ 
          display: 'flex', 
          flex: 1, 
          overflow: 'hidden' 
        }}
      >
        
        <Sidebar />

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

export default KitchenLayout;