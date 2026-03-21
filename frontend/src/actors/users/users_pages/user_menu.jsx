import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

// Sidebar menu data
const menu = [
  {
    id: "buffet",
    label: "Buffet",
    items: [
      { id: "khoi-dau", label: "Buffet Khởi Đầu", active: true },
      { id: "dai-du-hoa", label: "Buffet Đài Dư Hoa", active: false },
      { id: "dai-nguu-tran", label: "Buffet Đài Ngưu Trân", active: false },
      { id: "phong-van", label: "Buffet Phong Vân", active: false },
    ],
  },
  {
    id: "mon-don",
    label: "Món đơn",
    items: [],
  },
];

export const Main = () => {
  const [expandedSections, setExpandedSections] = useState({
    buffet: true,
    "mon-don": false,
  });
  const [activeItem, setActiveItem] = useState("khoi-dau");

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <Stack
      direction="row"
      spacing={6}
      sx={{
        px: "72px",
        py: 4,
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {/* Left Sidebar Navigation */}
      <Box sx={{ width: 256, flexShrink: 0 }}>
        <Box sx={{ borderTop: "1px solid", borderColor: "grey.100" }}>
          {menu.map((section) => (
            <Box
              key={section.id}
              sx={{ borderBottom: "1px solid", borderColor: "grey.100" }}
            >
              {/* Section Header */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => toggleSection(section.id)}
                sx={{
                  px: 1,
                  py: 2,
                  bgcolor: "background.paper",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={
                    section.id === "buffet"
                      ? {
                          pb: "2px",
                          borderBottom: "2px solid",
                          borderColor: "primary.main",
                        }
                      : {}
                  }
                >
                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      color: section.id === "buffet" ? "#f97316" : "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {section.label}
                  </Typography>
                </Box>
                <ExpandMoreIcon
                  sx={{
                    width: 16,
                    height: 16,
                    color: section.id === "buffet" ? "#f97316" : "#64748b",
                    transform: expandedSections[section.id]
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </Stack>

              {/* Section Items */}
              {expandedSections[section.id] && section.items.length > 0 && (
                <Stack spacing={2} sx={{ pl: 2, pr: 0, py: 1 }}>
                  {section.items.map((item, index) => (
                    <Stack
                      key={item.id}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => setActiveItem(item.id)}
                      sx={{
                        cursor: "pointer",
                        pb: index === section.items.length - 1 ? 1 : 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Be Vietnam Pro", Helvetica',
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          letterSpacing: "0px",
                          color: activeItem === item.id ? "#f97316" : "#4b5563",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </Typography>
                      {activeItem === item.id ? (
                        /* Active item shows a dash/minus indicator */
                        <Box
                          sx={{
                            width: 16,
                            height: 2,
                            bgcolor: "#f97316",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <AddIcon
                          sx={{ width: 16, height: 16, color: "#4b5563" }}
                        />
                      )}
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Stack
        direction="row"
        spacing={4}
        sx={{ flex: 1, alignItems: "flex-start" }}
      >
        {/* Image with navigation arrows */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <Box
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 2px #0000000d",
              aspectRatio: "0.75",
                backgroundImage: "url(https://res.cloudinary.com/dbifhgaic/image/upload/v1771769449/ChatGPT_Image_21_10_29_22_thg_2_2026_yfyu9j.png)",              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              width: "100%",
            }}
          />

          {/* Left Arrow */}
          <IconButton
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
              p: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ChevronLeftIcon sx={{ width: 24, height: 24 }} />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
              p: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ChevronRightIcon sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>

        {/* Product Info */}
        <Box sx={{ width: 420, flexShrink: 0 }}>
          <Box
            component="header"
            sx={{
              borderBottom: "1px solid",
              borderColor: "grey.100",
              pb: 1,
            }}
          >
            {/* Product Title */}
            <Typography
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "40px",
                letterSpacing: "0px",
                color: "#1f2937",
                whiteSpace: "nowrap",
              }}
            >
              Buffet Vạn Giai Kỳ
            </Typography>

            {/* Price Row */}
            <Stack direction="row" alignItems="baseline" spacing={0.5}>
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "32px",
                  letterSpacing: "0px",
                  color: "#1f2937",
                  whiteSpace: "nowrap",
                }}
              >
                269.000 đ
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Be Vietnam Pro", Helvetica',
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                }}
              >
                /người
              </Typography>
            </Stack>

            {/* VAT Note */}
            <Typography
              component="p"
              sx={{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0px",
                color: "#9ca3af",
                whiteSpace: "nowrap",
              }}
            >
              (Giá chưa bao gồm VAT)
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Main;
