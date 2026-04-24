import { Box, Stack } from "@mui/material";
import { BestSellingAndActivitySection } from "./BestSellingAndActivitySection";
import { HourlyRevenueChartSection } from "./HourlyRevenueChartSection";
import { ThemeProvider } from "./ThemeProvider";

const ContentAdminBottomContent = () => {
  return (
    <Box component="main">
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={4}
        alignItems="stretch"
        justifyContent="flex-start"
        useFlexGap
      >
        <Box
          component="section"
          sx={{ width: { xs: "100%", lg: "71%" }, flexShrink: 0, minWidth: 0 }}
        >
          <HourlyRevenueChartSection />
        </Box>
        <Box
          component="aside"
          sx={{
            width: { xs: "100%", lg: "26%" },
            flexShrink: 0,
            minWidth: 0,
            alignSelf: { xs: "stretch", lg: "flex-start" },
          }}
        >
          <BestSellingAndActivitySection />
        </Box>
      </Stack>
    </Box>
  );
};

const ContentAdminBottom = () => {
  return (
    <ThemeProvider>
      <ContentAdminBottomContent />
    </ThemeProvider>
  );
};

export default ContentAdminBottom;
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import image from "./image.png";
import image2 from "./image-2.png";
import image3 from "./image-3.png";

const bestSellingItems = [
  {
    name: "Bò Mỹ Thượng Hạng",
    orders: "142 lượt gọi",
    rank: "#1",
    image,
  },
  {
    name: "Sủi cảo",
    orders: "98 lượt gọi",
    rank: "#2",
    image: image2,
  },
  {
    name: "Hải sản",
    orders: "85 lượt gọi",
    rank: "#3",
    image: image3,
  },
];

const recentActivities = [
  {
    title: "Bàn 04 đã thanh toán",
    time: "2 phút trước",
    active: true,
    bold: true,
  },
  {
    title: "Đơn hàng mới",
    time: "10 phút trước",
    active: false,
    bold: false,
  },
  {
    title: "Cập nhật Menu",
    time: "1 giờ trước",
    active: false,
    bold: false,
  },
];

