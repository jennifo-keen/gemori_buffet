import React, { useState } from "react";
import { Button, InputBase, Stack, Typography } from "@mui/material";

export const HeaderSection = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "stretch", md: "center" }}
      justifyContent="space-between"
      spacing={{ xs: 2, md: 3 }}
      width="100%"
    >
      <Stack spacing={0.5} sx={{ minWidth: 0 }}>
        <Typography
          variant="h5"
          sx={{
            color: "slate.900",
            lineHeight: { xs: "30px", md: "32px" },
            fontSize: { xs: "24px", md: "30px" },
            wordBreak: "break-word",
          }}
        >
          Lịch sử ăn uống
        </Typography>

        <Typography
          sx={{
            color: "secondary.main",
            fontSize: { xs: "14px", md: "15px" },
            lineHeight: "22px",
            wordBreak: "break-word",
          }}
        >
          Xem lại các hóa đơn và trải nghiệm ẩm thực của bạn tại hệ thống Gemori
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          width: { xs: "100%", md: 300 },
          maxWidth: "100%",
          bgcolor: "primary.light",
          borderRadius: "999px",
          pl: { xs: 2, sm: 3 },
          pr: 0.5,
          py: 0.5,
          boxSizing: "border-box",
        }}
      >
        <InputBase
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm kiếm hóa đơn..."
          sx={{
            flex: 1,
            minWidth: 0,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            color: "slate.500",
            "& input::placeholder": {
              color: "#64748b",
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "primary.main",
            borderRadius: "999px",
            px: { xs: 1.75, sm: 2 },
            py: 1,
            minWidth: "unset",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "22px",
            color: "#ffffff",
            flexShrink: 0,
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Tìm
        </Button>
      </Stack>
    </Stack>
  );
};

export default HeaderSection;