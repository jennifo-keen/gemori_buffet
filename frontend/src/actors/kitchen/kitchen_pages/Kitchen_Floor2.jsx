import React from 'react';
import Floor2 from '../../staff/staff_pages/Floor2';
import { useNavigate } from 'react-router-dom';

const KitchenFloor2 = () => {
  const navigate = useNavigate();

  const handleTableClick = (table) => {
    if (!table) return;
    if (table.status === 'ordering') {
      navigate(`/kitchen/${table.table_code}/ord_table`);
    }
  };

  return <Floor2 onTableClick={handleTableClick} basePath="/kitchen" />;
};

export default KitchenFloor2;