export const BestSellingAndActivitySection = () => {
  return (
    <Stack
      component="section"
      spacing={4}
      sx={{
        width: "100%",
        maxWidth: 288,
      }}
    >
      <Card
        elevation={1}
        sx={{
          width: "100%",
        }}
      >
        <CardContent sx={{ p: 6, "&:last-child": { pb: 6 } }}>
          <Stack spacing={6}>
            <Typography
              variant="bodyBody1Bold"
              component="h2"
              color="text.primary"
            >
              Món ăn bán chạy nhất
            </Typography>
            <Stack spacing={6}>
              {bestSellingItems.map((item) => (
                <Stack
                  key={item.rank}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="label2SemiBold"
                      component="h3"
                      color="text.primary"
                      noWrap
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="label3Regular" color="neutral.400">
                      {item.orders}
                    </Typography>
                  </Box>
                  <Typography
                    variant="label2Bold"
                    color="primary.dark"
                    sx={{ flexShrink: 0, textAlign: "right" }}
                  >
                    {item.rank}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card
        elevation={1}
        sx={{
          width: "100%",
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Stack>
            <Box sx={{ p: 6 }}>
              <Typography
                variant="bodyBody1Bold"
                component="h2"
                color="text.primary"
              >
                Hoạt động gần đây
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 6, pt: 6 }}>
              <Stack
                spacing={6}
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    left: 11,
                    top: 8,
                    bottom: 8,
                    width: 2,
                    bgcolor: "brand.400",
                  }}
                />
                {recentActivities.map((activity, index) => (
                  <Stack
                    key={`${activity.title}-${index}`}
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    sx={{ position: "relative", zIndex: 1 }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: activity.active
                          ? "primary.main"
                          : "grey.200",
                        bgcolor: "common.white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: activity.active
                            ? "primary.main"
                            : "grey.200",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant={
                          activity.bold ? "label2Bold" : "label2SemiBold"
                        }
                        component="h3"
                        color="text.primary"
                      >
                        {activity.title}
                      </Typography>
                      <Typography
                        variant="label3Regular"
                        color="text.secondary"
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default BestSellingAndActivitySection;
import {
  Box,
  Button,
  Card,
  Chip,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const timeLabels = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const columns = ["MÃ ĐƠN", "KHÁCH HÀNG", "SỐ BÀN", "TỔNG TIỀN", "TRẠNG THÁI"];

const orders = [
  {
    code: "#MW- 8821",
    customer: "Nguyễn Hữu An",
    table: "Bàn 04",
    total: "1,250,000đ",
    status: "ĐÃ THANH TOÁN",
    statusType: "paid",
  },
  {
    code: "#MW- 8822",
    customer: "Lê Thị Hương Giang",
    table: "Bàn 05",
    total: "550,000đ",
    status: "ĐANG PHỤC VỤ",
    statusType: "serving",
  },
  {
    code: "#MW- 8822",
    customer: "Lê Thị Hương Giang",
    table: "Bàn 05",
    total: "550,000đ",
    status: "ĐANG PHỤC VỤ",
    statusType: "serving",
  },
  {
    code: "#MW- 8822",
    customer: "Lê Thị Hương Giang",
    table: "Bàn 05",
    total: "550,000đ",
    status: "ĐANG PHỤC VỤ",
    statusType: "serving",
  },
  {
    code: "#MW- 8823",
    customer: "Trần Như Ngọc",
    table: "Bàn 01",
    total: "1,250,000đ",
    status: "ĐÃ THANH TOÁN",
    statusType: "paid",
  },
];

export const HourlyRevenueChartSection = () => {
  return (
    <Stack spacing={4} sx={{ width: "100%" }}>
      <Card
        component="section"
        sx={{
          p: 6,
          borderColor: "brand.300",
          boxShadow: 1,
        }}
      >
        <Stack spacing={8}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={0}>
              <Typography variant="bodyBody1Bold" color="text.primary">
                Thống kê doanh thu theo giờ
              </Typography>
              <Typography variant="label2Regular" color="text.secondary">
                Hoạt động thời gian thực của nhà hàng
              </Typography>
            </Stack>
            <Select
              value="Hôm nay"
              size="small"
              variant="outlined"
              displayEmpty
              sx={{
                minWidth: 96,
                height: 32,
                bgcolor: "secondary.main",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "brand.400",
                },
                "& .MuiSelect-select": {
                  py: 0.5,
                  px: 2,
                  pr: 4,
                  ...(theme) => theme.typography.label2Regular,
                  color: "text.primary",
                },
              }}
            >
              <MenuItem value="Hôm nay">Hôm nay</MenuItem>
            </Select>
          </Stack>
          <Box sx={{ position: "relative", height: 256, px: 2 }}>
            <Stack
              justifyContent="space-between"
              sx={{
                position: "absolute",
                inset: 0,
                pt: 2,
                pb: "40px",
              }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    borderTop: 1,
                    borderColor: "chart.grid",
                    width: "100%",
                  }}
                />
              ))}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{
                position: "absolute",
                left: 8,
                right: 8,
                bottom: 0,
                pt: 2,
                borderTop: "1px solid transparent",
              }}
            >
              {timeLabels.map((time) => (
                <Box
                  key={time}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily:
                        '"Epilogue-Regular", Helvetica, Arial, sans-serif',
                      fontSize: 10,
                      lineHeight: "15px",
                      color: "neutral.500",
                    }}
                  >
                    {time}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Card>
      <Card
        component="section"
        sx={{
          overflow: "hidden",
          borderColor: "brand.300",
          boxShadow: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 6,
            borderBottom: 1,
            borderColor: "brand.400",
          }}
        >
          <Typography variant="bodyBody1Bold" color="text.primary">
            Đơn hàng mới nhất
          </Typography>
          <Button
            variant="text"
            sx={{
              minWidth: "auto",
              minHeight: "auto",
              p: 0,
              color: "error.main",
              ...(theme) => theme.typography.label2Bold,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Xem tất cả
          </Button>
        </Stack>
        <TableContainer
          sx={{
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <Table sx={{ tableLayout: "fixed", minWidth: 700 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} align="center">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={`${order.code}-${index}`}
                  sx={{
                    height: 64,
                    "& td": {
                      backgroundColor: "neutral.50",
                    },
                  }}
                >
                  <TableCell align="center">{order.code}</TableCell>
                  <TableCell align="left">{order.customer}</TableCell>
                  <TableCell align="center">{order.table}</TableCell>
                  <TableCell align="center">{order.total}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={order.status}
                      sx={{
                        bgcolor:
                          order.statusType === "paid"
                            ? "status.paidBg"
                            : "status.servingBg",
                        color:
                          order.statusType === "paid"
                            ? "status.paidText"
                            : "status.servingText",
                        "& .MuiChip-label": {
                          px: 2,
                          fontFamily:
                            '"Epilogue-Bold", Helvetica, Arial, sans-serif',
                          fontSize: 10,
                          lineHeight: "20px",
                          fontWeight: 700,
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
};
