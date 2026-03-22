import React, { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/menu";
const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dbifhgaic/image/upload/v1771769449/ChatGPT_Image_21_10_29_22_thg_2_2026_yfyu9j.png";

const formatPrice = (price) => {
  if (price === null || price === undefined) return "0 đ";
  return `${Number(price).toLocaleString("vi-VN")} đ`;
};

export const Main = () => {
  const [expandedSections, setExpandedSections] = useState({
    buffet: true,
    "mon-don": false,
  });

  const [buffetList, setBuffetList] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [buffetDetail, setBuffetDetail] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const menu = useMemo(() => {
    return [
      {
        id: "buffet",
        label: "Buffet",
        items: buffetList.map((item) => ({
          id: item.code,
          label: item.name,
        })),
      },
      {
        id: "mon-don",
        label: "Món đơn",
        items: [],
      },
    ];
  }, [buffetList]);

  useEffect(() => {
    const fetchBuffetList = async () => {
      try {
        setLoadingList(true);
        setError("");

        const response = await axios.get(
          `${API_BASE_URL}/buffet-tickets`
        );

        const list = response?.data?.data || [];
        setBuffetList(list);

        if (list.length > 0) {
          setActiveItem(list[0].code);
        }
      } catch (err) {
        console.error("Lỗi lấy danh sách buffet:", err);
        setError("Không thể tải danh sách buffet");
      } finally {
        setLoadingList(false);
      }
    };

    fetchBuffetList();
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    const fetchBuffetDetail = async () => {
      try {
        setLoadingDetail(true);

        const response = await axios.get(
          `${API_BASE_URL}/buffet-tickets/${activeItem}`
        );

        setBuffetDetail(response?.data?.data || null);
      } catch (err) {
        console.error("Lỗi lấy chi tiết buffet:", err);
        setBuffetDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchBuffetDetail();
  }, [activeItem]);

  const currentIndex = buffetList.findIndex((item) => item.code === activeItem);

  const handlePrev = () => {
    if (buffetList.length === 0) return;

    const prevIndex =
      currentIndex <= 0 ? buffetList.length - 1 : currentIndex - 1;

    setActiveItem(buffetList[prevIndex].code);
  };

  const handleNext = () => {
    if (buffetList.length === 0) return;

    const nextIndex =
      currentIndex >= buffetList.length - 1 ? 0 : currentIndex + 1;

    setActiveItem(buffetList[nextIndex].code);
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
              {expandedSections[section.id] && (
                <Stack spacing={2} sx={{ pl: 2, pr: 0, py: 1 }}>
                  {loadingList && section.id === "buffet" ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ py: 1 }}
                    >
                      <CircularProgress size={16} />
                      <Typography
                        sx={{
                          fontFamily: '"Be Vietnam Pro", Helvetica',
                          fontSize: "14px",
                          color: "#64748b",
                        }}
                      >
                        Đang tải...
                      </Typography>
                    </Stack>
                  ) : error && section.id === "buffet" ? (
                    <Typography
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "14px",
                        color: "error.main",
                        py: 1,
                      }}
                    >
                      {error}
                    </Typography>
                  ) : section.items.length > 0 ? (
                    section.items.map((item, index) => (
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
                            color:
                              activeItem === item.id ? "#f97316" : "#4b5563",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.label}
                        </Typography>

                        {activeItem === item.id ? (
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
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "14px",
                        color: "#94a3b8",
                        py: 1,
                      }}
                    >
                      Chưa có dữ liệu
                    </Typography>
                  )}
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
              backgroundImage: `url(${
                buffetDetail?.image_url || FALLBACK_IMAGE
              })`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              width: "100%",
              backgroundColor: "#f8fafc",
            }}
          />

          <IconButton
            onClick={handlePrev}
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

          <IconButton
            onClick={handleNext}
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
            {loadingDetail ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <CircularProgress size={20} />
                <Typography
                  sx={{
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: "14px",
                    color: "#64748b",
                  }}
                >
                  Đang tải chi tiết...
                </Typography>
              </Stack>
            ) : (
              <>
                {/* Product Title */}
                <Typography
                  sx={{
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: "40px",
                    letterSpacing: "0px",
                    color: "#1f2937",
                  }}
                >
                  {buffetDetail?.name || "Chưa có dữ liệu"}
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
                    {formatPrice(buffetDetail?.price)}
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

                {/* Description */}
                <Typography
                  sx={{
                    mt: 2,
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "28px",
                    color: "#4b5563",
                    whiteSpace: "pre-line",
                  }}
                >
                  {buffetDetail?.description || "Chưa có mô tả"}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Main;