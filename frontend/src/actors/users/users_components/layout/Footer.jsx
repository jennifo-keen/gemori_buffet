import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import logo from "../../../../assets/img/Logo 1.png";

const infoLinks = [
  "Về chúng tôi",
  "Thực đơn chi tiết",
  "Chính sách bảo mật",
  "Tuyển dụng",
];

const branches = [
  {
    name: "Gemori Landmark:",
    address: "Tầng 5, Landmark 81, TP.HCM",
  },
];

const contactItems = [
  {
    icon: <PhoneIcon sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }} />,
    text: "1900 6789",
  },
  {
    icon: (
      <EmailOutlinedIcon
        sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }}
      />
    ),
    text: "contact@gemori.com.vn",
  },
  {
    icon: (
      <AccessTimeIcon
        sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }}
      />
    ),
    text: "10:00 - 22:00 Hàng ngày",
  },
];

const bottomLinks = ["Điều khoản sử dụng", "Chính sách đặt bàn"];

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f6f6",
        borderTop: "1px solid #b141351a",
        px: { xs: 2, sm: 3, md: 5, lg: 9 },
        py: { xs: 4, sm: 5, md: 6, lg: 8 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Main content */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1.2fr 1fr 1fr 1fr",
              },
              gap: { xs: 4, sm: 4, md: 5, lg: 6 },
              alignItems: "flex-start",
            }}
          >
            {/* Column 1 */}
            <Stack spacing={2.5}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: { xs: 110, sm: 120, md: 130 },
                  height: "auto",
                  objectFit: "contain",
                  filter:
                    "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  maxWidth: { xs: "100%", md: 260 },
                }}
              >
                Chuỗi nhà hàng buffet nướng và lẩu hàng đầu, mang đến trải nghiệm
                ẩm thực đẳng cấp trong không gian hiện đại.
              </Typography>
            </Stack>

            {/* Column 2 */}
            <Stack spacing={2.5}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#b14135", fontWeight: 700 }}
              >
                Thông tin
              </Typography>

              <Stack spacing={1.5}>
                {infoLinks.map((link) => (
                  <Link
                    key={link}
                    underline="hover"
                    sx={{
                      color: "text.secondary",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      width: "fit-content",
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Stack>

            {/* Column 3 */}
            <Stack spacing={2.5}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#b14135", fontWeight: 700 }}
              >
                Chi nhánh
              </Typography>

              <Stack spacing={1.5}>
                {branches.map((branch) => (
                  <Typography
                    key={branch.name}
                    variant="body2"
                    sx={{
                      lineHeight: 1.8,
                      color: "text.secondary",
                      wordBreak: "break-word",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 600, mr: 0.5 }}
                    >
                      {branch.name}
                    </Box>
                    {branch.address}
                  </Typography>
                ))}
              </Stack>
            </Stack>

            {/* Column 4 */}
            <Stack spacing={2.5}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#b14135", fontWeight: 700 }}
              >
                Liên hệ
              </Typography>

              <Stack spacing={1.5}>
                {contactItems.map((item) => (
                  <Stack
                    key={item.text}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                  >
                    {item.icon}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Bottom bar */}
          <Box>
            <Divider sx={{ borderColor: "grey.200", mb: { xs: 2, md: 3 } }} />

            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, md: 3 }}
            >
              <Typography variant="caption" color="text.secondary">
                © 2026 Gemori Restaurant Group. All rights reserved.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 3 }}
                flexWrap="wrap"
              >
                {bottomLinks.map((link) => (
                  <Link
                    key={link}
                    underline="hover"
                    sx={{
                      color: "text.secondary",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      width: "fit-content",
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;