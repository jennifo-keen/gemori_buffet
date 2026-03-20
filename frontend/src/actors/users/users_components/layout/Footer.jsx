import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import logo from "../../../../assets/img/Logo 1.png"
import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";

const infoLinks = [
  "Về chúng tôi",
  "Thực đơn chi tiết",
  "Chính sách bảo mật",
  "Tuyển dụng",
];

const branches = [
  {
    name: "Gemori Landmark:",
    address: " Tầng 5,\nLandmark 81, TP.HCM",
  },
];

const contactItems = [
  {
    icon: <PhoneIcon sx={{ fontSize: 14, color: "text.secondary" }} />,
    text: "1900 6789",
  },
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />,
    text: "contact@gemori.com.vn",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />,
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 9,
        py: 9,
      }}
    >
      <Stack spacing={8} sx={{ width: "100%", maxWidth: "xl" }}>
        {/* Main columns */}
        <Stack direction="row" spacing={6} alignItems="flex-start">
          {/* Column 1: Logo + Description */}
          <Stack spacing={3} flex={1}>
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    width: 130,
                    height: "49px",
                    filter: "brightness(0) saturate(100%) invert(32%) sepia(35%) saturate(720%) hue-rotate(335deg)",
                }}
            />
            </Stack>
            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              Chuỗi nhà hàng buffet nướng và
              <br />
              lẩu hàng đầu, mang đến trải
              <br />
              nghiệm ẩm thực đẳng cấp trong
              <br />
              không gian hiện đại.
            </Typography>
          </Stack>

          {/* Column 2: Thông tin */}
          <Stack spacing={3} flex={1}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#b14135", fontWeight: 700 }}
            >
              Thông tin
            </Typography>
            <Stack spacing={2}>
              {infoLinks.map((link) => (
                <Link
                  key={link}
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {link}
                </Link>
              ))}
            </Stack>
          </Stack>

          {/* Column 3: Chi nhánh */}
          <Stack spacing={3} flex={1}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#b14135", fontWeight: 700 }}
            >
              Chi nhánh
            </Typography>
            <Stack spacing={2}>
              {branches.map((branch) => (
                <Typography
                  key={branch.name}
                  variant="body2"
                  sx={{ lineHeight: 1.8 }}
                >
                  <Box
                    component="span"
                    sx={{ color: "text.primary", fontWeight: 600 }}
                  >
                    {branch.name}
                  </Box>
                  <Box component="span" sx={{ color: "text.secondary" }}>
                    {branch.address.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {i === 0 ? (
                          line
                        ) : (
                          <>
                            <br />
                            {line}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Typography>
              ))}
            </Stack>
          </Stack>

          {/* Column 4: Liên hệ */}
          <Stack spacing={3} flex={1}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#b14135", fontWeight: 700 }}
            >
              Liên hệ
            </Typography>
            <Stack spacing={2}>
              {contactItems.map((item) => (
                <Stack
                  key={item.text}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  {item.icon}
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Bottom bar */}
        <Box>
          <Divider sx={{ borderColor: "grey.200", mb: 3 }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption" color="text.secondary">
              © 2026 Gemori Restaurant Group. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              {bottomLinks.map((link) => (
                <Link
                  key={link}
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    cursor: "pointer",
                    fontSize: "0.75rem",
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
  );
};

export default Footer;