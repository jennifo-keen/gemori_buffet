import { Box, Paper, Stack, Typography } from "@mui/material";

// Chart bar data: each entry has time label, forecast height, actual height
const chartData = [
  { time: "10:00", forecastH: 120, actualH: 114 },
  { time: "12:00", forecastH: 255, actualH: 264 },
  { time: "14:00", forecastH: 180, actualH: 174 },
  { time: "18:00", forecastH: 276, actualH: 270 },
  { time: "20:00", forecastH: 240, actualH: 246 },
  { time: "22:00", forecastH: 135, actualH: 126 },
];

const Y_AXIS_LABELS = [100, 80, 60, 40, 20, 0];
const BAR_MAX_HEIGHT = 300;

export const MainComparison = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: "background.paper",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(127, 29, 29, 0.05)",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 3,
          py: 3,
          width: "100%",
          borderBottom: "1px solid rgba(127, 29, 29, 0.05)",
          boxSizing: "border-box",
        }}
      >
        {/* Title block */}
        <Stack spacing={0}>
          <Typography
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "28px",
              color: "rgba(15, 23, 42, 1)",
              whiteSpace: "nowrap",
            }}
          >
            Báo cáo Dự báo vs Thực tế
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "16px",
              color: "rgba(100, 116, 139, 1)",
              whiteSpace: "nowrap",
            }}
          >
            Phân tích hiệu suất theo khung giờ - Hôm nay, 24 Tháng 10
          </Typography>
        </Stack>
        {/* Legend badges */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Thực tế badge */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              px: 1.5,
              py: 0.75,
              bgcolor: "rgba(127, 29, 29, 0.05)",
              borderRadius: "999px",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "rgba(127, 29, 29, 1)",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontWeight: 700,
                fontSize: "10px",
                lineHeight: "15px",
                color: "rgba(51, 65, 85, 1)",
                whiteSpace: "nowrap",
              }}
            >
              Thực tế
            </Typography>
          </Stack>
          {/* AI Dự báo badge */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              px: 1.5,
              py: 0.75,
              bgcolor: "rgba(241, 245, 249, 1)",
              borderRadius: "999px",
              border: "1px dashed rgba(148, 163, 184, 1)",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "rgba(148, 163, 184, 1)",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontWeight: 700,
                fontSize: "10px",
                lineHeight: "15px",
                color: "rgba(51, 65, 85, 1)",
                whiteSpace: "nowrap",
              }}
            >
              AI Dự báo
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Chart area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 450,
          background:
            "linear-gradient(90deg, rgba(138,0,0,0.05) 3%, rgba(138,0,0,0) 3%), linear-gradient(180deg, rgba(138,0,0,0.05) 3%, rgba(138,0,0,0) 3%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          pl: "32px",
          pr: "32px",
          py: "32px",
          boxSizing: "border-box",
        }}
      >
        {/* Y-axis labels */}
        <Stack
          justifyContent="space-between"
          sx={{
            position: "absolute",
            top: 32,
            left: 24,
            height: "calc(100% - 80px)",
          }}
        >
          {Y_AXIS_LABELS.map((label) => (
            <Typography
              key={label}
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontWeight: 700,
                fontSize: "10px",
                lineHeight: "15px",
                color: "rgba(148, 163, 184, 1)",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Typography>
          ))}
        </Stack>
        {/* SVG curve overlay */}
        <Box
          component="svg"
          sx={{
            position: "absolute",
            top: 32,
            left: 64,
            width: "calc(100% - 96px)",
            height: 290,
            overflow: "visible",
            pointerEvents: "none",
          }}
          viewBox="0 0 862 290"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 175 C 60 155, 100 80, 143 68 C 186 56, 220 60, 286 68 C 352 76, 380 120, 430 130 C 480 140, 500 20, 572 10 C 620 3, 650 60, 715 68 C 760 74, 800 130, 862 175"
            fill="none"
            stroke="rgba(252, 165, 165, 1)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </Box>
        {/* Bar groups */}
        {chartData.map((item) => (
          <Stack
            key={item.time}
            alignItems="center"
            sx={{ flex: 1, position: "relative" }}
          >
            {/* Bar pair container */}
            <Stack
              direction="row"
              alignItems="flex-end"
              spacing={0.25}
              sx={{
                width: 60,
                maxWidth: 60,
                height: BAR_MAX_HEIGHT,
              }}
            >
              {/* Forecast bar (dashed border, slate) */}
              <Box
                sx={{
                  width: "50%",
                  height: item.forecastH,
                  bgcolor: "rgba(226, 232, 240, 1)",
                  borderRadius: "2px 2px 0 0",
                  border: "1px dashed rgba(148, 163, 184, 1)",
                  borderBottom: "none",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
              />
              {/* Actual bar (solid dark red) */}
              <Box
                sx={{
                  width: "50%",
                  height: item.actualH,
                  bgcolor: "rgba(127, 29, 29, 1)",
                  borderRadius: "2px 2px 0 0",
                  flexShrink: 0,
                }}
              />
            </Stack>
            {/* Time label */}
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "16.5px",
                color: "rgba(100, 116, 139, 1)",
                whiteSpace: "nowrap",
                pt: 2,
              }}
            >
              {item.time}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Paper>
  );
};

export default MainComparison;