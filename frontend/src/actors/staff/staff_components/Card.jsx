import React from "react";
import UsersFourIcon from "@mui/icons-material/Groups";
import HandsClappingIcon from "@mui/icons-material/WavingHand";
import { Box, Button, Stack, Typography } from "@mui/material";

export const Card = () => {
  return (
    <Box
      sx={{
        height: 164,
        bgcolor: "white",
        borderRadius: 3,
        border: 1,
        borderColor: "grey.300",
        p: 2.5,
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <UsersFourIcon sx={{ width: 24, height: 24, color: "#ef4444" }} />
          <Typography
            variant="body2"
            sx={{
              color: "grey.600",
              fontWeight: 700,
            }}
          >
            Heading
          </Typography>
        </Stack>

        <Stack spacing={0.5}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography
              variant="h6"
              sx={{
                color: "grey.900",
                fontWeight: 700,
              }}
            >
              Title
            </Typography>
            <Box
              sx={{
                width: 15,
                height: 15,
                bgcolor: "#22c55e",
                borderRadius: "50%",
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: "grey.400",
              fontWeight: 400,
            }}
          >
            Subtitle
          </Typography>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#22c55e",
            borderRadius: 3,
            py: 1.5,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#16a34a",
            },
          }}
          startIcon={<HandsClappingIcon sx={{ width: 20, height: 20 }} />}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "white",
            }}
          >
            Mở bàn
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Card;