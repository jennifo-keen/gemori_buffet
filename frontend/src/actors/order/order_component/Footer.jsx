import React from 'react';

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon      from "@mui/icons-material/EmailOutlined";
import PhoneIcon              from "@mui/icons-material/Phone";
import { Box, Stack, Typography } from "@mui/material";

import Logo from "../../../assets/img/Logo 1.png"
const infoLinks = [
  "Về chúng tôi",
  "Thực đơn chi tiết",
  "Chính sách bảo mật",
  "Tuyển dụng",
];

const contactItems = [
  {
    icon: <PhoneIcon sx={{ fontSize: 16, color: "#b14135" }} />,
    text: "1900 6789",
  },
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: 16, color: "#b14135" }} />,
    text: "contact@gemori.com.vn",
  },
  {
    icon: <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: "#b14135" }} />,
    text: "10:00 - 22:00 Hàng ngày",
  },
];

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f6f6",
        borderTop: "1px solid #b141351a",
        p: 3,
        width: "100%",
      }}
    >
      <Stack spacing={3}>
        {/* Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Gemori Logo"
          sx={{ width: 130, height: "auto" }}
        />

        {/* Description */}
        <Typography variant="body2" color="text.secondary">
          Chuỗi nhà hàng buffet nướng và lẩu hàng đầu, mang đến trải nghiệm ẩm
          thực đẳng cấp trong không gian hiện đại.
        </Typography>

        {/* Two columns: Thông tin & Chi nhánh */}
        <Stack direction="row" spacing={3}>
          {/* Thông tin column */}
          <Stack spacing={1.5} flex={1}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#b14135", fontWeight: 700 }}
            >
              Thông tin
            </Typography>
            <Stack spacing={2}>
              {infoLinks.map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{ color: "text.secondary", cursor: "pointer" }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          </Stack>

          {/* Chi nhánh column */}
          <Stack spacing={1.5} flex={1}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#b14135", fontWeight: 700 }}
            >
              Chi nhánh
            </Typography>
            <Typography variant="body2">
              <Box
                component="span"
                sx={{ color: "text.primary", fontWeight: 600 }}
              >
                Gemori Landmark:
              </Box>
              <Box component="span" sx={{ color: "text.secondary" }}>
                {" "}
                Tầng 5,{"\n"}Landmark 81, TP.HCM
              </Box>
            </Typography>
          </Stack>
        </Stack>

        {/* Liên hệ section */}
        <Stack spacing={1.5}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#b14135", fontWeight: 700 }}
          >
            Liên hệ
          </Typography>
          <Stack spacing={2}>
            {contactItems.map((item, index) => (
              <Stack
                key={index}
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
    </Box>
  );
};

export default Footer;
