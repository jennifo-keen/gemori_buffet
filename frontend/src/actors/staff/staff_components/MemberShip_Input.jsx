import React, { useState } from "react";

import PersonAdd from "../../../assets/icon/UserCirclePlus.svg?react";
import { getCustomerByPhone } from '../../../api/paymentApi';
import MemberShipPopUp_In from '../staff_components/MemberShipPopUp_In';
import MemberShip_Inf from '../staff_components/MemberShip_Inf'

import Favorite from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
  Dialog,
} from "@mui/material";


const MemberShip_Input = ({ onCustomerFound }) => {
  const [phone, setPhone] = useState('');
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openPopup, setOpenPopup] = useState(false); 

  const handleCheck = async () => {
    if (!phone.trim()) return;
    try {
      setLoading(true);
      setError('');
      const { getCustomerByPhone } = await import('../../../api/paymentApi');
      const res = await getCustomerByPhone(phone);
      setCustomer(res.data);
      onCustomerFound?.(res.data);
    } catch (err) {
      setError('Không tìm thấy hội viên');
      setCustomer(null);
      onCustomerFound?.(null);
    } finally {
      setLoading(false);
    }
  };

  // Sau khi thêm hội viên thành công
  const handleNewCustomer = (newCustomer) => {
    setCustomer(newCustomer);
    onCustomerFound?.(newCustomer);
    setPhone(newCustomer.phone);
  };

  // Reset về form tìm kiếm
 const handleReset = () => {
    setCustomer(null);
    setPhone('');
    setError('');
    onCustomerFound?.(null);
  };

  //  Nếu đã có customer → hiện MemberShip_Inf
  if (customer) {
    return <MemberShip_Inf customer={customer} onReset={handleReset} />;
  }

  return (
    <Box>
      <Stack
        spacing={1.5}
        sx={{
          px: 1.25,
          py: 2.5,
          border: "1px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "384px",
            p: "24px",
            gap: "16px",
            border: "1px solid rgba(177, 65, 53, 0.05)",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            borderRadius: "12px",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Favorite sx={{ width: 20, height: 20, color: "#B4463C" }} />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#0F172A",
                }}
              >
                Khách hàng thân thiết
              </Typography>
            </Stack>

            <Stack spacing={2} alignItems="flex-start">
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#64748B",
                }}
              >
                Kiểm tra thông tin hội viên bằng số điện thoại
              </Typography>

              <Stack direction="row" spacing={1}>
                <TextField
                  placeholder="Nhập số điện thoại..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                      backgroundColor: "#F5F5F5",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "rgba(177, 65, 53, 0.2)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                      color: "#6B7280",
                      padding: "16px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleCheck}
                  disabled={loading}
                  sx={{
                    backgroundColor: "#B4463C",
                    color: "white",
                    fontSize: 14,
                    textTransform: "none",
                    px: 2,
                    py: 1.5,
                    borderRadius: "8px",
                    border: "1px solid rgba(177, 65, 53, 0.2)",
                    whiteSpace: "nowrap",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "#9A3A32",
                    },
                  }}
                >
                  {loading ? '...' : 'Kiểm tra'}
                </Button>
              </Stack>

            {/* Hiện thông tin khách nếu tìm thấy */}
              {customer && (
                <Stack direction="row" spacing={1} alignItems="center"
                  sx={{ p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, width: "100%" }}
                >
                  <Chip label="✓" size="small" sx={{ bgcolor: "#22c55e", color: "white" }} />
                  <Stack>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>
                      {customer.full_name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                      {customer.phone}
                    </Typography>
                  </Stack>
                </Stack>
              )}

              {/* Hiện lỗi */}
              {error && (
                <Typography sx={{ fontSize: 13, color: "#b4463c" }}>{error}</Typography>
              )}
            </Stack>

            <Button
              variant="outlined"
              onClick={() => setOpenPopup(true)}
              startIcon={
                <Box
                  component="img"
                  src={PersonAdd}
                  sx={{ 
                      width: 20, 
                      height: 20 
                    }} 
                  />
                }
              sx={{
                height: 50,
                border: "2px dashed #B4463C",
                borderRadius: "12px",
                color: "#B4463C",
                fontSize: 14,
                fontWeight: 700,
                textTransform: "none",
                backgroundColor: "white",
                "&:hover": {
                  border: "2px dashed #B4463C",
                  backgroundColor: "rgba(180, 70, 60, 0.04)",
                },
              }}
            >
              Thêm hội viên mới
            </Button>
          </Stack>
        </Paper>
      </Stack>

       {/*  Popup thêm hội viên */}
      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        PaperProps={{ sx: { borderRadius: 3, boxShadow: 'none', bgcolor: 'transparent' } }}
      >
        <MemberShipPopUp_In
          onSuccess={handleNewCustomer}
          onClose={() => setOpenPopup(false)}
        />
      </Dialog>
    </Box>
  );
};

export default MemberShip_Input;