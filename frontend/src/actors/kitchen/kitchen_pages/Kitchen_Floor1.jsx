import React from 'react';
import Floor1 from '../../staff/staff_pages/Floor1';
import { useNavigate } from 'react-router-dom';

const KitchenFloor1 = () => {
  const navigate = useNavigate();

  const handleTableClick = (table) => {
    if (!table) return;
    if (table.status === 'ordering') {
      navigate(`/kitchen/${table.table_code}/ord_table`);
    }
  };

  return <Floor1 onTableClick={handleTableClick} />;
};

export default KitchenFloor1;