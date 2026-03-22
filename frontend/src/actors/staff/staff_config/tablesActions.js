export const handleTableAction = ({ table, navigate, showError }) => {
  if (!table) return;

  switch (table.status) {
    case 'ordering':
      navigate(`/staff/checkout?tableId=${table.id}&tableCode=${table.table_code}`);
      break;

    case 'empty':
      navigate(`/staff/order?tableId=${table.id}&tableCode=${table.table_code}`);
      break;

    case 'closed':
      showError({
        title: 'Bàn đang bảo trì',
        subtitle: `Bàn ${table.table_code} hiện không thể sử dụng. Vui lòng chọn bàn khác.`,
        confirmText: 'Đã hiểu',
      });
      break;

    default:
      break;
  }
};