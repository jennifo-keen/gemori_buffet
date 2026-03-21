import React from "react";
import { Button, InputBase, Stack, Typography } from "@mui/material";
import { useState } from "react";

export const HeaderSection = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {/* Left: Title and subtitle */}
      <Stack spacing={0}>
        <Typography
          variant="h5"
          sx={{ color: "slate.900", lineHeight: "32px" }}
        >
          Lịch sử ăn uống
        </Typography>
        <Typography
          variant="labelLabel1Regular"
          sx={{ color: "secondary.main" }}
        >
          Xem lại các hóa đơn và trải nghiệm ẩm thực của bạn tại hệ thống Gemori
        </Typography>
      </Stack>

      {/* Right: Search bar */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          width: 300,
          bgcolor: "primary.light",
          borderRadius: "999px",
          pl: 3,
          pr: 0.5,
          py: 0.5,
        }}
      >
        <InputBase
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm kiếm voucher ..."
          sx={{
            flex: 1,
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
            px: 2,
            py: 1,
            minWidth: "unset",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "22px",
            color: "#ffffff",
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