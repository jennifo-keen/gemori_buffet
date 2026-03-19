import React, { useState } from 'react'; // Gộp import
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import MemberShipInput from "../staff_components/MemberShip_Input"
import Ticket from "../staff_components/Ticket";
import PaymentMethod from "../staff_components/PaymentMethod"
import { Box, Stack, Typography, TextField, Button, Grid } from "@mui/material";


const summaryRows = [
  { label: "Tạm tính (Subtotal)", value: "10.000.000 VNĐ" },
  { label: "Thuế VAT (8%)", value: "2.000.000 VNĐ" },
  { label: "Giảm giá", value: "0VNĐ" },
];

// 2. Tách riêng hoặc xóa bọc CalculationArea nếu không cần thiết
const StaffMenu = () => {
  const [discountCode, setDiscountCode] = useState(""); // Đưa state vào đúng component

  return (
    <Box sx={{ p: "32px", gap: "22px" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 'auto' }} sx={{ width: { md: '628px' } }}>
          <Box>
            <Stack
              spacing={0.5}
              sx={{
                borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
                pb: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h4"
                fontWeight={600}
                sx={{ color: "#1a1f36", whiteSpace: "nowrap" }}
              >
                Thanh toán hóa đơn
              </Typography>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <ArrowDropDown sx={{ color: "#e26255", width: 16, height: 16 }} />
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ color: "#e26255", whiteSpace: "nowrap" }}
                >
                  Bàn 12 - Tầng 1
                </Typography>
              </Stack>
            </Stack>

            <Box
              component="header"
              sx={{
                borderBottom: "1px solid #b141350d",
                mt: 2,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  backgroundColor: "#b4463c",
                  borderBottom: "1px solid #b141350d",
                  borderRadius: '18px 18px 0 0', // Bo góc trên bạn yêu cầu ở đây
                  p: 2,
                }}
              >
                <ShoppingCartOutlined sx={{ color: "white", width: 20, height: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: 500, lineHeight: 1 }}
                >
                  Chi tiết đơn hàng
                </Typography>
              </Stack>
              <Ticket />
              <Ticket />
            </Box>

            <Stack
              spacing={1}
              component="section"
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderTop: "1px solid rgba(177, 65, 53, 0.1)",
              }}
            >
              {summaryRows.map((row) => (
                <Stack
                  key={row.label}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.primary">
                    {row.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {row.value}
                  </Typography>
                </Stack>
              ))}

              <Box sx={{ py: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Mã giảm giá (Discount Code)
                </Typography>
                <Stack direction="row" spacing={1} alignItems="stretch"
                sx={{
                  justifyContent:"space-between",
                }}>
                  <TextField
                    placeholder="Nhập mã ưu đãi..."
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    size="small"
                    sx={{
                      width: "425px",
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(177, 65, 53, 0.2)" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#b4463c",
                      borderRadius: 2,
                      px: 3,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#9a3a31" },
                    }}
                  >
                    Áp dụng
                  </Button>
                </Stack>
              </Box>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  borderTop: "1px solid rgba(177, 65, 53, 0.1)",
                  pt: 2,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ color: "#e26255" }}>
                  Tổng cộng
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#e26255" }}>
                  12.000.000 VNĐ
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}> {/* Chỉnh lại cột phải to hơn chút cho cân đối */}
          <Box sx={{ p: 2, borderRadius: 2 }}>
            <MemberShipInput></MemberShipInput>
            <PaymentMethod></PaymentMethod>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffMenu;