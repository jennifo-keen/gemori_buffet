import GroupsIcon from "@mui/icons-material/Groups";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const dashboardCards = [
  {
    title: "TỔNG CỘNG",
    value: "1,284",
    borderColor: "primary.light",
    icon: GroupsIcon,
    iconColor: "primary.main",
  },
  {
    title: "ĐANG HOẠT ĐỘNG",
    value: "1,102",
    borderColor: "secondary.light",
    icon: VerifiedUserOutlinedIcon,
    iconColor: "secondary.main",
  },
  {
    title: "TÀI KHOẢN KHÓA",
    value: "18",
    borderColor: "warning.light",
    icon: PersonOffOutlinedIcon,
    iconColor: "warning.main",
  },
];

const StatCard = ({
  title,
  value,
  borderColor,
  icon: IconComponent,
  iconColor,
}) => {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 100,
        borderRadius: 3,
        borderColor,
        boxShadow: theme.shadows[1],
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack spacing={0.5}>
          <Typography
            component="h2"
            sx={{
              color: "text.secondary",
              fontFamily: '"Be Vietnam Pro", Helvetica, Arial, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: "16px",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "text.primary",
              fontFamily: '"Be Vietnam Pro", Helvetica, Arial, sans-serif',
              fontSize: 42,
              fontWeight: 900,
              lineHeight: "1",
              letterSpacing: 0,
            }}
          >
            {value}
          </Typography>
        </Stack>
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: 8,
            right: 10,
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconComponent sx={{ fontSize: 38, color: iconColor }} />
        </Box>
      </CardContent>
    </Card>
  );
};

const BentoDashboard = () => {
  return (
    <Box component="section" aria-label="Dashboard summary">
      <Grid container spacing={3}>
        {dashboardCards.map((card) => (
          <Grid key={card.title} item xs={12} sm={6} md={4}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BentoDashboard;