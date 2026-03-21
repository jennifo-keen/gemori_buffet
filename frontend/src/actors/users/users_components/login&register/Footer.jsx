import React from "react";
import { Stack, Typography } from "@mui/material";

const footerLinks = [
  { label: "Điều khoản sử dụng" },
  { label: "Chính sách bảo mật" },
];

export const Footer = () => {
  return (
    <Stack component="footer" alignItems="center" spacing={1} padding={3}>
      <Typography
        variant="bodyBody4Regular"
        sx={{ color: "slate.400", textAlign: "center", whiteSpace: "nowrap" }}
      >
        © 2026 Gemori Buffet. All rights reserved.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        {footerLinks.map((link) => (
          <Typography
            key={link.label}
            variant="bodyBody4Regular"
            sx={{
              color: "slate.400",
              textAlign: "center",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer;