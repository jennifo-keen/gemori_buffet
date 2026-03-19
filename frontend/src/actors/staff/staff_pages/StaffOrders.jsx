import React from 'react';
import { useState } from 'react';
import ArrowBackIcon from "../../../assets/icon/ArrowFatLeft.svg";
import ArrowRightIcon from "../../../assets/icon/ArrowFatRight.svg"; 
import Package from '../staff_components/Package.jsx';
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "../../../assets/icon/UsersThree.svg";
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
} from "@mui/material";

const summaryItems = [
  { label: "Gói chọn", value: "Combo 299K" },
  { label: "Khách", value: "02 người" },
];

const StaffOrders = () => {
    const [count, setCount] = useState(2);

    const handleDecrement = () => setCount((prev) => Math.max(0, prev - 1));
    const handleIncrement = () => setCount((prev) => prev + 1);
  return (
  <Box
    sx={{
      p: "32px",
      gap :"22px",
    }}
  >
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
        <IconButton size="medium" sx={{ color: "#b14135" }}>
          <Box
           src= {ArrowBackIcon}
           component= "img"
          />
        </IconButton>

        <Box display="flex" alignItems="center" gap={2} flex={1}>
          <Chip
            label="Bàn 08"
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

    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="center"
      spacing={1}
    >
      <Package></Package>
      <Package></Package>
      <Package></Package>
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
          499.000 VNĐ
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
        {summaryItems.map((item) => (
          <Stack key={item.label} alignItems="center">
            <Typography
              variant="caption"
              sx={{ color: "white", opacity: 0.7, whiteSpace: "nowrap" }}
            >
              {item.label}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "white", whiteSpace: "nowrap" }}
            >
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>

        <MuiButton
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
        Xác nhận &amp; Bắt đầu
      </Typography>
    </MuiButton>

      </Stack>


    </Box>
  </Box>
  );
};

export default StaffOrders;