import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Package from '../staff_components/Package.jsx';

import ArrowBackIcon from "../../../assets/icon/ArrowFatLeft.svg";
import ArrowRightIcon from "../../../assets/icon/ArrowFatRight.svg"; 
import PeopleAltIcon from "../../../assets/icon/UsersThree.svg";

import { getBuffetTickets } from '../../../api/menuApi';
import { createOrder } from '../../../api/orderApi';

import useAuthStaff from '../staff_hook/useAuthStaff.js';
import useDialog from '../staff_hook/useDialog.js';

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button as MuiButton,
  Divider,
  Box,
  Stack,
  Chip,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const StaffOrders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateTableStatus } = useAuthStaff();
  const { showError, showSuccess } = useDialog();

  const tableId   = searchParams.get('tableId');
  const tableCode = searchParams.get('tableCode');

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [count, setCount] = useState(2);

  // Lấy danh sách gói buffet
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getBuffetTickets();
        setTickets(res.data);
      } catch (err) {
        showError({ title: 'Lỗi', subtitle: 'Không thể tải danh sách gói buffet' });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

    const handleDecrement = () => setCount((prev) => Math.max(0, prev - 1));
    const handleIncrement = () => setCount((prev) => prev + 1);

   // Tính tổng tiền
  const totalAmount = selectedTicket
    ? selectedTicket.price * count
    : 0;

  // Xác nhận tạo order
  const handleConfirm = async () => {
    if (!selectedTicket) {
      showError({ title: 'Chưa chọn gói', subtitle: 'Vui lòng chọn gói buffet trước khi tiếp tục' });
      return;
    }
    if (count < 1) {
      showError({ title: 'Số lượng không hợp lệ', subtitle: 'Vui lòng nhập số khách hợp lệ' });
      return;
    }

    try {
      setSubmitting(true);
      const res = await createOrder({
        tableId,
        buffetTicketId: selectedTicket.id,
        ticketQuantity: count,
      });

      // Cập nhật context không cần fetch lại
      updateTableStatus(tableId, 'ordering');

      showSuccess({
        title: 'Tạo order thành công!',
        subtitle: `${tableCode} — ${selectedTicket.name} × ${count} người`,
        confirmText: 'Xem đơn hàng',
        onConfirm: () => navigate(`/staff/checkout?tableId=${tableId}&tableCode=${tableCode}`),
      });
    } catch (err) {
      showError({
        title: 'Tạo order thất bại',
        subtitle: err.response?.data?.message || 'Có lỗi xảy ra',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "#b4463c" }} />
    </Box>
  );

  return (
  <Box sx={{ p: "32px",  gap :"22px" }} >
    <Stack
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <Toolbar sx={{p: "16px 32px" }}>
        <IconButton 
          onClick={() => navigate(-1)}
          size="medium" 
          sx={{ color: "#b14135" }}>
            <Box
            src= {ArrowBackIcon}
            component= "img"
            />
        </IconButton>

        <Box display="flex" alignItems="center" gap={2} flex={1}>
          <Chip
             label={tableCode}
            size="small"
            sx={{
              backgroundColor: "rgba(177, 65, 53, 0.1)",
              color: "#b14135",
              fontWeight: "bold",
              fontSize: "0.875rem",
              borderRadius: "999px",
              height: 28,
            }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            sx={{ lineHeight: 1.4 }}
          >
            Chọn gói Buffet
          </Typography>
        </Box>
      </Toolbar>
    </Stack>

{/* List buffer ticket */}
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="center"
      spacing={1}
    >
      {tickets.map(ticket => (
          <Package
            key={ticket.id}
            ticket={ticket}
            isSelected={selectedTicket?.id === ticket.id}
            onSelect={() => setSelectedTicket(ticket)}
          />
        ))}
    </Stack>

      <Paper
      elevation={0}
      sx={{
        maxWidth: "930px",
        width: "100%",
        borderRadius: 4,
        border: '1px solid rgba(177, 65, 53, 0.1)',
        p: 4,
        mx: "auto",
        my: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Box
        src= {PeopleAltIcon}
        component="img"
        sx={{ 
          width: 24, 
          height: 24, 
          color: "slate" 
          }} 
        />
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Số lượng khách tại bàn
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2} flex={1}>
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(177, 65, 53, 0.1)",
              borderRadius: 3,
              flexShrink: 0,
            }}
          >
            <PersonIcon sx={{ width: 24, height: 24, color: "#b14135" }} />
          </Box>

          <Stack spacing={0}>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              noWrap
            >
              Người lớn (từ 1m2)
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Miễn phí cho trẻ dưới 1m2
            </Typography>
          </Stack>
        </Stack>

        {/* Right: quantity stepper */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            bgcolor: "rgba(177, 65, 53, 0.1)",
            borderRadius: 3,
            px: 2,
            py: 1,
          }}
        >
          <IconButton
            onClick={handleDecrement}
            size="small"
            sx={{
              width: 32,
              height: 32,
              bgcolor: "white",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <RemoveIcon sx={{ fontSize: 12 }} />
          </IconButton>

          <Box sx={{ width: 32, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {count}
            </Typography>
          </Box>

          <IconButton
            onClick={handleIncrement}
            size="small"
            sx={{
              width: 32,
              height: 32,
              bgcolor: "white",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <AddIcon sx={{ fontSize: 12 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
         
    <Box
      sx={{
        width: "930px",
        height: "135px",
        position: "relative",
        borderRadius: "24px",
        backgroundColor: "#B4463C",
        boxShadow: "0px 25px 50px -12px rgba(177,65,53,0.4)",
        mx: "auto",
      }}
    >
      <Stack
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{
          height: "100%",
          mx:"20px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={4}>
      {/* Price section */}
      <Stack spacing={0}>
        <Typography
          variant="body2"
          sx={{ color: "white", opacity: 0.8, whiteSpace: "nowrap" }}
        >
          Tổng cộng tạm tính
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "white", whiteSpace: "nowrap" }}
        >
          {totalAmount > 0
                  ? `${totalAmount.toLocaleString('vi-VN')} VNĐ`
                  : '---'}
        </Typography>
      </Stack>

      {/* Vertical divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "rgba(255,255,255,0.2)",
          height: 48,
          alignSelf: "center",
        }}
      />

      {/* Package and guest info */}
      <Stack direction="row" spacing={2}>
          <Stack  alignItems="center">
            <Typography
              variant="caption"
              sx={{ color: "white", opacity: 0.7, whiteSpace: "nowrap" }}
            >
              {selectedTicket?.name || '---'}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "white", whiteSpace: "nowrap" }}
            >
               {count} người
            </Typography>
          </Stack>
      </Stack>
    </Stack>

        <MuiButton
          onClick={handleConfirm}
          disabled={submitting || !selectedTicket}
          variant="contained"
          endIcon={
                    <Box
                    src={ArrowRightIcon}
                    component="img"
                    sx={{ color: "#b4463c", width: 24, height: 24 }} />
                  }
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            px: "15px",
            py: "20px",
            gap: "12px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "white",
              boxShadow: "none",
            },
          }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#b4463c",
          fontSize: "1.25rem",
          textTransform: "none",
          whiteSpace: "nowrap",
        }}
      >
        {submitting ? 'Đang xử lý...' : 'Xác nhận & Bắt đầu'}
      </Typography>
    </MuiButton>

      </Stack>


    </Box>
  </Box>
  );
};

export default StaffOrders;